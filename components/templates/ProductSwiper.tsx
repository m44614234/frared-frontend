import React, { useEffect } from "react";
import {
  FundViewOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
  ShoppingOutlined,
} from "@ant-design/icons";
import ReactStars from "react-stars";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useProduct } from "@/context/ProductContext";

const ProductSwiper = ({ data, index }: any) => {
  const { AddtoCart, isInCart }: any = useUser();
  const {
    products: productState,
    AddtoWish,
    isInWishlist,
    AddtoCompare,
    isInCompare,
    compare,
    prodComments
  }: any = useProduct();


  const productImage =
    productState &&
    productState.map((item: any) => {
      return item.images;
    });

  const Image =
    productImage &&
    productImage.map((item: any) => {
      return item[0];
    });

  const singleImage =
    Image &&
    Image.map((item: any) => {
      return item?.url;
    });


    const productComments = prodComments && prodComments.filter((item: any) => item?.product === data?._id);
   
  
     
  return (
    <div className="card my-2 p-2 md:p-4 bg-white rounded-2xl drop-shadow-lg">
      <div className="flex justify-between">
        <div className="bg-red-200 rounded-lg px-2 py-1 text-red-500 flex items-center gap-x-1 text-xs">
          <div>{(data?.discount || 0).toLocaleString("fa-IR")}%</div>
          <div>تخفیف</div>
        </div>
        <section className="flex gap-x-1">
          {isInWishlist(data?._id) ? (
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
              onClick={() => AddtoWish(data)}
              fill="#2b2b2b"
              viewBox="0 0 256 256"
            >
              <path d="M178,34c-21,0-39.26,9.47-50,25.34C117.26,43.47,99,34,78,34A60.07,60.07,0,0,0,18,94c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,153.59,238,123.2,238,94A60.07,60.07,0,0,0,178,34ZM128,209.11C111.59,199.64,30,149.72,30,94A48.05,48.05,0,0,1,78,46c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,56.83,157.72,46,178,46a48.05,48.05,0,0,1,48,48C226,149.72,144.41,199.64,128,209.11Z" />
            </svg>
          )}
          {isInCompare(data?._id) ? (
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
              onClick={() => AddtoCompare(data)}
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
        </section>
      </div>
      <div className="image-box mb-6 ">
        <Link href={`/singleProduct/${data?._id}`} className="cursor-pointer">
          <img
            className="max-w-52 h-[150px] mx-auto md:h-[180px] "
            src={singleImage[index] || "../assets/image/products/91.jpg"}
            alt=""
          />
        </Link>
      </div>
      <div className="space-y-6">
        <span className="mb-2 h-8 md:h-10 flex justify-between">
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-semibold text-zinc-800">
              {data?.title}
            </span>
            <span className="text-xs text-zinc-500">{data?.brand}</span>
          </div>
          <div className="flex items-start gap-x-1 text-xs text-zinc-500">
            <span>
              <span>
                ({(productComments?.length).toLocaleString("fa-IR")}+)
              </span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              fill="#f9bc00"
              viewBox="0 0 256 256"
            >
              <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
            </svg>
          </div>
        </span>
        <div className="bg-gray-100 rounded-xl py-3 px-2 flex flex-col justify-between items-center lg:flex-row">
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-center gap-x-1 font-semibold text-sm text-zinc-800">
              <div>{(data?.price).toLocaleString("fa-IR")}</div>
              <div>تومان</div>
            </div>
            <div className="flex justify-center gap-x-1 text-xs text-zinc-400">
              <div className="line-through">
                {(data?.price).toLocaleString("fa-IR")}
              </div>
              <div className="line-through">تومان</div>
            </div>
          </div>
          <div>
            {isInCart(data?._id) ? (
              <Link
                href="/cart"
                className="flex items-center gap-x-1 text-sm py-2 px-2 rounded-lg text-white bg-yellow-500 transition shadow-lg shadow-yellow-500/50"
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
                سبد خرید
              </Link>
            ) : (
              <button
                onClick={() => AddtoCart(data)}
                className="flex items-center gap-x-1 text-sm py-2 px-2 rounded-lg text-white bg-red-500 hover:bg-red-400 transition shadow-lg shadow-red-500/50"
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
                خرید محصول
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSwiper;
