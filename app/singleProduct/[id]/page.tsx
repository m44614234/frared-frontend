"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Meta from "@/components/templates/Meta";
import {
  CommentOutlined,
  GiftOutlined,
  HeartFilled,
  HeartOutlined,
  LeftOutlined,
  ShopOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
// import FeaturedCollection from "@/components/FeaturedCollection/Featured-Collection";
import { useUser } from "@/context/UserContext";
import { useProduct } from "@/context/ProductContext";
import useSWR from "swr";
import { baseUrl } from "@/utils/baseUrl";
import ProductCollection from "@/components/mainPage/Product-Collection";
import Services from "@/components/templates/Footer/Services";

interface SingleProductProps {
  params: {
    id: string;
  };
}

const singleProduct = ({ params }: SingleProductProps) => {
  const { id } = params;
  const [color, setColor] = useState<any>(null);
  const [star, setStar] = useState<any>();
  const [suggest, setSuggest] = useState<any>(true);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const { user: userData, AddtoCart, isInCart }: any = useUser();
  const {
    AddtoWish,
    products,
    isInWishlist,
    loading,
    AddtoCompare,
    prodComments: comments,
    isInCompare,
  }: any = useProduct();

  const fetcher = (...args: [string]) =>
    fetch(...args).then((res) => res.json());
  const {
    data: productState,
    // isLoading,
    error,
  } = useSWR(`${baseUrl}/product/${id}`, fetcher);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>{" "}
      </div>
    );
  }

  if (error) {
    return <div>خطایی رخ داده است</div>;
  }

  const createProductComment = async (e: any) => {
    e.preventDefault();

    if (!userData.username) {
      toast.error("لطفا ابتدا وارد شوید");
    }
    try {
      const res = await fetch(`${baseUrl}/productComment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: star, // امتیاز
          title,
          body: comment, // متن کامنت
          suggest,
          product: productState?._id,
          user: userData?._id,
        }),
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("نظر شما با موفقیت ثبت شد");
        setComment("");
        setSuggest(null);
        setTitle("");
        setStar(null);
      }
      if (res.status === 400) {
        toast.warning("لطفا تمام مقادیر را وارد کنید");
      }
    } catch (error: any) {
      console.log("error in create Product Comment", error);
    }
  };

  const commentLength: any = comments
    ? comments.filter((item: any) => item.product === id).length
    : 0;
  
    
    
  const productColors = productState?.color;

  // Share Button
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productState.title,
          text: ` بررسی کنید: ${productState.title}`,
          url: window.location.href, // لینک صفحه محصول
        });
        console.log("محصول با موفقیت به اشتراک گذاشته شد!");
      } catch (error) {
        console.error("خطا در اشتراک‌گذاری:", error);
      }
    } else {
      // اگر navigator.share پشتیبانی نشود، می‌توانید لینک‌های مستقیم برای شبکه‌های اجتماعی ارائه دهید
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`;
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(productState.title)}`;

      // باز کردن لینک‌ها در تب جدید
      window.open(facebookUrl, "_blank");
      window.open(twitterUrl, "_blank");
    }
  };

  const countTrue = comments?.filter(
    (item: any) => item.product === id && item?.suggest === true
  ).length;

  return (
    <main
      dir="rtl"
      className="max-w-[1500px] mx-auto px-3 md:px-5 mt-44 md:mt-32"
    >
      <div className="my-8 lg:my-10 lg:px-5">
        <div className="bg-white shadow-box-sm rounded-xl py-5 px-2 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* photo */}
            <div className="lg:w-4/12">
              <div className="flex gap-x-4">
                {isInWishlist(productState?._id) ? (
                  <svg
                    className="bg-gray-200 rounded-full p-1 hover:fill-red-500 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="red"
                    viewBox="0 0 256 256"
                  >
                    <path d="M178,34c-21,0-39.26,9.47-50,25.34C117.26,43.47,99,34,78,34A60.07,60.07,0,0,0,18,94c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,153.59,238,123.2,238,94A60.07,60.07,0,0,0,178,34ZM128,209.11C111.59,199.64,30,149.72,30,94A48.05,48.05,0,0,1,78,46c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,56.83,157.72,46,178,46a48.05,48.05,0,0,1,48,48C226,149.72,144.41,199.64,128,209.11Z" />
                  </svg>
                ) : (
                  <svg
                    className="bg-gray-200 cursor-pointer rounded-full p-1 hover:fill-red-500 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    onClick={() => AddtoWish(productState)}
                    fill="#2b2b2b"
                    viewBox="0 0 256 256"
                  >
                    <path d="M178,34c-21,0-39.26,9.47-50,25.34C117.26,43.47,99,34,78,34A60.07,60.07,0,0,0,18,94c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,153.59,238,123.2,238,94A60.07,60.07,0,0,0,178,34ZM128,209.11C111.59,199.64,30,149.72,30,94A48.05,48.05,0,0,1,78,46c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,56.83,157.72,46,178,46a48.05,48.05,0,0,1,48,48C226,149.72,144.41,199.64,128,209.11Z" />
                  </svg>
                )}
                {isInCompare(productState?._id) ? (
                  <svg
                    className="bg-gray-200 rounded-full p-1 hover:fill-zinc-500 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="gray"
                    viewBox="0 0 256 256"
                  >
                    <path d="M236.24,179.76a6,6,0,0,1,0,8.48l-24,24a6,6,0,0,1-8.48-8.48L217.52,190H200.94a70.16,70.16,0,0,1-57-29.31l-41.71-58.4A58.11,58.11,0,0,0,55.06,78H32a6,6,0,0,1,0-12H55.06a70.16,70.16,0,0,1,57,29.31l41.71,58.4A58.11,58.11,0,0,0,200.94,178h16.58l-13.76-13.76a6,6,0,0,1,8.48-8.48Zm-92.06-74.41a5.91,5.91,0,0,0,3.48,1.12,6,6,0,0,0,4.89-2.51l1.19-1.67A58.11,58.11,0,0,1,200.94,78h16.58L203.76,91.76a6,6,0,1,0,8.48,8.48l24-24a6,6,0,0,0,0-8.48l-24-24a6,6,0,0,0-8.48,8.48L217.52,66H200.94a70.16,70.16,0,0,0-57,29.31L142.78,97A6,6,0,0,0,144.18,105.35Zm-32.36,45.3a6,6,0,0,0-8.37,1.39l-1.19,1.67A58.11,58.11,0,0,1,55.06,178H32a6,6,0,0,0,0,12H55.06a70.16,70.16,0,0,0,57-29.31l1.19-1.67A6,6,0,0,0,111.82,150.65Z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => AddtoCompare(productState)}
                    className="bg-gray-200 cursor-pointer rounded-full p-1 hover:fill-zinc-500 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="#2b2b2b"
                    viewBox="0 0 256 256"
                  >
                    <path d="M236.24,179.76a6,6,0,0,1,0,8.48l-24,24a6,6,0,0,1-8.48-8.48L217.52,190H200.94a70.16,70.16,0,0,1-57-29.31l-41.71-58.4A58.11,58.11,0,0,0,55.06,78H32a6,6,0,0,1,0-12H55.06a70.16,70.16,0,0,1,57,29.31l41.71,58.4A58.11,58.11,0,0,0,200.94,178h16.58l-13.76-13.76a6,6,0,0,1,8.48-8.48Zm-92.06-74.41a5.91,5.91,0,0,0,3.48,1.12,6,6,0,0,0,4.89-2.51l1.19-1.67A58.11,58.11,0,0,1,200.94,78h16.58L203.76,91.76a6,6,0,1,0,8.48,8.48l24-24a6,6,0,0,0,0-8.48l-24-24a6,6,0,0,0-8.48,8.48L217.52,66H200.94a70.16,70.16,0,0,0-57,29.31L142.78,97A6,6,0,0,0,144.18,105.35Zm-32.36,45.3a6,6,0,0,0-8.37,1.39l-1.19,1.67A58.11,58.11,0,0,1,55.06,178H32a6,6,0,0,0,0,12H55.06a70.16,70.16,0,0,0,57-29.31l1.19-1.67A6,6,0,0,0,111.82,150.65Z" />
                  </svg>
                )}
                {/* should edit */}
                <div className="flex gap-x-4">
                  <svg
                    onClick={handleShare}
                    className="bg-gray-200 cursor-pointer rounded-full p-1 hover:fill-zinc-600 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="#2b2b2b"
                    viewBox="0 0 256 256"
                  >
                    <path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z" />
                  </svg>
                </div>
              </div>
              <img
                className="mySlides w-10/12 lg:w-full mx-auto border-2 rounded-xl"
                src={
                  (productState && productState?.images[0]?.url) ||
                  "../assets/image/products/91.jpg"
                }
              />
              <div className="flex mt-4">
                <div className="">
                  <img
                    className="opacity-50 hover:opacity-95 transition-all cursor-pointer w-10/12 lg:w-12/12 border-2 rounded-lg hover:border-red-400"
                    src={
                      (productState && productState?.images[1]?.url) ||
                      "../assets/image/products/91.jpg"
                    }
                  />
                </div>
                <div className="">
                  <img
                    className="opacity-50 hover:opacity-95 transition-all cursor-pointer w-10/12 lg:w-12/12 border-2 rounded-lg hover:border-red-400"
                    src={
                      (productState && productState?.images[2]?.url) ||
                      "../assets/image/products/91.jpg"
                    }
                  />
                </div>
                <div className="">
                  <img
                    className="opacity-50 hover:opacity-95 transition-all cursor-pointer w-10/12 lg:w-12/12 border-2 rounded-lg hover:border-red-400"
                    src={
                      (productState && productState?.images[3]?.url) ||
                      "../assets/image/products/91.jpg"
                    }
                  />
                </div>
                <div className="">
                  <img
                    className="opacity-50 hover:opacity-95 transition-all cursor-pointer w-10/12 lg:w-12/12 border-2 rounded-lg hover:border-red-400"
                    src={
                      (productState && productState?.images[4]?.url) ||
                      "../assets/image/products/91.jpg"
                    }
                  />
                </div>
              </div>
            </div>
            {/* info */}
            <div className="lg:w-5/12">
              <div className="mb-7 text-sm flex items-center gap-x-2 opacity-90">
                <Link
                  href="/"
                  className="text-zinc-800 hover:text-red-400 transition"
                >
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
                <Link
                  href="/ourStore"
                  className="text-zinc-800 hover:text-red-400 transition"
                >
                  محصولات
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
                <div className="text-red-400">{productState?.title}</div>
              </div>
              <div className="text-zinc-700 font-VazirMedium text-lg md:text-xl">
                {productState?.title}
              </div>
              <div className="text-zinc-400 font-VazirMedium  text-xs mt-4">
                {productState?.slug}
              </div>
              <div className="flex gap-x-4 mt-3">
                <div className="flex items-start gap-x-1 text-xs text-zinc-500">
                  <svg
                    className="fill-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill=""
                    viewBox="0 0 256 256"
                  >
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>
                  <span>
                    <span>
                      ({countTrue?.toLocaleString("fa-IR")}
                      +)
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-x-1 text-xs text-red-400">
                  <svg
                    className="fill-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    fill=""
                    viewBox="0 0 256 256"
                  >
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
                  </svg>
                  <span>
                    <span>{commentLength?.toLocaleString("fa-IR")}</span>
                    <span>دیدگاه</span>
                  </span>
                </div>
              </div>
              <div className="mt-8 text-zinc-700">ویژگی های محصول:</div>
              <section>
                <div className="grid grid-cols-3 max-w-md py-3 mb-5 gap-3">
                  <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                    <div className="text-zinc-500 text-xs">دسته بندی</div>
                    <div className="text-zinc-700 text-sm">
                      {productState?.category}
                    </div>
                  </div>

                  <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                    <div className="text-zinc-500 text-xs">برند</div>
                    <div className="text-zinc-700 text-sm">
                      {productState?.brand}
                    </div>
                  </div>
                </div>
                {productState?.type === "mobile" ? (
                  <div className="grid grid-cols-3 max-w-md py-3 mb-5 gap-3">
                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">سیستم عامل </div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.mobile?.os}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">
                        اندازه صفحه نمایش
                      </div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.mobile?.size_screen}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">حافظه داخلی</div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.mobile?.internal_memory}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">مقدار RAM</div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.mobile?.ram_amount}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">دوربین اصلی</div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.mobile
                          ?.resulation_camera &&
                          (productState?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                            "fa-IR"
                          )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">تعداد سیمکارت</div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.mobile?.sim_count &&
                          (productState?.deviceDetails?.mobile?.sim_count).toLocaleString(
                            "fa-IR"
                          )}
                      </div>
                    </div>
                  </div>
                ) : null}

                {productState?.type === "laptop" ? (
                  <div className="grid grid-cols-3 max-w-md py-3 mb-5 gap-3">
                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">مقدار RAM</div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.laptop?.ram_memory &&
                          (productState?.deviceDetails?.laptop?.ram_memory).toLocaleString(
                            "fa-IR"
                          )}{" "}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">
                        اندازه صفحه نمایش
                      </div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.laptop?.size_screen &&
                          (productState?.deviceDetails?.laptop?.size_screen).toLocaleString(
                            "fa-IR"
                          )}{" "}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">وزن</div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.laptop?.weight &&
                          (productState?.deviceDetails?.laptop?.weight).toLocaleString(
                            "fa-IR"
                          )}{" "}
                      </div>
                    </div>

                    <div className="flex flex-col gap-x-2 justufy-center bg-gray-100 rounded-md px-2 py-3">
                      <div className="text-zinc-500 text-xs">سیستم عامل</div>
                      <div className="text-zinc-700 text-sm">
                        {productState?.deviceDetails?.laptop?.os}
                      </div>
                    </div>
                  </div>
                ) : null}
              </section>
            </div>
            {/* buy */}
            <div className="lg:w-3/12">
              <div className="lg:mt-8 lg:mb-8">
                <div className="text-zinc-700">رنگ:</div>
                <ul className="flex flex-wrap gap-2">
                  {productColors &&
                    productColors?.map((item: any, index: any) => {
                      return (
                        <li>
                          <input
                            type="radio"
                            id={item?._id}
                            name="hosting"
                            defaultValue={item?.title}
                            className="hidden peer"
                          />
                          <label
                            htmlFor={item?._id}
                            className="inline-flex items-center justify-center px-2 py-3 text-gray-600 bg-white border border-gray-200 rounded-full cursor-pointer peer-checked:border-red-400 peer-checked:text-red-400 hover:text-gray-600 hover:bg-gray-100"
                          >
                            <div className="flex gap-x-2">
                              <div
                                className="w-5 h-5 rounded-full"
                                style={{ backgroundColor: item?.title }}
                              />
                              <div className="text-sm">
                                {item?.persianTitle}
                              </div>
                            </div>
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="p-3 border rounded-xl mx-auto divide-y hidden lg:block">
                <div className="flex gap-x-1 items-center text-zinc-600 text-sm pb-5 pt-3">
                  <svg
                    className="fill-zinc-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill=""
                    viewBox="0 0 256 256"
                  >
                    <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z" />
                  </svg>
                  <div>گارانتی {(18).toLocaleString("fa-IR")} ماهه</div>
                </div>
                <div className="flex gap-x-1 items-center text-zinc-600 text-sm py-5">
                  <svg
                    className="fill-zinc-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill=""
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z" />
                  </svg>
                  <div>ارسال {(2).toLocaleString("fa-IR")} روز کاری</div>
                </div>
                <div className="flex flex-col justify-center py-5">
                  <div className="text-zinc-600 text-left">
                    <span className="font-semibold text-xl">
                      {productState?.price?.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-xs">تومان</span>
                  </div>
                  <div className="text-xs text-red-400">
                    تنها {productState?.quantity?.toLocaleString("fa-IR")} عدد
                    در انبار باقی مانده
                  </div>
                </div>

                {isInCart(productState?._id) ? (
                  <Link
                    href="/cart"
                    className="flex text-center justify-center items-center gap-x-1 text-sm py-2 px-2 rounded-lg text-white bg-yellow-500 transition shadow-lg shadow-yellow-500/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      fill="#ededed"
                      viewBox="0 0 256 256"
                    >
                      <path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" />
                    </svg>
                    رفتن به سبد خرید
                  </Link>
                ) : (
                  <button
                    onClick={() => AddtoCart(productState)}
                    className="flex text-center w-full justify-center items-center gap-x-1 text-sm py-2 px-2 rounded-lg text-white bg-red-500 hover:bg-red-400 transition shadow-lg shadow-red-500/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      fill="#ededed"
                      viewBox="0 0 256 256"
                    >
                      <path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" />
                    </svg>
                    افزودن به سبد خرید
                  </button>
                )}
              </div>
              {/* fixed div buy */}
              <div className="fixed  flex z-50 flex-row bottom-20 right-0  md:bottom-0  lg:hidden bg-white shadow-md w-full px-5 py-3 gap-x-2">
                {isInCart(productState?._id) ? (
                  <Link
                    href="/cart"
                    className="flex w-full text-center justify-center items-center gap-x-1 text-sm py-2 px-2 rounded-lg text-white bg-yellow-500 transition shadow-lg shadow-yellow-500/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      fill="#ededed"
                      viewBox="0 0 256 256"
                    >
                      <path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" />
                    </svg>
                    رفتن به سبد خرید
                  </Link>
                ) : (
                  <button
                    onClick={() => AddtoCart(productState)}
                    className="flex text-center w-full justify-center items-center gap-x-1 text-sm py-2 px-2 rounded-lg text-white bg-red-500 hover:bg-red-400 transition shadow-lg shadow-red-500/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      fill="#ededed"
                      viewBox="0 0 256 256"
                    >
                      <path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" />
                    </svg>
                    افزودن به سبد خرید
                  </button>
                )}
                <span className="flex flex-col justify-center items-end w-1/2">
                  <div className="text-zinc-600 text-left">
                    <span className="font-semibold text-lg">
                      {productState?.price?.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-xs">تومان</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
          {/* service */}
          <Services />

          <div className="flex gap-x-8 mt-20 pb-2 border-b">
            <a
              className="text-zinc-600 text-sm hover:text-zinc-800 transition"
              href="#proper"
            >
              مشخصات
            </a>
            <a
              className="text-zinc-600 text-sm hover:text-zinc-800 transition"
              href="#description"
            >
              توضیحات
            </a>
            <a
              className="text-zinc-600 text-sm hover:text-zinc-800 transition"
              href="#comments"
            >
              دیدگاه ها
            </a>
          </div>
          <div className="p-4" id="proper">
            <span className="border-b-red-300 border-b text-zinc-800">
              مشخصات محصول
            </span>

            <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
              <div className="text-xs text-zinc-700">نام محصول:</div>
              <div className="text-xs text-zinc-700">{productState?.title}</div>
            </div>

            <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
              <div className="text-xs text-zinc-700">برند محصول:</div>
              <div className="text-xs text-zinc-700">{productState?.brand}</div>
            </div>

            <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
              <div className="text-xs text-zinc-700">دسته بندی محصول:</div>
              <div className="text-xs text-zinc-700">
                {productState?.category}
              </div>
            </div>

            {productState?.type === "mobile" ? (
              <section className="text-gray-500 w-full text-sm grid grid-cols-1 ">
                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">مدل:</div>
                  <div className="text-xs text-zinc-700">
                    {" "}
                    {productState?.deviceDetails?.mobile?.model &&
                      (productState?.deviceDetails?.mobile?.model).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">زمان معرفی محصول:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.time_intruduction &&
                      (productState?.deviceDetails?.mobile?.time_intruduction).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">سیستم عامل:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.resulation_camera &&
                      (productState?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">وزن محصول:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.weight &&
                      (productState?.deviceDetails?.mobile?.weight).toLocaleString(
                        "fa-IR"
                      )}{" "}
                    گرم
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700"> رزولوشن دوربین:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.resulation_camera &&
                      (productState?.deviceDetails?.mobile?.resulation_camera).toLocaleString(
                        "fa-IR"
                      )}
                    <span className="font-VazirLight text-xs">پیکسل </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    {" "}
                    دوربین های پشت گوشی:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {" "}
                    {productState?.deviceDetails?.mobile?.camera_front &&
                      (productState?.deviceDetails?.mobile?.camera_front).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">خروجی صدا:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.sound_output}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    {" "}
                    تکنولوژی صفحه نمایش:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {" "}
                    {productState?.deviceDetails?.mobile?.teqnology_screen}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    اندازه صفحه نمایش:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.size_screen &&
                      (productState?.deviceDetails?.mobile?.size_screen).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">توضیحات بدنه:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.disc_body}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">تعداد سیمکارت:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.sim_count &&
                      (productState?.deviceDetails?.mobile?.sim_count).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">چیپ:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.chip}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">فرکانس پردازنده:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.cpu_frequency}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">حافظه داخلی:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.internal_memory &&
                      (productState?.deviceDetails?.mobile?.internal_memory).toLocaleString(
                        "fa-IR"
                      )}
                    <span className="font-VazirLight text-xs">گیگابایت </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">مقدار RAM:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.ram_amount &&
                      (productState?.deviceDetails?.mobile?.ram_amount).toLocaleString(
                        "fa-IR"
                      )}{" "}
                    <span className="font-VazirLight text-xs">گیگابایت</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    پشتیبانی از حافظه خارجی:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.support_ram
                      ? "دارد"
                      : "ندارد"}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    شبکه های مخابراتی:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {
                      productState?.deviceDetails?.mobile
                        ?.telecommunicationـnetworks
                    }{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    شبکه های ارتباطی پشتیبانی شده:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {
                      productState?.deviceDetails?.mobile
                        ?.supportedـcommunicationـnetworks
                    }
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">ظرفیت باطری:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.battery_amount &&
                      (productState?.deviceDetails?.mobile?.battery_amount).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">قابلیت های شارژ:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.option_charging}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">توضیحات باطری:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.desc_battery}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">قابلیت nfc:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.nfc
                      ? "دارد"
                      : "ندارد"}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    محصولات داخل جعبه:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.boxes}{" "}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">توضیحات تکمیلی:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.mobile?.more_info}{" "}
                  </div>
                </div>
              </section>
            ) : null}

            {productState?.type === "laptop" ? (
              <section className="text-gray-500 text-sm grid grid-cols-1">
                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">وزن:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.weight &&
                      (productState?.deviceDetails?.laptop?.weight).toLocaleString(
                        "fa-IR"
                      )}
                    <span className="font-VazirLight text-xs">گرم</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">ابعاد:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.dimensions}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">سازنده پردازنده:</div>
                  <div className="text-xs text-zinc-700">
                    {
                      productState?.deviceDetails?.laptop
                        ?.processor_manufacturer
                    }
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">نسل پردازنده:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.processor_generation}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">سری پردازنده:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.processor_series}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">مدل پردازنده:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.processor_model}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    محدوده سرعت پردازنده:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.processor_speed_range}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">فرکانس پردازنده:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.processor_frequency}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">cache حافظه:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.cache_memory}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">RAM حافظه:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.ram_memory}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">حافظه هارد دیسک:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.hard_memory}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">نوع هارد دیسک:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.hard_type}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    سازنده کارت گرافیک:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.graphics_manufacturer}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">مدل کارت گرافیک:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.graphics_model}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    مقدار کارت گرافیک:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.graphics_memory}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    اندازه صفحه نمایش:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.size_screen}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">نوع صفحه نمایش:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.type_screen}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    توضیحات صفحه نمایش:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.description_screen}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    آپشن های صفحه نمایش:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.option_screen}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">وبکم:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.webcam}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">درایو:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.drive}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">روشنایی صفحه:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.lighting}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">پورت ها:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.ports &&
                      (productState?.deviceDetails?.laptop?.ports).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">پورت های usb2:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.usb2 &&
                      (productState?.deviceDetails?.laptop?.usb2).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">پورت های usb3:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.usb3 &&
                      (productState?.deviceDetails?.laptop?.usb3).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">تعداد پورت ها:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.usb_count &&
                      (productState?.deviceDetails?.laptop?.usb_count).toLocaleString(
                        "fa-IR"
                      )}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">سیستم عامل:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.os}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">ظرفیت باطری:</div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.battery}
                  </div>
                </div>

                <div className="flex items-center justify-between border p-3 w-full my-3 mx-auto rounded-xl">
                  <div className="text-xs text-zinc-700">
                    محصولات داخل جعبه:
                  </div>
                  <div className="text-xs text-zinc-700">
                    {productState?.deviceDetails?.laptop?.boxes}
                  </div>
                </div>
              </section>
            ) : null}
          </div>

          <div className="p-4 flex flex-col border-b" id="description">
            <span className="w-36 border-b-red-300 border-b text-zinc-800">
              توضیحات محصول
            </span>
            <span className="text-gray-500 pt-2  text-sm">
              {productState?.description}
            </span>
          </div>
          <div className="p-4 border-b" id="comments">
            <span className="border-b-red-300 border-b text-zinc-800">
              دیدگاه ها
            </span>
            <div className="lg:flex gap-5">
              <div className="lg:w-3/12 py-5">
                <div className="flex items-start gap-x-1 text-sm text-zinc-600">
                  <div>
                    <span>
                      (از {commentLength.toLocaleString("fa-IR")} نظر)
                    </span>
                    <span className="mr-1 text-green-600">
                      {countTrue?.toLocaleString("fa-IR")}
                    </span>
                  </div>
                  <svg
                    className="fill-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    fill=""
                    viewBox="0 0 256 256"
                  >
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>
                </div>
                <div className="mt-6 mb-2 text-sm text-zinc-700">
                  شما هم دیدگاه خود را ثبت کنید
                </div>
                <input
                  type="text"
                  onChange={(e: any) => setTitle(e.target.value)}
                  value={title}
                  placeholder="عنوان دیدگاه"
                  className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
                />
                <ul className="grid my-3 gap-5 grid-cols-2">
                  <li>
                    <input
                      type="radio"
                      onClick={() => setSuggest(true)}
                      id="yes"
                      name="hosting"
                      defaultValue="yes"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="yes"
                      className="inline-flex items-center justify-center w-full px-2 py-3 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-400 peer-checked:text-green-500 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-x-1">
                        <svg
                          className="fill-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          fill=""
                          viewBox="0 0 256 256"
                        >
                          <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                        </svg>
                        <div className="text-sm">پیشنهاد میشود</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      onClick={() => setSuggest(false)}
                      id="no"
                      name="hosting"
                      defaultValue="no"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="no"
                      className="inline-flex items-center justify-center w-full px-2 py-3 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-400 peer-checked:text-red-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-x-1">
                        <svg
                          className="fill-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          fill=""
                          viewBox="0 0 256 256"
                        >
                          <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                        </svg>
                        <div className="text-sm">پیشنهاد نمیشود</div>
                      </div>
                    </label>
                  </li>
                </ul>
                <textarea
                  placeholder="متن دیدگاه"
                  name="mailTicket"
                  cols={30}
                  rows={7}
                  onChange={(e: any) => setComment(e.target.value)}
                  value={comment}
                  className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-400 focus:outline-none"
                  defaultValue={""}
                />
                <button
                  onClick={createProductComment}
                  className="mx-auto w-full px-2 py-3 mt-5 text-sm bg-red-500 hover:bg-red-400 transition text-gray-100 rounded-lg"
                >
                  ارسال
                </button>
              </div>
              <div className="lg:w-9/12 divide-y">
                {comments &&
                  comments
                    ?.filter((item: any) => item.product === productState?._id)
                    ?.map((comment: any) => (
                      <div className="px-2 pt-5">
                        <div className="text-md font-VazirMedium text-zinc-700">
                          {comment?.title}
                        </div>
                        <div className="mt-2 flex gap-x-4 items-center border-b pb-3">
                          <div className="text-xs text-zinc-600">
                            {" "}
                            {new Date(comment?.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                          </div>
                          <div className="text-xs text-zinc-600">
                            {comment?.user?.email || comment?.user?.username}
                          </div>
                          <div className="text-xs text-zinc-50 bg-green-400 rounded-full px-2 py-1">
                            خریدار
                          </div>
                        </div>
                        {comment?.suggest === true ? (
                          <div className="flex items-center gap-x-1 pt-3">
                            <svg
                              className="fill-green-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width={22}
                              height={22}
                              fill=""
                              viewBox="0 0 256 256"
                            >
                              <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                            </svg>
                            <div className="text-sm text-green-500">
                              پیشنهاد میشود
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center pt-3 gap-x-1">
                            <svg
                              className="fill-red-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width={22}
                              height={22}
                              fill=""
                              viewBox="0 0 256 256"
                            >
                              <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                            </svg>
                            <div className="text-sm text-red-500">
                              پیشنهاد نمیشود
                            </div>
                          </div>
                        )}

                        <div className="mt-2 text-zinc-600 text-sm">
                          {comment?.body}
                        </div>
                        <div className="flex justify-end items-center gap-x-5 mt-3">
                          <div className="text-sm text-zinc-400">
                            آیا این دیدگاه برایتان مفید بود؟
                          </div>
                          <ul className="grid my-3 gap-5 grid-cols-2">
                            <li>
                              <input
                                type="radio"
                                id="isgood"
                                name="what"
                                defaultValue="isgood"
                                className="hidden peer"
                              />
                              <label
                                htmlFor="isgood"
                                className="inline-flex p-2 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-400 hover:bg-gray-100"
                              >
                                <svg
                                  className="fill-green-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  fill=""
                                  viewBox="0 0 256 256"
                                >
                                  <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                                </svg>
                              </label>
                            </li>
                            <li>
                              <input
                                type="radio"
                                id="isbad"
                                name="what"
                                defaultValue="isbad"
                                className="hidden peer"
                              />
                              <label
                                htmlFor="isbad"
                                className="inline-flex p-2 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-400 hover:bg-gray-100"
                              >
                                <svg
                                  className="fill-red-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  fill=""
                                  viewBox="0 0 256 256"
                                >
                                  <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                                </svg>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14">
          <ProductCollection
            categoryName="categoryName"
            title="پرفروش ترین"
            product={products}
            tagName="برند"
          />
        </section>
      </div>
    </main>
  );
};

export default singleProduct;
