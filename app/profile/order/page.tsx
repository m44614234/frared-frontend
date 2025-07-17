"use client";
import UserLayout from "@/components/layouts/UserPanelLayout";
import { useUser } from "@/context/UserContext";

const Profile_Order = () => {
  const { order, user } = useUser();
  const myOrder = order.filter((item: any) => item?.user?._id === user?._id);

  return (
    <UserLayout>
      <main dir="rtl" className="w-full mx-auto px-3 md:px-5">
        <div className="w-full bg-white shadow-box-md rounded-2xl p-2 md:p-5 mt-5 md:mt-0">
          <div className="">
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
                {myOrder.map((item: any) => (
                  <tr key={item?._id} className="hover:bg-zinc-100 text-xs md:text-sm">
                    <td className="px-3 py-4 border-b">
                      <p className="text-zinc-700">
                        #{(item?._id).slice(0, 6)}
                      </p>
                    </td>
                    <td className="p-3 border-b">
                      <p className="text-zinc-700">
                        {new Date(item?.createdAt).toLocaleDateString("fa-IR")}
                      </p>
                    </td>
                    <td className="p-3 border-b">
                      <p className="text-zinc-700">
                        {(item?.totalPrice).toLocaleString("fa-IR")} تومان
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
export default Profile_Order;
