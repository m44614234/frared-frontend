"use client";
import UserLayout from "@/components/layouts/UserPanelLayout";
import SecondBlogCard from "@/components/templates/BlogCards/SecondBlogCard";
import { useBlog } from "@/context/BlogContext";
import { DeleteFilled } from "@ant-design/icons";

const Blogs = () => {
  const { blog , RemoveFromSaveBlogs , isInSaveList}: any = useBlog();
  console.log("blog", blog);

  return (
    <UserLayout>
      <main dir="rtl" className="w-full mx-auto px-3 md:px-5">
        <div className="w-full bg-white shadow-box-md rounded-2xl p-5 mt-5 md:mt-0">
          <div className="">
            <div className="text-zinc-800 text-lg mb-4">مقالات تگ شده:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blog &&
                blog.map((blogItem: any) => (
                    isInSaveList(blogItem._id) &&  <div className="w-full flex group relative">
                        <SecondBlogCard blog={blogItem} />
                        <div className="w-full hidden h-full absolute bg-white/90 rounded-lg group-hover:flex gap-2 items-center justify-center  z-40">
                        <DeleteFilled className="text-red-500 text-2xl cursor-pointer" onClick={()=>RemoveFromSaveBlogs(blogItem._id)}/>
                        </div>
                      </div>
                 
                ))}
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
};
export default Blogs;
