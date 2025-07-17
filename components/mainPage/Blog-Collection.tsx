import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import Titles from "../templates/Titles";
import { LeftCircleOutlined } from "@ant-design/icons";
interface Props {
  blog: any;
  title: string;
  textColor: any;
  slideCount: number;
  moreText: string;
  moreIcon: boolean;
  from: number;
  to: number;
}

export const Blog_Collection = ({
  blog,
  title,
  textColor,
  slideCount,
  moreText,
  moreIcon,
  from,
  to,
}: Props) => {
  const blogImage =
    blog &&
    blog.map((item: any) => {
      return item.images;
    });

  const Image =
    blogImage &&
    blogImage.map((item: any) => {
      return item[0];
    });

  const singleImage =
    Image &&
    Image.map((item: any) => {
      return item?.url;
    });

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-row-reverse justify-between w-full p-2  items-center text-slate-800 rounded-lg `}
      >
        <Titles title={title} />
        <Link
          href="/blog"
          className={` ${
            moreIcon === true ? "text-center items-center gap-1 flex" : "hidden"
          } `}
        >
          <LeftCircleOutlined
            className="text-slate-800"
            style={{ fontSize: "20px" }}
          />
          <p className="text-sm md:text-lg font-VazirLight"> {moreText}</p>
        </Link>
      </div>
      <Swiper
        // ref={swiperRef}
        dir="rtl"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper w-full rounded-md"
        rewind={true}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          770: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: slideCount, spaceBetween: 25 },
        }}
      >
        {blog &&
          blog?.slice(from, to).map((item: any, index: any) => {
            return (
              <SwiperSlide key={item?._id} className="w-full rounded-md">
                <Link
                  href={`/blog/${item?._id}`}
                  className="w-full rounded-md relative group text-md flex text-black bg-red-400 cursor-pointer  md:text-lg font-VazirLight"
                >
                  <img
                    src={singleImage[index] || "https://picsum.photos/200/300"}
                    alt=""
                    className="rounded-md max-h-[300px] w-full object-cover"
                  />

                  <div className="text-right   line-clamp-2 text-sm ps-2 transition-all duration-1000 ease-in bottom-0 w-full py-4  items-center absolute justify-center  z-20 bg-white/90  hover:h-full ">
                    {item?.title}
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
