"use client";
import Link from "next/link";
import Services from "./Services";
import { useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState<string>("");

  const createCustomer = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/customer/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (res.status === 201 || res.status === 200) {
      toast.success("دیگه از تخفیفات جا نمیمونی");
      setEmail("");
    }
  };

  return (
    <div dir="rtl" className="bg-white border-t pt-8 max-w-[1680px] mx-auto">
      {/* top footer */}
      <div className="flex flex-wrap gap-y-4 justify-between items-center px-6">
        <div className="flex flex-col">
          <div>
            <p className="text-red-700 font-ShabnamMedium text-2xl">
              <span className="text-red-600 font-VazirBlack text-2xl ">
                FARED STORE
              </span>
            </p>
          </div>
          <div className="text-xs text-zinc-600 mt-3">
          021-1234567 پشتیبانی تلفنی
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-x-1 border rounded-lg px-3 py-2 text-zinc-500 text-sm md:text-base"
            id="btn-back-to-top"
          >
            برو به بالا
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="#9c9c9c"
              viewBox="0 0 256 256"
            >
              <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm44.24-78.24a6,6,0,1,1-8.48,8.48L128,112.49,92.24,148.24a6,6,0,0,1-8.48-8.48l40-40a6,6,0,0,1,8.48,0Z" />
            </svg>
          </button>
        </div>
      </div>
      {/* services */}
      <Services />
      {/* links */}
      <div className="mx-auto shadow-lg">
        <div className="flex flex-wrap">
          <div className="px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-3 text-zinc-700">با فارد</h4>
              <ul className="grid gap-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    مقالات فارد
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    تماس با فارد
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    درباره فارد
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-3 text-zinc-700">خدمات مشتریان</h4>
              <ul className="grid gap-y-3">
                <li>
                  <Link
                    href="/faq"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    پرسش های متداول
                  </Link>
                </li>

                <li>
                  <Link
                    href="/howToBuy"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    شرایط استفاده
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacyPolicy"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    حریم خصوصی
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-3 text-zinc-700">راهنمای خرید از فارد</h4>
              <ul className="grid gap-y-3">
                <li>
                  <Link
                    href="/howToBuy"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    نحوه ثبت سفارش
                  </Link>
                </li>
                <li>
                  <Link
                    href="/howToBuy"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    رویه ارسال سفارش
                  </Link>
                </li>
                <li>
                  <Link
                    href="/howToBuy"
                    className="mb-2 hover:text-zinc-600 transition text-zinc-500 text-xs md:text-sm"
                  >
                    شیوه های پرداخت
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-2 text-right text-zinc-700">همراه ما باشید!</h4>
              <div className="mb-5 flex items-center justify-start">
                <Link
                  href="https://www.instagram.com/mr.hajizadeh_1376/"
                  title="instagram"
                  className="mr-3 flex h-11 md:h-12 w-11 md:w-12 items-center justify-center p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={64}
                    height={64}
                    fill="#575757"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                  </svg>{" "}
                </Link>
                <Link
                  href="https://t.me/hajizadeh_1376"
                  title="telegram"
                  className="mr-3 flex h-11 md:h-12 w-11 md:w-12 items-center justify-center p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={64}
                    height={64}
                    fill="#575757"
                    viewBox="0 0 256 256"
                  >
                    <path d="M236.88,26.19a9,9,0,0,0-9.16-1.57L25.06,103.93a14.22,14.22,0,0,0,2.43,27.21L80,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L173,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L239.77,35A9,9,0,0,0,236.88,26.19Zm-61.14,36L86.15,126.35l-49.6-9.73ZM96,200V152.52l24.79,21.74Zm87.53,8L100.85,135.5l119-85.29Z" />
                  </svg>{" "}
                </Link>
                <Link
                   href="https://api.whatsapp.com/send?phone=989212140481"
                  title="whatsapp"
                  className="mr-3 flex h-11 md:h-12 w-11 md:w-12 items-center justify-center p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={64}
                    height={64}
                    fill="#575757"
                    viewBox="0 0 256 256"
                  >
                    <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
                  </svg>{" "}
                </Link>
              </div>
              <div className="text-sm text-zinc-700">
                با ثبت ایمیل، از آخرین تخفیف‌ها با‌خبر شوید!
                <div className="flex gap-x-2 mt-5">
                  <input
                    className="w-9/12 p-3 border rounded-xl focus:outline-none"
                    placeholder="ایمیل شما..."
                    type="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    name="email"
                    id=""
                  />
                  <button
                    onClick={createCustomer}
                    className="text-sm disabled:bg-zinc-300 py-2 px-3 h-auto rounded-lg text-white bg-red-500 hover:bg-red-400 transition"
                  >
                    ارسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:flex pb-5">
          <div className="lg:w-9/12">
            <p className="mb-2 text-lg text-zinc-700">فروشگاه اینترنتی فارد</p>
            <p className="mb-7 text-zinc-600 text-sm leading-7">
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی
              متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمان ی کوتاه به دست
              مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی
              که فروشگاه اینترنتی فارد سال‌هاست بر روی آن‌ها کار کرده و توانسته
              از این طریق مشتریان ثابت خود را داشته باشد.
              <br />
              یکی از مهم‌ترین دغدغه‌های کاربران فارد یا هر فروشگاه‌ اینترنتی
              دیگری، این است که کالای خریداری شده چه زمانی به دستشان می‌رسد.
              فارد شیوه‌های مختلفی از ارسال را متناسب با فروشنده کالا،‌ مقصد
              کالا و همچنین نوع کالا در اختیار کاربران خود قرار می‌دهد.
            </p>
          </div>
          <div className="lg:w-3/12 flex justify-center">
            <a href="#">
              <img
                className="w-28 h-auto"
                src="./assets/image/services/symbol-01.png"
              />
            </a>
            <a href="#">
              <img
                className="w-28 h-auto"
                src="./assets/image/services/symbol-02.png"
              />
            </a>
            <a href="#">
              <img
                className="w-28 h-auto"
                src="./assets/image/services/symbol-01.png"
              />
            </a>
          </div>
        </div>
      </div>
      {/* COPYRIGHT */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 py-5 border-t text-gray-400">
        <span className="text-xs text-center sm:text-right">
          تمامی حقوق محفوظ است 2023
        </span>
      </div>
    </div>
  );
};
export default Footer;
