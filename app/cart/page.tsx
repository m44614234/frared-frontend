"use client";
import React, { useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import CheckBredCrumb from "@/components/templates/CheckBreadCrumb";

const Cart = () => {
  const router = useRouter()
  const {
    user,
    cart,
    RemoveFromCart,
    AddQuentity,
    RemoveQuentity,
  }: any = useUser();

  const totalAmount = cart?.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

   const checkUser = user.username ? true : false;
    useEffect(() => {
      if (checkUser === false) {
        router.replace("/");
      }
    });

  return (
    <main
      dir="rtl"
      className="max-w-[1500px] mx-auto px-3 md:px-5 mt-44 md:mt-32"
    >
      {/* top cart */}
      <CheckBredCrumb
        firstColor="green-500"
        secondColor="gray-200"
        thirdColor="gray-200"
        forthCaolor="green-400"
      />
      {/* main */}
      <div className="my-8 lg:my-10 py-5 lg:px-20 md:flex gap-5">
        <div className="md:w-8/12 bg-white shadow-box-md rounded-xl py-5 px-2 sm:px-6">
          {/* name */}
          <div className="text-zinc-700">سبد خرید شما</div>
          {/* count product */}
          <div className="text-zinc-400 text-xs mt-2">
            {cart?.length.toLocaleString("fa-IR")} کالا
          </div>
          {/* product */}
          {cart &&
            cart?.map((item: any) => (
              <div key={item?._id} className="mt-7 flex flex-col md:flex-row gap-y-5 border-b pb-4">
                <div className="w-10/12 mx-auto md:max-w-32">
                  <img
                    src={item?.images[0]?.url}
                    alt=""
                    className="w-full h-[120px] bg-cover"
                  />
                  <section className="flex h-10 w-full items-center justify-center rounded-lg border px-2 py-1 mt-5 mx-auto">
                    <button
                      onClick={() => AddQuentity(item?._id)}
                      className="px-4 py-1 font-VazirBold text-lg text-green-800 "
                    >
                      +
                    </button>
                    <div className="px-4 py-1 font-VazirBold  text-lg text-slate-900">
                      {item?.quantity.toLocaleString("fa-IR")}
                    </div>
                    <button
                      onClick={() => RemoveQuentity(item?._id)}
                      className="px-4 py-1 font-VazirBold text-lg text-red-800 "
                    >
                      -
                    </button>
                  </section>
                </div>
                <div className="mr-2 md:mr-5 flex flex-col justify-between w-full">
                  {/* title */}
                  <div className="text-xs sm:text-sm text-zinc-700">
                    {item?.title}
                  </div>
                  <div className="w-full space-y-2 mt-5">
                    {/* attribute */}
                   
                    <div className="flex items-center gap-x-2 text-xs text-zinc-500">
                      <div className="flex items-center gap-x-2">
                        <svg
                          className="fill-zinc-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          fill=""
                          viewBox="0 0 256 256"
                        >
                          <path d="M245.57,117.78l-14-35a13.93,13.93,0,0,0-13-8.8H182V64a6,6,0,0,0-6-6H24A14,14,0,0,0,10,72V184a14,14,0,0,0,14,14H42.6a30,30,0,0,0,58.8,0h53.2a30,30,0,0,0,58.8,0H232a14,14,0,0,0,14-14V120A6,6,0,0,0,245.57,117.78ZM182,86h36.58a2,2,0,0,1,1.86,1.26L231.14,114H182ZM22,72a2,2,0,0,1,2-2H170v68H22ZM72,210a18,18,0,1,1,18-18A18,18,0,0,1,72,210Zm82.6-24H101.4a30,30,0,0,0-58.8,0H24a2,2,0,0,1-2-2V150H170v15.48A30.1,30.1,0,0,0,154.6,186ZM184,210a18,18,0,1,1,18-18A18,18,0,0,1,184,210Zm50-26a2,2,0,0,1-2,2H213.4A30.05,30.05,0,0,0,184,162c-.67,0-1.34,0-2,.07V126h52Z" />
                        </svg>
                        <span>ارسال پست پیشتاز</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2 text-xs text-zinc-500">
                      <div className="flex items-center gap-x-2">
                        <svg
                          className="fill-zinc-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          fill=""
                          viewBox="0 0 256 256"
                        >
                          <path d="M230,96a6.19,6.19,0,0,0-.22-1.65l-14.34-50.2A14.07,14.07,0,0,0,202,34H54A14.07,14.07,0,0,0,40.57,44.15L26.23,94.35A6.19,6.19,0,0,0,26,96v16A38,38,0,0,0,42,143V208a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V143A38,38,0,0,0,230,112ZM52.11,47.45A2,2,0,0,1,54,46H202a2,2,0,0,1,1.92,1.45L216.05,90H40ZM102,102h52v10a26,26,0,0,1-52,0Zm-64,0H90v10a26,26,0,0,1-52,0ZM202,208a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V148.66a38,38,0,0,0,42-16.21,37.95,37.95,0,0,0,64,0,38,38,0,0,0,42,16.21Zm-10-70a26,26,0,0,1-26-26V102h52v10A26,26,0,0,1,192,138Z" />
                        </svg>
                        <span>مد کالا</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2 text-xs text-zinc-500">
                      <div className="flex items-center gap-x-2">
                        <svg
                          className="fill-orange-700"
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          fill=""
                          viewBox="0 0 256 256"
                        >
                          <path d="M243.6,148.8a6,6,0,0,1-8.4-1.2A53.58,53.58,0,0,0,192,126a6,6,0,0,1,0-12,26,26,0,1,0-25.18-32.5,6,6,0,0,1-11.62-3,38,38,0,1,1,59.91,39.63A65.69,65.69,0,0,1,244.8,140.4,6,6,0,0,1,243.6,148.8ZM189.19,213a6,6,0,0,1-2.19,8.2,5.9,5.9,0,0,1-3,.81,6,6,0,0,1-5.2-3,59,59,0,0,0-101.62,0,6,6,0,1,1-10.38-6A70.1,70.1,0,0,1,103,182.55a46,46,0,1,1,50.1,0A70.1,70.1,0,0,1,189.19,213ZM128,178a34,34,0,1,0-34-34A34,34,0,0,0,128,178ZM70,120a6,6,0,0,0-6-6A26,26,0,1,1,89.18,81.49a6,6,0,1,0,11.62-3,38,38,0,1,0-59.91,39.63A65.69,65.69,0,0,0,11.2,140.4a6,6,0,1,0,9.6,7.2A53.58,53.58,0,0,1,64,126,6,6,0,0,0,70,120Z" />
                        </svg>
                        <span>ارسال فروشنده</span>
                      </div>
                    </div>
                    {/* price */}
                    <div className="flex flex-row justify-between">
                    <div className="text-gray-700 pt-4">
                      <span className="text-xl font-bold">
                        {(item?.price).toLocaleString("fa-IR")}
                      </span>
                      <span className="text-sm">تومان</span>
                    </div>
                    <DeleteFilled className=" w-22 h-22 text-red-500" onClick={()=>RemoveFromCart(item._id)} /> 
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
        </div>
        <section className="md:w-4/12  mt-8 md:mt-0">
          <div className="px-2 sm:px-6 flex flex-col py-3 bg-white rounded-xl shadow-box-sm">
            <div className="flex gap-x-1 items-center text-zinc-700">
              <svg
                className="fill-red-500"
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                fill=""
                viewBox="0 0 256 256"
              >
                <path d="M216,66H174V64a46,46,0,0,0-92,0v2H40A14,14,0,0,0,26,80V200a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V80A14,14,0,0,0,216,66ZM94,64a34,34,0,0,1,68,0v2H94ZM218,200a2,2,0,0,1-2,2H40a2,2,0,0,1-2-2V80a2,2,0,0,1,2-2H216a2,2,0,0,1,2,2Z" />
              </svg>
              سبد شما
            </div>
            <div className="flex gap-x-1 justify-between items-center text-zinc-600 mt-5 bg-gray-100 rounded-lg px-2 py-3 text-sm">
              <div>قیمت کالاها ({cart.length.toLocaleString("fa-IR")})</div>
              <div className="flex gap-x-1">
                <div>{totalAmount?.toLocaleString("fa-IR")}</div>
                <div>تومان</div>
              </div>
            </div>
            <div className="flex gap-x-1 justify-between items-center text-zinc-600 mt-3 bg-gray-100 rounded-lg px-2 py-3 text-sm">
              <div>تخفیف</div>
              <div className="flex gap-x-1">
                <div>{(0).toLocaleString("fa-IR")}</div>
                <div>تومان</div>
              </div>
            </div>
            <div className="flex gap-x-1 justify-between items-center text-zinc-800 mt-3 bg-gray-100 rounded-lg px-2 py-3 text-sm">
              <div>جمع سبد خرید</div>
              <div className="flex gap-x-1">
                <div>{totalAmount?.toLocaleString("fa-IR")}</div>
                <div>تومان</div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mx-auto w-full text-center px-2 py-3 mt-4 text-sm bg-red-500 hover:bg-red-400 transition text-gray-100 rounded-lg"
            >
              تایید و تکمیل سفارش
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Cart;
