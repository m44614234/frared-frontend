import Titles from "../templates/Titles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import ProductSwiper from "../templates/ProductSwiper";
import { useRef } from "react";
import {
  GiftOutlined,
  LeftCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Link from "next/link";

interface Props {
  categoryName: string;
  title: string;
  product: [];
  tagName: string;
}

const ProductCollection = ({
  categoryName,
  tagName,
  title,
  product,
}: Props) => {
  const swiperRef: any = useRef(null);

  return (
    <article className="w-full relative">
      <div className="flex justify-between px-1 items-center bg-white py-3 rounded-xl shadow-md">
        <div className="px-4 py-2 flex justify-center items-center gap-x-1 text-sm text-zinc-700">
          <GiftOutlined className="text-red-500" style={{ fontSize: "20px" }} />
          <span className="text-red-500">{title}</span>
          محصولات
        </div>
        <Link href="/ourStore">
          <div className="transition px-4 gap-1 py-2 flex justify-center items-center text-sm text-zinc-700 hover:text-zinc-600">
            مشاهده همه
            <LeftOutlined
              style={{ fontSize: "16px" }}
              className="text-zinc-700 hover:text-zinc-600"
            />
          </div>
        </Link>
      </div>

      <Swiper
        ref={swiperRef}
        dir="rtl"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper w-[99%] mx-auto"
        rewind={true}
        loop={true}
        breakpoints={{
          370: { slidesPerView: 1.5, spaceBetween: 8 },
          768: { slidesPerView: 2.5, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 15 },
          1200: { slidesPerView: 4.5, spaceBetween: 15 },
        }}
      >
        {product &&
          product?.map((item: any, index: any) => {
            // if (item.category === categoryName || item.tags === tagName) {
            return (
              <SwiperSlide
                key={item?._id}
                className="flex flex-row w-full rounded-md"
              >
                <ProductSwiper index={index} data={item} />
              </SwiperSlide>
            );
            // }
          })}
      </Swiper>

      <div className="absolute w-full  z-20 gap-x-6 mx-auto flex flex-row-reverse justify-center">
        <div>
          <button onClick={() => swiperRef.current.swiper.slidePrev()}>
            <LeftOutlined
              style={{ fontSize: "18px" }}
              className="bg-white text-red-800 ml-2 z-20 shadow-2xl transition-all duration-150 p-2 rounded-lg hover:text-white hover:bg-red-800"
            />
          </button>
        </div>

        {/* دکمه بعدی */}
        <div>
          <button onClick={() => swiperRef.current.swiper.slideNext()}>
            <RightOutlined
              style={{ fontSize: "20px" }}
              className="bg-white text-red-800 ml-2 z-20 shadow-2xl transition-all duration-150 p-2 rounded-lg hover:text-white hover:bg-red-800"
            />
          </button>
        </div>
      </div>

      <div className="bg-red-400 relative w-full h-72 rounded-2xl -mt-60 "></div>
    </article>
  );
};

export default ProductCollection;
