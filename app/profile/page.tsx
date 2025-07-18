"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import UserLayout from "@/components/layouts/UserPanelLayout";

const Profile = () => {
  const { user: userData, order, loading } = useUser();

  const path = usePathname();
  const router = useRouter();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>{" "}
      </div>
    );
  }

  const myOrder =
    order && order.filter((item: any) => item?.user?._id === userData?._id);

  if (path.startsWith("/profile") && !userData.username) {
    router.replace("/");
  }

  console.log("Total Profile Orders:", myOrder);
  
  return (
    <UserLayout>
      <main dir="rtl" className="w-full mx-auto px-3 ">
        <div className="md:w-full bg-white shadow-box-md rounded-2xl p-5 mt-5 md:mt-0">
          <div className="grid grid-cols-2 md:flex gap-5">
            <div className="flex md:w-1/4 gap-x-2 items-center bg-green-500 rounded-2xl px-3 py-2 text-xs sm:text-base">
              <svg
                className="fill-zinc-100 bg-green-600 rounded-xl p-1"
                xmlns="http://www.w3.org/2000/svg"
                width={44}
                height={44}
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path
                  d="M216,64l-12.16,66.86A16,16,0,0,1,188.1,144H62.55L48,64Z"
                  opacity="0.2"
                />
                <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" />
              </svg>
              <div className="text-zinc-100 space-y-1">
                <div>سفارشات کل</div>
                <div>
                  {myOrder && myOrder.length.toLocaleString("fa-IR") }
                </div>
              </div>
            </div>
            <div className="flex md:w-1/4 gap-x-2 items-center bg-blue-500 rounded-2xl px-3 py-2 text-xs sm:text-base">
              <svg
                className="fill-zinc-100 bg-blue-600 rounded-xl p-1"
                xmlns="http://www.w3.org/2000/svg"
                width={44}
                height={44}
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path
                  d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z"
                  opacity="0.2"
                />
                <path d="M230.33,141.06a24.43,24.43,0,0,0-21.24-4.23l-41.84,9.62A28,28,0,0,0,140,112H89.94a31.82,31.82,0,0,0-22.63,9.37L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9ZM164,96a36,36,0,0,0,5.9-.48,36,36,0,1,0,28.22-47A36,36,0,1,0,164,96Zm60-12a20,20,0,1,1-20-20A20,20,0,0,1,224,84ZM164,40a20,20,0,0,1,19.25,14.61,36,36,0,0,0-15,24.93A20.42,20.42,0,0,1,164,80a20,20,0,0,1,0-40Z" />
              </svg>
              <div className="text-zinc-100 space-y-1">
                <div>تحویل داده شده</div>
                <div>
                  {myOrder && myOrder
                    ?.filter(
                      (item: any) => item.orderStatus === "تحویل داده شده"
                    )
                    .length.toLocaleString("fa-IR")}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="text-zinc-800 text-lg mb-4">سفارش های اخیر من:</div>
            <table className="w-full">
              <thead>
                <tr className="border-y">
                  <th>
                    <p className="text-xs md:text-sm font-normal flex items-center text-zinc-400 py-3">
                      شماره سفارش
                    </p>
                  </th>
                  <th>
                    <p className="text-xs md:text-sm font-normal flex items-center text-zinc-400">
                      تاریخ
                    </p>
                  </th>
                  <th>
                    <p className="text-xs md:text-sm font-normal flex items-center text-zinc-400">
                      مبلغ
                    </p>
                  </th>
                  <th>
                    <p className="text-xs md:text-sm font-normal flex items-center text-zinc-400">
                      وضعیت
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrder && myOrder?.map((item: any) => (
                  <tr className="hover:bg-zinc-100 text-xs md:text-sm">
                    <td className="px-3 py-4 border-b">
                      <p className="text-zinc-700">
                        #{(item?._id).slice(0, 6)}
                      </p>
                    </td>
                    <td className="p-3 border-b">
                      <p className="text-zinc-700">
                        {item?.createdAt && new Date(item?.createdAt).toLocaleDateString("fa-IR")}
                      </p>
                    </td>
                    <td className="p-3 border-b">
                      <p className="text-zinc-700">
                        {item && (item?.paymentData?.price_amount).toLocaleString("fa-IR")} تومان
                      </p>
                    </td>
                    <td className="p-3 border-b">
                      <p className="text-yellow-500">{item?.orderStatus}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </UserLayout>
  );
};

export default Profile;
