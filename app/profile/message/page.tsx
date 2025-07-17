import UserLayout from "@/components/layouts/UserPanelLayout";

const Profile_Message = () => {
  return (
    <UserLayout>
      <main dir="rtl" className="w-full mx-auto px-3 md:px-5">
        <div className="w-full bg-white shadow-box-md rounded-2xl p-5 mt-5 md:mt-0">
          <div className="">
            <div className="text-zinc-800 text-lg mb-4">پیغام ها:</div>
            <div className="space-y-5">
              <div className="bg-zinc-100 rounded-md">
                <div className="border-b border-b-zinc-500 px-3 py-2 text-zinc-800 text-sm flex justify-between items-center">
                  تایید نظر
                  <a
                    href=""
                    className="text-zinc-50 hover:text-zinc-100 transition bg-blue-400 px-3 py-1 text-xs rounded-md"
                  >
                    بهمن 1402
                  </a>
                </div>
                <div className="px-5 py-4 text-zinc-600 text-sm flex justify-between items-center">
                  نظر شما برای محصول کیبورد مدل تسکو تایید و منتشر شد.
                  <a
                    href=""
                    className="text-zinc-50 hover:text-zinc-100 transition bg-red-400 hover:bg-red-500 px-3 py-1 text-xs rounded-md"
                  >
                    جزئیات
                  </a>
                </div>
              </div>
              <div className="bg-zinc-100 rounded-md">
                <div className="border-b border-b-zinc-500 px-3 py-2 text-zinc-800 text-sm flex justify-between items-center">
                  ثبت سفارش
                  <a
                    href=""
                    className="text-zinc-50 hover:text-zinc-100 transition bg-blue-400 px-3 py-1 text-xs rounded-md"
                  >
                    دی 1402
                  </a>
                </div>
                <div className="px-5 py-4 text-zinc-600 text-sm flex justify-between items-center">
                  سفارش شما ثبت و درحال بسته بندی میباشد.
                  <a
                    href=""
                    className="text-zinc-50 hover:text-zinc-100 transition bg-red-400 hover:bg-red-500 px-3 py-1 text-xs rounded-md"
                  >
                    جزئیات
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
};
export default Profile_Message;
