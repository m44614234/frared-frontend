"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import { baseUrl } from "@/utils/baseUrl";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "@/components/templates/BlogCards/BlogCard";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProductSwiper from "@/components/templates/ProductSwiper";
import AmazingBlock from "@/components/mainPage/AmazingBlock";
import ProductCollection from "@/components/mainPage/Product-Collection";
import { useProduct } from "@/context/ProductContext";
import { useBlog } from "@/context/BlogContext";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function Home() {
  const { products, loading } = useProduct();
  const { blog }: any = useBlog();

  // const fetcher = (...args: [string]) =>
  //   fetch(...args).then((res) => res.json());
  // const { data: pCategories } = useSWR(`${baseUrl}/category`, fetcher);

  const swiperRef: any = useRef(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>{" "}
      </div>
    );
  }

  return (
    <div dir="rtl">
      {/* hero slider */}
      <div className="mt-24 md:mt-28">
        {/* desktop */}
        <section className="swiper relative hidden md:block">
          <Swiper
            ref={swiperRef}
            dir="rtl"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            rewind={true}
            breakpoints={{
              400: { slidesPerView: 1, spaceBetween: 0 },
            }}
          >
            <SwiperSlide className="swiper-slide">
              <Link href="/">
                <img src="./assets/image/heroSlider/1.jpg" alt="" />
              </Link>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <Link href="">
                <img src="./assets/image/heroSlider/2.webp" alt="" />
              </Link>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <Link href="">
                <img src="./assets/image/heroSlider/3.webp" alt="" />
              </Link>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <Link href="">
                <img src="./assets/image/heroSlider/4.webp" alt="" />
              </Link>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <Link href="">
                <img src="./assets/image/heroSlider/5.webp" alt="" />
              </Link>
            </SwiperSlide>
          </Swiper>
          <div className="absolute top-[50%] h-full left-1 z-20">
            <button onClick={() => swiperRef.current.swiper.slidePrev()}>
              <LeftOutlined
                style={{ fontSize: "20px" }}
                className="bg-gray-50 text-slate-800 ml-2 z-20 shadow-xl p-2 rounded-full"
              />
            </button>
          </div>

          {/* دکمه بعدی */}
          <div className="absolute top-[50%] h-full right-1 z-20">
            <button onClick={() => swiperRef.current.swiper.slideNext()}>
              <RightOutlined
                style={{ fontSize: "20px" }}
                className="bg-gray-50 text-slate-800 ml-2 z-20 shadow-xl p-2 rounded-full"
              />
            </button>
          </div>
        </section>
      </div>
      <main className="max-w-[1500px] mx-auto px-3 md:px-5">
        {/* amazing slider */}
        <AmazingBlock />
        {/* product slider 1 */}
        <section className="mt-14">
          <ProductCollection
            categoryName="categoryName"
            title="پرفروش ترین"
            product={products}
            tagName="برند"
          />
        </section>
        {/* category 1 */}
        <section className="flex flex-wrap justify-center gap-x-5 sm:gap-x-12 gap-y-5 px-3 md:px-10 my-10">
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill=""
              viewBox="0 0 256 256"
            >
              <path d="M176,18H80A22,22,0,0,0,58,40V216a22,22,0,0,0,22,22h96a22,22,0,0,0,22-22V40A22,22,0,0,0,176,18Zm10,198a10,10,0,0,1-10,10H80a10,10,0,0,1-10-10V40A10,10,0,0,1,80,30h96a10,10,0,0,1,10,10ZM138,60a10,10,0,1,1-10-10A10,10,0,0,1,138,60Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              موبایل
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M214,90.48V72a38,38,0,0,0-38-38H80A38,38,0,0,0,42,72V90.48a38,38,0,0,0,0,75.05V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V165.53a38,38,0,0,0,0-75ZM80,46h96a26,26,0,0,1,26,26V90.48A38.05,38.05,0,0,0,170,128v2H86v-2A38.05,38.05,0,0,0,54,90.48V72A26,26,0,0,1,80,46ZM208.35,154H208a6,6,0,0,0-6,6v40a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V160h0a6,6,0,0,0-6-6h-.35A26,26,0,1,1,74,128v40a6,6,0,0,0,12,0V142h84v26a6,6,0,0,0,12,0V128a26,26,0,1,1,26.35,26Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              لوازم منزل
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M92,138a10,10,0,1,1,10-10A10,10,0,0,1,92,138Zm72-20a10,10,0,1,0,10,10A10,10,0,0,0,164,118Zm-11.2,44.92a47,47,0,0,1-49.6,0,6,6,0,0,0-6.4,10.16,59,59,0,0,0,62.4,0,6,6,0,1,0-6.4-10.16ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90.11,90.11,0,0,0-87.07-89.95C118.3,55.23,118,71.85,118,72a10,10,0,0,0,20,0,6,6,0,0,1,12,0,22,22,0,0,1-44,0c0-.75.15-15.82,10.14-33.22A90,90,0,1,0,218,128Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              اسباب بازی
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26ZM60,69.09A89.23,89.23,0,0,1,81.78,122H38.2A89.65,89.65,0,0,1,60,69.09ZM38.2,134H81.78A89.23,89.23,0,0,1,60,186.91,89.65,89.65,0,0,1,38.2,134ZM122,217.8a89.66,89.66,0,0,1-53.5-22.34A101.18,101.18,0,0,0,93.82,134H122Zm0-95.8H93.82A101.18,101.18,0,0,0,68.5,60.54,89.66,89.66,0,0,1,122,38.2Zm95.8,0H174.22A89.23,89.23,0,0,1,196,69.09,89.65,89.65,0,0,1,217.8,122ZM134,38.2a89.66,89.66,0,0,1,53.5,22.34A101.18,101.18,0,0,0,162.18,122H134Zm0,179.6V134h28.18a101.18,101.18,0,0,0,25.32,61.46A89.66,89.66,0,0,1,134,217.8Zm62-30.89A89.23,89.23,0,0,1,174.22,134H217.8A89.65,89.65,0,0,1,196,186.91Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              وسایل ورزش
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M230.14,62.17A33.88,33.88,0,0,0,206,50a34,34,0,1,0-62.81,20,2,2,0,0,1-.23,2.54L72.56,143a2.06,2.06,0,0,1-2.55.23A34,34,0,1,0,50,206a34,34,0,1,0,62.81-20,2,2,0,0,1,.23-2.54l70.4-70.4a2,2,0,0,1,2.54-.23,34,34,0,0,0,44.15-50.65ZM220.6,98.48a22,22,0,0,1-28.24,4.17,14,14,0,0,0-17.4,1.92L104.57,175a14,14,0,0,0-1.92,17.4,22,22,0,1,1-40.41,8.26,6,6,0,0,0-5.93-6.93,7.28,7.28,0,0,0-.93.07,22,22,0,1,1,8.26-40.41A14,14,0,0,0,81,151.43L151.43,81a14,14,0,0,0,1.92-17.4,22,22,0,1,1,40.41-8.26,6,6,0,0,0,6.86,6.86,22,22,0,0,1,20,36.24Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              غذای پت
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M232,66H198.48l29.76-29.76a6,6,0,1,0-8.48-8.48L190,57.52V24a6,6,0,0,0-12,0V60.15a62,62,0,0,0-77.8,8l0,0h0C60.17,107.4,30.05,201.45,27.38,210a14,14,0,0,0,18.67,18.67c8.5-2.67,102.62-32.81,141.79-72.77a62,62,0,0,0,8-77.84H232a6,6,0,0,0,0-12Zm-52.69,81.41C170,157,157,166,142.69,174.24l-26.46-26.47a6,6,0,1,0-8.49,8.49l24,24c-41.69,22-89,36.82-89.73,37a6.57,6.57,0,0,0-1.06.44,2,2,0,0,1-2.7-2.7A6.57,6.57,0,0,0,38.7,214C39,213,67.55,121.72,104.48,81l35.27,35.26a6,6,0,1,0,8.48-8.48l-35.1-35.1a50,50,0,0,1,66.18,74.74Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              سوپرمارکت
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M240.37,172.8,138,96l25.59-19.2A6,6,0,0,0,166,72a38,38,0,1,0-76,0,6,6,0,0,0,12,0,26,26,0,0,1,51.82-2.88l-29.32,22-.21.16L15.63,172.8A14,14,0,0,0,24,198H232a14,14,0,0,0,8.39-25.2Zm-6.5,11.83A1.85,1.85,0,0,1,232,186H24a2,2,0,0,1-1.19-3.6L128,103.5l105.17,78.9A1.85,1.85,0,0,1,233.87,184.63Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              پوشاک
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M200.47,64.07A101.37,101.37,0,0,0,128.77,34H128A102,102,0,0,0,26,136v56a22,22,0,0,0,22,22H64a22,22,0,0,0,22-22V152a22,22,0,0,0-22-22H38.2A90.12,90.12,0,0,1,192,72.52,89.41,89.41,0,0,1,217.81,130H192a22,22,0,0,0-22,22v40a22,22,0,0,0,22,22h16a22,22,0,0,0,22-22V136A101.44,101.44,0,0,0,200.47,64.07ZM64,142a10,10,0,0,1,10,10v40a10,10,0,0,1-10,10H48a10,10,0,0,1-10-10V142Zm154,50a10,10,0,0,1-10,10H192a10,10,0,0,1-10-10V152a10,10,0,0,1,10-10h26Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              هدفون
            </div>
          </Link>
          <Link
            href="/ourStore"
            className="max-w-28 bg-gray-100 hover:bg-red-500 transition flex flex-col justify-between rounded-full p-2 h-32 w-20 group"
          >
            <svg
              className="w-full group-hover:rotate-6 transition fill-red-600 bg-gray-50 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              fill="#e02424"
              viewBox="0 0 256 256"
            >
              <path d="M200.12,55.87A102,102,0,1,0,55.88,200.12,102,102,0,1,0,200.12,55.87ZM94,211.37V152a2,2,0,0,1,2-2h64a2,2,0,0,1,2,2v59.37a90.49,90.49,0,0,1-68,0ZM146,138H110V99.71l36-18Zm45.64,53.64h0A90.93,90.93,0,0,1,174,205.39V152a14,14,0,0,0-14-14h-2V72a6,6,0,0,0-8.68-5.37l-48,24A6,6,0,0,0,98,96v42H96a14,14,0,0,0-14,14v53.39a90.93,90.93,0,0,1-17.64-13.75,90,90,0,1,1,127.28,0Z" />
            </svg>
            <div className="text-xs text-center text-zinc-800 group-hover:text-gray-50 mt-2 mb-4">
              لوازم آرایش
            </div>
          </Link>
        </section>
        {/* off slider */}
        <section className="lg:flex items-center">
          <div className="lg:w-1/3 mb-5 gap-5 lg:mb-0 grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:block">
            <img
              className="rounded-xl mx-auto"
              src="./assets/image/sectionImage/13.webp"
              alt=""
            />
            <img
              className="rounded-xl lg:hidden"
              src="./assets/image/sectionImage/14.webp"
              alt=""
            />
          </div>
          <div className="lg:w-2/3">
            <Swiper
              ref={swiperRef}
              dir="rtl"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation]}
              className="mySwiper border rounded-md"
              rewind={true}
              breakpoints={{
                400: { slidesPerView: 1, spaceBetween: 0 },
              }}
            >
              {products &&
                products.slice(0, 2).map((item: any) => (
                  <SwiperSlide key={item?.id} className="w-full px-2">
                    <section className="w-full  flex flex-col md:flex-row bg-white ">
                      <div className=" w-full md:w-1/3 flex justify-center items-center my-auto mx-auto rounded-xl">
                        <img
                          className=" w-full h-[95%] p-5 my-auto mx-auto rounded-xl"
                          src={
                            item?.images[0]?.url ||
                            `./assets/image/products/1.webp`
                          }
                          alt=""
                        />
                      </div>
                      <div className=" w-full relative md:w-2/3flex flex-col justify-end py-5">
                        <div className="mx-auto w-full md:pr-10">
                          <div className="text-zinc-800 text-lg">
                            {item?.title}
                          </div>
                          <div className="text-zinc-400 text-sm mt-1">
                            {item?.description}
                          </div>
                        </div>
                        <div className="mt-7 w-full md:pr-10  mx-auto ">
                          <div className="text-zinc-800 text-xl font-semibold">
                            {(item?.price).toLocaleString("fa-IR")}{" "}
                            <span className="text-sm font-VazirLight">
                              تومان
                            </span>
                          </div>
                          <div className="text-zinc-400 text-sm mt-1 line-through">
                            {(item?.price).toLocaleString("fa-IR")}{" "}
                            <span className="text-sm font-VazirLight">
                              تومان
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full md:pr-10 mt-5 mx-auto ">
                          <div className="w-1/2">
                            <div className="flex gap-x-1 text-zinc-600 text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="#16a70c"
                                viewBox="0 0 256 256"
                              >
                                <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" />
                              </svg>
                              طراحی زیبا
                            </div>
                            <div className="flex gap-x-1 text-zinc-600 text-sm mt-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="#16a70c"
                                viewBox="0 0 256 256"
                              >
                                <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" />
                              </svg>
                              کارت گرافیک قدرتمند
                            </div>
                          </div>
                          <div className="w-1/2">
                            <div className="flex gap-x-1 text-zinc-600 text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="#16a70c"
                                viewBox="0 0 256 256"
                              >
                                <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" />
                              </svg>
                              حافظه SSD
                            </div>
                            <div className="flex gap-x-1 text-zinc-600 text-sm mt-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="#16a70c"
                                viewBox="0 0 256 256"
                              >
                                <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" />
                              </svg>
                              صفحه نمایش لمسی
                            </div>
                          </div>
                        </div>
                        <div
                          className="clockdiv w-40 justify-center flex text-red-600 bg-red-100 px-3 py-1 rounded-md mt-6 text-center mx-auto md:mx-10 text-lg"
                          data-date="January 29, 2025 21:00:00"
                        >
                          <div>
                            <span className="seconds" >{(59).toLocaleString("fa-IR")}</span>
                          </div>
                          <div>
                            <span className="mr-1">:</span>
                            <span className="minutes" >{(30).toLocaleString("fa-IR")}</span>
                          </div>
                          <div>
                            <span className="mr-1">:</span>
                            <span className="hours" >{(10).toLocaleString("fa-IR")}</span>
                          </div>
                        </div>
                      </div>
                    </section>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </section>
        {/* section image 1 */}
        <section className="flex flex-col md:flex-row gap-3 my-16">
          <Link className="md:w-1/2" href="">
            <img
              className="rounded-2xl"
              src="./assets/image/sectionImage/7.webp"
              alt=""
            />
          </Link>
          <Link className="md:w-1/2" href="">
            <img
              className="rounded-2xl"
              src="./assets/image/sectionImage/8.webp"
              alt=""
            />
          </Link>
        </section>
        {/* category 2 */}
        <section className="flex flex-wrap justify-center gap-x-5 sm:gap-x-16 gap-y-5 px-3 md:px-10">
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/1.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">موبایل</div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/2.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              کالای دیجیتال
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/3.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              لوازم خانه
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/4.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">پوشاک</div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/5.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              کالای سوپرمارکت
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/6.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              دفتر و قلم
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/7.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              محصولات بهداشتی
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/8.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              محصولات ورزشی
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/9.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              ابزارآلات
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/10.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              موتور و تجهیزات
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/11.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              کالای سنتی
            </div>
          </Link>
          <Link href="/ourStore" className="max-w-28">
            <img
              className="w-full hover:rotate-6 transition"
              src="./assets/image/category/12.png"
              alt=""
            />
            <div className="text-xs text-center text-zinc-800 mt-2">
              اسباب بازی
            </div>
          </Link>
        </section>

        <div className="mt-14">
          <ProductCollection
            categoryName="categoryName"
            title="پرتخفیف ترین"
            product={products}
            tagName="برند"
          />
        </div>

        {/* suggested my view */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 bg-white my-10">
          <div className="bg-white p-3 rounded-tl-xl rounded-tr-xl sm:rounded-tl-none sm:rounded-tr-xl lg:rounded-r-xl sm:border-l border">
            <div className="flex flex-col gap-y-2 mb-5">
              <div className="text-zinc-700">هدفون، هدست و هندزفری</div>
              <div className="text-zinc-400 text-xs">بر اساس بازدیدهای شما</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="border-l border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/1.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/2.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-l py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/3.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/4.webp"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center text-sm text-red-500 hover:text-red-600 transition mt-5">
              <Link href="/ourStore">مشاهده همه</Link>
            </div>
          </div>
          <div className="bg-white p-3 sm:border-l border-x sm:border-r-0 sm:border-t sm:rounded-tl-xl border-b lg:border-l-0 lg:rounded-tl-none">
            <div className="flex flex-col gap-y-2 mb-5">
              <div className="text-zinc-700">گوشی موبایل</div>
              <div className="text-zinc-400 text-xs">بر اساس بازدیدهای شما</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="border-l border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/5.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/6.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-l py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/7.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/8.webp"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center text-sm text-red-500 hover:text-red-600 transition mt-5">
              <Link href="/ourStore">مشاهده همه</Link>
            </div>
          </div>
          <div className="bg-white p-3 border-x sm:border-l-0 sm:rounded-br-xl border-b lg:border-t lg:rounded-br-none">
            <div className="flex flex-col gap-y-2 mb-5">
              <div className="text-zinc-700">لپ تاپ و مک بوک</div>
              <div className="text-zinc-400 text-xs">بر اساس بازدیدهای شما</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="border-l border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/9.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/10.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-l py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/11.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/12.webp"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center text-sm text-red-500 hover:text-red-600 transition mt-5">
              <Link href="/ourStore">مشاهده همه</Link>
            </div>
          </div>
          <div className="bg-white p-3 rounded-bl-xl rounded-br-xl sm:rounded-br-none border-x border-b lg:border-t lg:rounded-tl-xl">
            <div className="flex flex-col gap-y-2 mb-5">
              <div className="text-zinc-700">ساعت هوشمند</div>
              <div className="text-zinc-400 text-xs">بر اساس بازدیدهای شما</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="border-l border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/13.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-b py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/14.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="border-l py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/15.webp"
                    alt=""
                  />
                </Link>
              </div>
              <div className="py-2">
                <Link href="/ourStore">
                  <img
                    className="max-w-[130px] mx-auto"
                    src="./assets/image/suggested/16.webp"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center text-sm text-red-500 hover:text-red-600 transition mt-5">
              <Link href="/ourStore">مشاهده همه</Link>
            </div>
          </div>
        </div>
        {/* section blog */}
        <div className="rounded-2xl mx-auto text-gray-100">
          {/* top blog */}
          <div className="flex justify-between px-5 md:px-10 items-center bg-white py-3 rounded-xl drop-shadow-lg mb-5">
            <div className="px-4 py-2 flex justify-center items-center gap-x-1 text-sm text-zinc-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                fill="#2e2e2e"
                viewBox="0 0 256 256"
              >
                <path d="M104,34H56A14,14,0,0,0,42,48V208a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V48A14,14,0,0,0,104,34ZM54,78h52V178H54Zm2-32h48a2,2,0,0,1,2,2V66H54V48A2,2,0,0,1,56,46Zm48,164H56a2,2,0,0,1-2-2V190h52v18A2,2,0,0,1,104,210Zm125.7-15L196.51,37.16a14,14,0,0,0-16.63-10.85L133.07,36.37A14.09,14.09,0,0,0,122.3,53l33.19,157.81a14,14,0,0,0,6.1,8.9,13.85,13.85,0,0,0,7.57,2.26,13.55,13.55,0,0,0,3-.32l46.81-10.05A14.09,14.09,0,0,0,229.7,195Zm-82.81-83.32,50.73-10.9,14.12,67.16L161,178.81Zm-6.63-31.56L191,69.19,195.15,89l-50.73,10.9Zm-4.66-32,46.8-10.05a2.18,2.18,0,0,1,.42,0,1.89,1.89,0,0,1,1.05.32,2,2,0,0,1,.89,1.31l3.75,17.82L137.79,68.34l-3.74-17.78A2.07,2.07,0,0,1,135.6,48.1Zm80.81,151.8L169.6,210a1.92,1.92,0,0,1-1.47-.27,2,2,0,0,1-.89-1.31l-3.75-17.82,50.72-10.9L218,197.43A2.07,2.07,0,0,1,216.41,199.9Z" />
              </svg>
              <span>خواندنی ها</span>
            </div>
            <Link href="/blog">
              <div className="transition px-4 py-2 flex justify-center font-VazirMedium items-center text-sm text-zinc-700 hover:text-zinc-600">
                مشاهده همه
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="#292929"
                  viewBox="0 0 256 256"
                >
                  <path d="M164.24,203.76a6,6,0,1,1-8.48,8.48l-80-80a6,6,0,0,1,0-8.48l80-80a6,6,0,0,1,8.48,8.48L88.49,128Z" />
                </svg>
              </div>
            </Link>
          </div>
          {/* main blog */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
            <BlogCard blog={blog} />
          </div>
        </div>
        {/* partner company */}
        <div className="bg-white my-10 rounded-2xl border">
          {/* top companys */}
          <div className="flex justify-center px-5 md:px-10 items-center bg-white py-3">
            <div className="px-4 py-2 flex justify-center items-center gap-x-2 text-lg text-zinc-700">
              <svg
                className="fill-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                fill="#121212"
                viewBox="0 0 256 256"
              >
                <path d="M196.89,130.94l-51.65-19a2,2,0,0,1-1.15-1.14l-19-51.66a13.92,13.92,0,0,0-26.12,0l-19,51.65a2,2,0,0,1-1.14,1.15l-51.66,19a13.92,13.92,0,0,0,0,26.12l51.65,19a2,2,0,0,1,1.15,1.14l19,51.66a13.92,13.92,0,0,0,26.12,0l19-51.65a2,2,0,0,1,1.14-1.15l51.66-19a13.92,13.92,0,0,0,0-26.12Zm-4.15,14.86-51.66,19a13.94,13.94,0,0,0-8.25,8.26l-19,51.65a1.92,1.92,0,0,1-3.6,0l-19-51.66a14,14,0,0,0-8.25-8.25h0l-51.65-19a1.92,1.92,0,0,1,0-3.6l51.66-19a13.94,13.94,0,0,0,8.25-8.26l19-51.65a1.92,1.92,0,0,1,3.6,0l19,51.66a13.94,13.94,0,0,0,8.26,8.25l51.65,19a1.92,1.92,0,0,1,0,3.6ZM146,40a6,6,0,0,1,6-6h18V16a6,6,0,0,1,12,0V34h18a6,6,0,0,1,0,12H182V64a6,6,0,0,1-12,0V46H152A6,6,0,0,1,146,40ZM246,88a6,6,0,0,1-6,6H230v10a6,6,0,0,1-12,0V94H208a6,6,0,0,1,0-12h10V72a6,6,0,0,1,12,0V82h10A6,6,0,0,1,246,88Z" />
              </svg>
              محبوب ترین برند ها
            </div>
          </div>
          {/* main companys */}
          <div className=" items-center">
            <Swiper
              ref={swiperRef}
              loop={true}
              dir="rtl"
              autoplay={{
                delay: 200,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
              rewind={true}
              breakpoints={{
                400: { slidesPerView: 3, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 15 },
                1024: { slidesPerView: 7, spaceBetween: 25 },
              }}
            >
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/1.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/2.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/3.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/4.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/5.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/6.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/7.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/8.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/9.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 border-l p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/10.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="h-full items-center my-2 p-2 sm:p-4">
                <img
                  className="mx-auto"
                  src="./assets/image/company/11.png"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  );
}
