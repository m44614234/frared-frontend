"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useRef, useState } from "react";
import Meta from "@/components/templates/Meta";
import BreadCrumb from "@/components/templates/BreadCrumb";
import { baseUrl } from "@/utils/baseUrl";
import { useBlog } from "@/context/BlogContext";
import Container from "@/components/templates/Container";
import useSWR from "swr";
import {
  BookOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import BlogCard from "@/components/templates/BlogCards/BlogCard";
import SecondBlogCard from "@/components/templates/BlogCards/SecondBlogCard";
import NewBlogs from "@/components/templates/BlogCards/NewBlogs";

const Blog = () => {
  const swiperRef: any = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const ITEMS_PER_PAGE = 10;

  const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());
  const { blog: blogs } : any = useBlog();
  const {
    data: blogCategory,
    isLoading,
    error,
  } = useSWR(`${baseUrl}/blogcategory`, fetcher);

  // Paginate
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setTotalPages(Math.ceil(blogs.length / ITEMS_PER_PAGE));
    }
  }, [blogs]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>{" "}
      </div>
    );
  }

  if (error) {
    return <div>Error loading categories.</div>;
  }

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  
  return (
    <main
      dir="rtl"
      className="max-w-[1500px] mx-auto px-3 md:px-5 mt-44 md:mt-32"
    >
      {/* top section */}
      <div className="lg:mr-8 lg:ml-16 h-full p-5 text-sm bg-white rounded-xl shadow-sm flex items-center gap-x-2">
        <Link href="/" className="text-zinc-800 hover:text-red-400 transition">
          خانه
        </Link>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="#3d3d3d"
            viewBox="0 0 256 256"
          >
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
          </svg>
        </div>

        <Link className="text-red-400" href="/blog">
          وبلاگ
        </Link>
      </div>
      {/* category */}
      <div className="my-2 py-5 lg:px-10 md:flex">
        <div className="md:w-3/12">
          <div className="px-2 sm:px-3 py-3 bg-white rounded-xl shadow-sm">
            {blogCategory.map((item: any) => (
              <button
                onClick={handleCategoryChange}
                className="mx-auto flex gap-x-1 group items-center text-right w-full px-2 py-3 text-sm hover:bg-red-400 hover:text-white transition text-gray-700 rounded-lg"
              >
                <BookOutlined className=" text-[#3d3d3d]" />
                {item?.title}
              </button>
            ))}
          </div>
        </div>
        <div className="md:w-9/12 px-2 sm:px-6 mt-5 md:mt-0">
          <div>
            <img
              className="rounded-lg"
              src="./assets/image/blog/Banner.jpg"
              alt=""
            />
          </div>
          {/* section blog */}
          <div className="rounded-2xl mx-auto text-gray-100 mt-5">
            {/* main blog */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <BlogCard blog={blogs} />
            </div>
          </div>
        </div>
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
            <span className="text-red-500">جدیدترین مقالات</span>
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
      {/* new blogs */}
      <section className="my-2 py-5 lg:px-10 flex flex-col lg:flex-row gap-4">
        <NewBlogs blog={blogs} />

        <div className="lg:w-10/12">
          {blogs &&
            blogs.slice(0, 1).map((item: any) => (
              <div className="border rounded-xl p-4">
                <img className="rounded-lg" src={item?.images[0]?.url} alt="" />
                <div className="mt-7">
                  <Link
                    href={`/blog/${item._id}`}
                    className="text-xl md:text-2xl text-zinc-500 hover:text-zinc-600 transition"
                  >
                    {item?.title}
                  </Link>
                  <div className="bg-red-400 w-6/12 h-px mt-5" />
                  <div className="text-zinc-500 text-sm my-7 flex flex-wrap">
                    <span className="leading-7 font-normal">
                      {item?.description}
                      <Link
                        href={`/blog/${item._id}`}
                        className="text-blue-500 hover:text-blue-400 transition text-sm"
                      >
                        خواندن بیشتر
                      </Link>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-zinc-100 text-sm bg-gray-400 hover:bg-gray-300 transition px-3 py-2 rounded-md">
                      {item?.author === "Admin" ? "نوشته شده توسط ادمین" : ""}
                    </div>
                    <div className="flex items-start gap-x-1 text-xs ">
                      <span className="text-gray-600">
                        {new Date(item?.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <ClockCircleOutlined className="text-sm text-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* 5 section blog */}
      {/* <div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 lg:gap-5 mt-5 mb-10">
        //   {blogs &&
        //     blogs.map((blogItem: any) => <SecondBlogCard blog={blogItem} />)}
        // </div>
        {/* number pages */}
      {/* <div className="mb-14">
          <ul className="flex items-center justify-center gap-x-2 md:gap-x-3 h-8 text-sm">
            <li>
              <a
                href="#"
                className="flex items-center justify-center transition shadow-lg px-3 h-8 ms-0 text-gray-500 bg-white rounded-lg  hover:bg-red-100 hover:text-red-400"
              >
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center transition shadow-lg px-3 h-8 text-red-500 bg-red-200 rounded-lg hover:bg-red-100"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center transition shadow-lg px-3 h-8 text-gray-500 bg-white rounded-lg hover:bg-red-100 hover:text-red-400"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center transition shadow-lg px-3 h-8 rounded-lg text-gray-500 bg-white  hover:bg-red-100 hover:text-red-400"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center transition shadow-lg px-3 h-8 text-gray-500 bg-white rounded-lg  hover:bg-red-100 hover:text-red-400"
              >
                ...
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center transition shadow-lg px-3 h-8 text-gray-500 bg-white rounded-lg  hover:bg-red-100 hover:text-red-400"
              >
                8
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center transition shadow-lg px-3 h-8 text-gray-500 bg-white rounded-lg  hover:bg-red-100 hover:text-red-400"
              >
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div> */}

      {/* </div>  */}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 lg:gap-5 mt-5 mb-10">
        {blogs
          .slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )
          .map((item: any) => (
            <SecondBlogCard key={item?._id} blog={item} />
          ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-3 items-center my-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`
             flex items-center justify-center transition shadow-lg px-3 h-8 ms-0 text-gray-500  rounded-lg  hover:bg-red-100 hover:text-red-400

            ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-400 text-white"
            }`}
        >
          قبلی
        </button>
        <span>{`صفحه ${(currentPage).toLocaleString("fa-IR")} از ${(totalPages).toLocaleString("fa-IR")}`}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`
               flex items-center justify-center transition shadow-lg px-3 h-8 ms-0 text-gray-500 rounded-lg  hover:bg-red-100 hover:text-red-400
            ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-400 text-white"
            }`}
        >
          بعدی
        </button>
      </div>
    </main>
  );
};

export default Blog;
