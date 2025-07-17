import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { useRef } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const TopBanners = () => {
  const swiperRef: any = useRef(null);
  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  const items = [
    { id: 1, img: "/images/banner1.jpg" },
    { id: 2, img: "/images/banner2.jpg" },
    { id: 3, img: "/images/banner3.jpg" },
  ];
  return (
    <div className="w-full relative">
      <div className="w-full relative">
        <Swiper
          dir="rtl"
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          breakpoints={{
            340: { slidesPerView: 1 },
          }}
        >
          {items
            // .slice(blogImage.length - 4, blogImage.length)
            .map((item: any, index: any) => {
              return (
                <SwiperSlide
                  key={index}
                  className="w-full bg-cover bg-center  h-[350px]"
                >
                  <Link href={`/singleProduct/${item?._id}`}>
                    <Image
                      src={item?.img}
                      priority={true}
                      width={1400}
                      height={300}
                      className="w-full bg-cover bg-center  h-[100vh]"
                      alt=""
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className="flex flex-row  bottom-6 right-4 absolute z-20 gap-4 items-center">
          <button
            onClick={handlePrev}
            className="bg-slate-100 shadow-md w-10 h-10 text-center rounded-full  prev-button"
          >
            <ArrowLeftOutlined
              style={{
                color: "gray",
                marginTop: "7px",
                fontSize: "20px",
              }}
            />
          </button>
          <button
            onClick={handleNext}
            className="bg-slate-100 shadow-md w-10 h-10 text-center rounded-full  next-button"
          >
            <ArrowRightOutlined
              style={{
                color: "gray",
                marginTop: "7px",
                fontSize: "20px",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TopBanners;
