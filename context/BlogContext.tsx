"use client";
import { baseUrl } from "@/utils/baseUrl";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "./UserContext";

interface BlogContextType {
  blog: [];
  AddToSaveBlogs: (blog: any) => void;
  RemoveFromSaveBlogs: (blogId: any) => void;
  isInSaveList: (blogId: any) => boolean;
  getABlog: (id: any) => Promise<any>;
  loading: boolean;
}

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: any) => {
  const [blog, setBlog] = useState<any>([]);
  const [save, setSave] = useState<any[]>([]);
  const { user: userData } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetch(`${baseUrl}/blog`);
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false); // Ensure loading is false even on error
      }
    };

    getAllBlogs();
  }, []);

  // بارگذاری داده‌های ذخیره شده از Local Storage فقط یک بار
  useEffect(() => {
    const localStorage = typeof window !== "undefined" ? window.localStorage : null;
    const savedItems = localStorage?.getItem("saveBlogs");
    if (savedItems) {
      setSave(JSON.parse(savedItems));
    }
  }, []);

  const updateLocalStorage = (items: any) => {
    localStorage?.setItem("saveBlogs", JSON.stringify(items));
  };

  const isInSaveList = (blogId: any) => {
    return save.some((item: any) => item._id === blogId);
  };

  const AddToSaveBlogs = (item: any) => {
    if (!userData?.username) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    if (!isInSaveList(item._id)) {
      const newItems = [...save, { ...item, quantity: 1 }];
      setSave(newItems); // Update save instead of blog
      updateLocalStorage(newItems); // Update Local Storage only when adding
      toast.success("با موفقیت به لیست علاقه مندی‌ها اضافه شد");
    } else {
      toast.info("قبلا به لیست علاقه مندی‌ها اضافه شده است");
    }
  };

  const RemoveFromSaveBlogs = (blogId: any) => {
    if (!userData) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    const newSavedItems = save.filter((blog: any) => blog._id !== blogId);
    setSave(newSavedItems); // Update save instead of blog
    updateLocalStorage(newSavedItems); // Update Local Storage when removing
    toast.success("با موفقیت حذف شد");
  };

  const getABlog = async (id: any) => {
    try {
      const response = await fetch(`${baseUrl}/blog/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching blog:", error);
      return null; // Return null or handle the error appropriately
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blog,
        getABlog,
        AddToSaveBlogs,
        RemoveFromSaveBlogs,
        isInSaveList,
        loading,
      }}
    >
      {children}
      </BlogContext.Provider>
  );
};

export function useBlog() {
  return useContext(BlogContext);
}
