import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserContextType {
  user: any | null;
  setUser: (user: any) => void; // Add this line
  loading: boolean;
  error: any;
  cart: [];
  order: [];
  setCart: (cart: any) => void; // Add this line
  clearCart: () => void;
  AddtoCart: (product: any) => void;
  AddQuentity: (productId: any) => void;
  RemoveQuentity: (productId: any) => void;
  RemoveFromCart: (productId: any) => void;
  isInCart: (productId: any) => boolean;
  updateUser: (data: any) => Promise<any>;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => Promise<void>;
  createOrder: (data: any) => Promise<any>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>({});
  const [cart, setCart] = useState<any>([]);
  const [order, setOrder] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const router = useRouter();

  const getUser = async () => {
    const tokenDetails = Cookies.get("jwt");

    const isTokenExpired = (token: any) => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = payload.exp * 1000; // تبدیل به میلی‌ثانیه
        return Date.now() > expirationTime; // بررسی تاریخ انقضا
      } catch (error) {
        console.log("error in parsing token:", error);
        return true; // فرض بر این است که توکن منقضی شده است
      }
    };

    try {
      if (tokenDetails) {
        if (isTokenExpired(tokenDetails)) {
          Cookies.remove("jwt");
          console.log("Token expired and removed.");
          return;
        }

        const response: any = await axios.get(`${baseUrl}/auth/profile`, {
          headers: {
            authorization: `Bearer ${tokenDetails}`,
          },
        });
        setUser(response.data); // ذخیره اطلاعات کاربر
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Start Login Block //
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: any = await axios.post(`${baseUrl}/auth/loginUser`, user,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data || response.status === 200) {
        setUser({ email: "", password: "" }); // پاک کردن مقادیر ورودی
        const token = response.data.token; // فرض بر این است که توکن در داده‌های پاسخ قرار دارد
        Cookies.set("jwt", token, { expires: 7 }); // توکن برای 7 روز معتبر است
        toast.success("ورود با موفقیت انجام شد");
        router.replace("/");
      }
    } catch (error: any) {
      if (error.status === 400) {
        toast.error("لطفا مقادیر را وارد کنید");
      }

      if (error.status === 404) {
        toast.error("کاربری با این ایمیل وجود ندارد");
      }

      if (error.status === 422) {
        toast.error("ایمیل یا رمز عبور صحیح نمی باشد. لطفاً دوباره تلاش کنید");
      }
    }
  };
  // End Login Block //

  // Start LogOut Block //
  const handleLogout = async () => {
    const res = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      toast.success("خروج با موفقیت انجام شد");
      Cookies.remove("jwt");
      router.replace("/");
      setUser({ email: "", password: "" });
    }
  };
  //  End LogOut Block //

  // Start Register Block //
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 400) {
        toast.error("لطفا مقادیر را وارد کنید");
      }

      if (res.status === 422) {
        toast.error("این ایمیل قبلا ثبت شده است");
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      } else if (res.ok && res.status === 200) {
        const data = await res.json();
        setUser(data);
        toast.success("ثبت نام با موفقیت انجام شد");
        router.push("/login");
      }
    } catch (error) {
      toast.error("مشکلی در سرور رخ داده است");
    }
  };
  // End Register Block //

  //  Start Cart Block //
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  const isInCart = (productId: any) => {
    return cart.some((item: any) => item._id === productId);
  };

  useEffect(() => {
    const cartItem = localStorage?.getItem("cart");
    if (cartItem) {
      setCart(JSON.parse(cartItem));
    }
  }, []);

  function updateLocalStorage(items: any) {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }

  function AddtoCart(item: any) {
    if (!user?.username) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    if (!item) {
      return;
    }
    cart.some((cartItem: any) => cartItem._id === item._id);
    cart.map((cartItem: any) => {
      if (cartItem._id === item._id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      }
      return cartItem;
    });

    setCart((prevCartItems: any) => {
      const newCartItem = { ...item, quantity: 1 };
      const newCartItems = [...prevCartItems, newCartItem];
      updateLocalStorage(newCartItems);
      return newCartItems;
    });
    toast.success("محصول به سبد خرید اضافه شد");
  }

  function RemoveFromCart(productId: any) {
    if (!user) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    setCart((prevCartItems: any) => {
      const newCartItems = prevCartItems.filter(
        (product: any) => product._id !== productId
      );
      updateLocalStorage(newCartItems);
      return newCartItems;
    });
    toast.success("محصول از سبد خرید حذف شد");
  }

  function AddQuentity(productId: any) {
    setCart((prevCartItems: any) => {
      return prevCartItems.map((product: any) => {
        if (product._id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
    });
  }

  function RemoveQuentity(productId: any) {
    setCart((prevCartItems: any) => {
      return prevCartItems.map((product: any) => {
        if (product._id === productId) {
          const updatedQuantity = Math.max(product.quantity - 1, 1);
          return {
            ...product,
            quantity: updatedQuantity,
          };
        }
        return product;
      });
    });
  }

  function clearCart() {
    if (!user) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    setCart([]);
    updateLocalStorage([]);
  }
  //  End Cart Block //

  // Start Update User Block //
  const updateUser = async (data: any): Promise<any> => {
    const tokenDetails = Cookies.get("jwt");
    try {
      const response = await axios.put(`${baseUrl}/auth/edit-user`, data.data, {
        headers: {
          authorization: `Bearer ${tokenDetails}`,
        },
      });
      if (response.data) {
        setUser(response.data);
        toast.success("پروفایل با موفقیت بروزرسانی شد");
        return response.data;
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("لطفا تمام مقادیر را وارد کنید");
      }
      if (error?.response?.status === 500) {
        toast.error("خطایی رخ داده است");
      }
    }
  };
  // End Update User Block //

  // Start Create Order Block //
  const createOrder = async (orderDetail: any) => {
    console.log("orderDetail =>", orderDetail);

    const tokenDetails = Cookies.get("jwt");
    try {
      const response = await axios.post(
        `${baseUrl}/auth/cart/create-order`,
        orderDetail,
        {
          headers: {
            authorization: `Bearer ${tokenDetails}`,
          },
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("error in Create Order =>", error);
    }
  };
  // End Create Order Block //

  //Start Get Order //

  //End Get Order //
  useEffect(() => {
    getUser();
    const getOrder = async () => {
      try {
        const res = await fetch(`${baseUrl}/order` ,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setOrder(data);
        setLoading(false)
      } catch (error) {
        console.log("error =>", error);
      }
    };
    getOrder();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        order,
        setUser,
        loading,
        error,
        cart,
        setCart,
        isInCart,
        AddtoCart,
        RemoveFromCart,
        AddQuentity,
        RemoveQuentity,
        clearCart,
        updateUser,
        handleLogin,
        handleRegister,
        handleLogout,
        createOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
