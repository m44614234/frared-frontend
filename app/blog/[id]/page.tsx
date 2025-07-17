"use client";
import { useEffect, useRef, useState } from "react";
import {
  ClockCircleOutlined,
  EyeOutlined,
  FolderOutlined,
  LeftOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBlog } from "@/context/BlogContext";
import { useUser } from "@/context/UserContext";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";
import Link from "next/link";
import NewBlogs from "@/components/templates/BlogCards/NewBlogs";
import SecondBlogCard from "@/components/templates/BlogCards/SecondBlogCard";

const SingleBlog = ({ params }: any) => {
  const swiperRef: any = useRef(null);

  const [blogData, setBlogData]: any = useState(null);
  const [email, setEmail] = useState<any>();
  const [name, setName] = useState<any>();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<[] | null>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = params;

  const { getABlog, blog: blogs } : any = useBlog();
  const { user: userData } = useUser();

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = getABlog(id);
        const data = await res;
        setBlogData(data);
      } catch (error: string | any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, []);

  // comments
  const createBlogComment = async () => {
    if (!userData.username) {
      toast.error("لطفا ابتدا وارد شوید");
    }

    try {
      const res = await fetch(`${baseUrl}/blogComment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: comment, // متن کامنت
          blog: blogData?._id,
          user: userData?._id,
          email: userData?.email,
          username : userData?.username
        }),
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("نظر شما با موفقیت ثبت شد");
        setComment("");
        setEmail("")
        setName("")
      }
       if (res.status === 400) {
        toast.warning("لطفا تمام مقادیر را وارد کنید");
      }
    } catch (error: any) {
      if (error.status === 500) {
        toast.error("خطا در ایجاد کامنت");
      }
    }
  };

  const getBlogs = async () => {
    const res = await fetch(`${baseUrl}/blogComment`, {
      method: "GET",
    });
    const data = await res.json();
    setComments(data);

    if (res.status === 500) {
      toast.error("خطا در دریافت کامنت ها");
    }
  };

  useEffect(() => {
    getBlogs();
  });

 
  const commentLength =
    comments && comments?.filter((item: any) => item.blog === id).length;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <span className="loader"></span>{" "}
        </div>
      );
    }

  return (
    <main
      dir="rtl"
      className="max-w-[1500px] mx-auto px-3 md:px-5 mt-44 md:mt-32"
    >
      {/* top section */}
      <div className="lg:mr-8 lg:ml-16 h-full p-5 text-sm bg-white rounded-xl shadow-box-sm flex items-center gap-x-2">
        <Link href="/" className="text-zinc-800 hover:text-red-400 transition">
          خانه
        </Link>
        <LeftOutlined className="text-[#3d3d3d] text-sm" />
        <Link
          href="/blog"
          className="text-zinc-800 hover:text-red-400 transition"
        >
          مقالات
        </Link>
        <LeftOutlined className="text-[#3d3d3d] text-sm" />
        <Link
          href="/blog"
          className="text-zinc-800 hover:text-red-400 transition"
        >
          {blogData?.title}
        </Link>
      </div>
      {/* text blogs */}
      <div className="my-2 py-5 lg:px-10 flex flex-col lg:flex-row gap-4">
        <div className="lg:w-10/12">
          <div className="bg-white rounded-xl shadow-box-md p-4">
            <div className="flex gap-4 pb-2 flex-wrap">
              <div className="text-xs flex gap-x-1 items-center text-zinc-400">
                <ClockCircleOutlined className="text-zinc-400 text-sm" />
                {new Date(blogData?.createdAt).toLocaleDateString("fa-IR")}
              </div>
              <div className="text-xs flex gap-x-1 items-center text-zinc-400">
                <UserOutlined className="text-zinc-400 text-sm" />
                ارسال شده توسط {blogData?.author === "Admin" ? "ادمین" : ""}
              </div>
              <div className="text-xs flex gap-x-1 items-center text-zinc-400">
                <FolderOutlined className="text-zinc-400 text-sm" />
                دسته بندی {blogData?.category}
              </div>
              <div className="text-xs flex gap-x-1 items-center text-zinc-400">
                <EyeOutlined className="text-zinc-400 text-sm" />
                {(100).toLocaleString("fa-IR")} بازدید
              </div>
            </div>
            <img className="rounded-lg" src={blogData?.images[0]?.url} alt="" />
            <div className="mt-7 text-sm">
              <div className="text-xl md:text-2xl text-zinc-700">
                {blogData?.title}
              </div>
              <div className="bg-red-400 w-6/12 h-px mt-5" />
              <div className="text-zinc-600 my-7 flex flex-wrap gap-y-5">
                <span className="leading-8 font-normal">
                  {blogData?.description}
                </span>
              </div>
            </div>
            <img
              className="rounded-lg w-10/12 mx-auto"
              src={blogData?.images[1]?.url}
              alt=""
            />
          </div>
          <div className="flex flex-col p-4 mt-5 rounded-2xl bg-white shadow-box-md">
            {/* top comments */}
            <div>
              <div className="text-zinc-600">
                {commentLength?.toLocaleString("fa-IR")} دیدگاه برای معرفی{" "}
                {blogData?.title}
              </div>
            </div>
            {/* COMMENT */}
            {comments &&
            comments
            .filter((item: any) => item.blog === id)
            .map((item: any) => (
              
              <div className="border rounded-xl px-5 py-3 my-2">
                <div className="flex items-center gap-x-1">
                  <svg
                    className="fill-zinc-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    fill=""
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z" />
                  </svg>
                  <div className="text-xs opacity-60 me-6">
                    {item?.user?.username}
                  </div>
                  <ClockCircleOutlined className="text-zinc-500 text-xs" />
                  <div className="text-xs opacity-60">
                    {new Date(blogData?.createdAt).toLocaleDateString("fa-IR")}
                  </div>
                </div>
                <div className="opacity-60 text-sm py-3">{item?.body}</div>
                <div></div>
              </div>
            ))}

            {/* BOX SENT COMMENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="inline-block mb-2 ml-1 font-semibold text-xs text-slate-700"
                >
                  نام شما:
                </label>
                <input
                  defaultValue={userData?.username || ""}
                  onChange={(e:any) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  className="text-sm block w-full rounded-lg border border-gray-400 bg-white px-3 py-2 font-normal text-gray-700 outline-none focus:border-red-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="inline-block mb-2 ml-1 font-semibold text-xs text-slate-700"
                >
                  ایمیل شما:
                </label>
                <input
                  type="text"
                  onChange={(e:any) => {
                    setEmail(e.target.value);
                  }}
                  defaultValue={userData?.email || ""}
                  className="text-sm block w-full rounded-lg border border-gray-400 bg-white px-3 py-2 font-normal text-gray-700 outline-none focus:border-red-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="mailTicket"
                className="inline-block mb-2 ml-1 font-semibold text-xs text-slate-700"
              >
                نظر شما:
              </label>
              <textarea
                cols={30}
                rows={5}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setComment(e.target.value);
                }}
                className="text-sm block w-full rounded-lg border border-gray-400 bg-white px-3 py-2 font-normal text-gray-700 outline-none focus:border-red-300"
                defaultValue={""}
              />
            </div>
            <button
              onClick={createBlogComment}
              className="inline-block px-8 py-2 ml-auto text-center text-white bg-red-400 hover:bg-red-500 transition rounded-lg shadow-md text-xs"
            >
              ارسال نظر
            </button>
          </div>
        </div>
        <NewBlogs blog={blogs} />
      </div>
      {/* blog slider */}

      <div className="mt-10 px-2 sm:px-6 md:px-10">
        {/* TOP SLIDER */}
        <div className="flex justify-between px-1 items-center bg-white py-3 rounded-xl shadow-md">
          <div className="px-4 py-2 flex justify-center items-center gap-x-1 text-sm text-zinc-700">
            <MessageOutlined
              className="text-red-500"
              style={{ fontSize: "20px" }}
            />
            <span className="text-red-500">مرتبط ترین مقالات</span>
          </div>
          <Link href="">
            <div className="transition px-4 gap-1 py-2 flex justify-center items-center text-sm text-zinc-700 hover:text-zinc-600">
              مشاهده همه
              <LeftOutlined
                style={{ fontSize: "16px" }}
                className="text-zinc-700 hover:text-zinc-600"
              />
            </div>
          </Link>
        </div>
        {/* SLIDER */}
        <section>
          <Swiper
            ref={swiperRef}
            dir="rtl"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper w-[99%] mx-auto"
            rewind={true}
            breakpoints={{
              400: { slidesPerView: 2, spaceBetween: 5 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 4.5, spaceBetween: 15 },
            }}
          >
            {blogs &&
              blogs.map((blogItem: any) => (
                <SwiperSlide className="w-full">
                  <SecondBlogCard blog={blogItem} />
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="bg-red-400 px-2 w-full h-72 rounded-2xl -mt-60 relative"></div>
          {/* <div className="swiper-button-next" />
          <div className="swiper-button-prev" /> */}
        </section>
      </div>
    </main>
  );
};

export default SingleBlog;
