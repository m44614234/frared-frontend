"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import CheckBredCrumb from "@/components/templates/CheckBreadCrumb";
import { useFormik } from "formik";

const CheckoutForm = () => {
  const [sendType, setSendType] = useState("");

  const {
    createOrder,
    setCart,
    cart: cartProductState,
    user,
    cart,
  } = useUser();
  const router = useRouter();

  const totalAmount = cartProductState?.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      mobile: "",
      city: "",
      pincode: "",
      description: "",
      sendType: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("نام الزامی است"),
      lastname: Yup.string().required("نام خانوادگی الزامی است"),
      address: Yup.string().required("آدرس الزامی است"),
      description: Yup.string().required("توضیحات الزامی است"),
      mobile: Yup.string()
        .required("شماره موبایل الزامی است")
        .matches(/^d{10}$/, "شماره موبایل باید 10 رقمی باشد"), // مثال برای فرمت
      city: Yup.string().required("شهر الزامی است"),
      pincode: Yup.string().required("کد پستی الزامی است"),
    }),

    onSubmit: async () => {
      console.log("form submitted");
    },
  });

  const handlePayment = async () => {
    if (
      formik.values.firstname === "" ||
      formik.values.lastname === "" ||
      formik.values.pincode === "" ||
      formik.values.mobile === "" ||
      formik.values.address === ""
    ) {
      toast.warning("لطفا فیلد های ضروری را تکمیل نمایید");
      return; // اگر فیلدها پر نشده‌اند، تابع را متوقف کن
    }

    const api_key = "EA7C1R4-TN34MX1-JKNQFGZ-KK31GVH";
    const paymentUrl = "https://api.nowpayments.io/v1/invoice";
    const orderID = Math.floor(Math.random() * 1000000000);

    const orderDetail = {
      user: user._id,
      shippingInfo: {
        firstname: formik.values.firstname,
        lastname: formik.values.lastname,
        address: formik.values.address,
        city: formik.values.city,
        mobile: formik.values.mobile,
        pincode: formik.values.pincode,
        description: formik.values.description,
      },
      orderItems: cartProductState.map((item: any) => ({
        product: item._id,
        color: item.color[0],
        quantity: item.quantity,
        price: item.price,
      })),
      sendType: sendType,
      paymentData: {
        price_amount: totalAmount + 1,
        price_currency: "usd",
        order_id: orderID,
        ipn_callback_url:
          "https://nowpayments.io/payment/?iid=5784986998&paymentId=4556023832",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      },
      totalPrice: totalAmount,
      totalPriceAfterDiscount: totalAmount,
    };

    try {
      const res = await fetch(paymentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": api_key,
        },
        body: JSON.stringify(orderDetail.paymentData),
      });

      const data = await res.json();

      if (res.status === 400) {
        toast.warning("لطفا تمام فیلد ها را با دقت تکمیل نمایید");
        return;
      }

      if (data && data?.invoice_url) {
        await createOrder(orderDetail);
        window.location.href = data?.invoice_url;
      } else {
        toast.error("در پرداخت مشکلی رخ داده است.");
      }

      // پاک کردن سبد خرید و بازنشانی فرم
      setCart([]);
      localStorage.removeItem("cart");
      router.replace("/");
      formik.resetForm();
      toast.success("سفارش شما با موفقیت ثبت شد");
    } catch (error) {
      console.error("error during checkout", error);
      toast.error("پرداخت ناموفق");
    }
  };

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
        thirdColor="green-500"
        forthCaolor="green-400"
      />

      {/* main */}
      <div className="my-8 lg:my-10 py-5 lg:px-20 md:flex gap-5">
        <div className="md:w-8/12 bg-white shadow-box-md rounded-xl py-5 px-2 sm:px-6">
          {/* name */}
          <div className="text-zinc-800 text-lg font-semibold">
            جزئیات پرداخت
          </div>
          {/* inputs */}
          <div className="sm:flex gap-x-5 mt-5">
            <div className="sm:w-1/2 mb-2 sm:mb-0 flex flex-col gap-y-1">
              <label className="text-sm text-zinc-700 flex">
                نام
                <svg
                  className="fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={10}
                  fill="#4d4d4d"
                  viewBox="0 0 256 256"
                >
                  <path d="M210.23,101.57l-72.6,29,51.11,65.71a6,6,0,0,1-9.48,7.36L128,137.77,76.74,203.68a6,6,0,1,1-9.48-7.36l51.11-65.71-72.6-29a6,6,0,1,1,4.46-11.14L122,119.14V40a6,6,0,0,1,12,0v79.14l71.77-28.71a6,6,0,1,1,4.46,11.14Z" />
                </svg>
              </label>
              <input
                type="text"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
              />
            </div>
            <div className="sm:w-1/2 flex flex-col gap-y-1">
              <label className="text-sm text-zinc-700 flex">
                نام خانوادگی
                <svg
                  className="fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={10}
                  fill="#4d4d4d"
                  viewBox="0 0 256 256"
                >
                  <path d="M210.23,101.57l-72.6,29,51.11,65.71a6,6,0,0,1-9.48,7.36L128,137.77,76.74,203.68a6,6,0,1,1-9.48-7.36l51.11-65.71-72.6-29a6,6,0,1,1,4.46-11.14L122,119.14V40a6,6,0,0,1,12,0v79.14l71.77-28.71a6,6,0,1,1,4.46,11.14Z" />
                </svg>
              </label>
              <input
                type="text"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:flex gap-x-5 mt-7">
            <div className="sm:w-full flex flex-col gap-y-1">
              <label className="text-sm text-zinc-700 flex">
                شهر
                <svg
                  className="fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={10}
                  fill="#4d4d4d"
                  viewBox="0 0 256 256"
                >
                  <path d="M210.23,101.57l-72.6,29,51.11,65.71a6,6,0,0,1-9.48,7.36L128,137.77,76.74,203.68a6,6,0,1,1-9.48-7.36l51.11-65.71-72.6-29a6,6,0,1,1,4.46-11.14L122,119.14V40a6,6,0,0,1,12,0v79.14l71.77-28.71a6,6,0,1,1,4.46,11.14Z" />
                </svg>
              </label>
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange("city")}
                className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-7">
            <div className="flex flex-col gap-y-1">
              <label className="text-sm text-zinc-700 flex">
                شماره پلاک و واحد خیابان و کوچه
                <svg
                  className="fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={10}
                  fill="#4d4d4d"
                  viewBox="0 0 256 256"
                >
                  <path d="M210.23,101.57l-72.6,29,51.11,65.71a6,6,0,0,1-9.48,7.36L128,137.77,76.74,203.68a6,6,0,1,1-9.48-7.36l51.11-65.71-72.6-29a6,6,0,1,1,4.46-11.14L122,119.14V40a6,6,0,0,1,12,0v79.14l71.77-28.71a6,6,0,1,1,4.46,11.14Z" />
                </svg>
              </label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:flex gap-x-5 mt-5">
            <div className="sm:w-1/2 mb-2 sm:mb-0 flex flex-col gap-y-1">
              <label className="text-sm text-zinc-700 flex">
                تلفن
                <svg
                  className="fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={10}
                  fill="#4d4d4d"
                  viewBox="0 0 256 256"
                >
                  <path d="M210.23,101.57l-72.6,29,51.11,65.71a6,6,0,0,1-9.48,7.36L128,137.77,76.74,203.68a6,6,0,1,1-9.48-7.36l51.11-65.71-72.6-29a6,6,0,1,1,4.46-11.14L122,119.14V40a6,6,0,0,1,12,0v79.14l71.77-28.71a6,6,0,1,1,4.46,11.14Z" />
                </svg>
              </label>
              <input
                type="text"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
              />
            </div>
            <div className="sm:w-1/2 flex flex-col gap-y-1">
              <label className="text-sm text-zinc-700 flex">
                کد پستی
                <svg
                  className="fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={10}
                  fill="#4d4d4d"
                  viewBox="0 0 256 256"
                >
                  <path d="M210.23,101.57l-72.6,29,51.11,65.71a6,6,0,0,1-9.48,7.36L128,137.77,76.74,203.68a6,6,0,1,1-9.48-7.36l51.11-65.71-72.6-29a6,6,0,1,1,4.46-11.14L122,119.14V40a6,6,0,0,1,12,0v79.14l71.77-28.71a6,6,0,1,1,4.46,11.14Z" />
                </svg>
              </label>
              <input
                type="text"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange("pincode")}
                className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-y-1">
              <label className="text-sm text-zinc-700 flex">
                توضیحات اضافه
              </label>
              <textarea
                placeholder="نکات مهم درباره تحویل محصول"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                cols={30}
                rows={7}
                className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-400 focus:outline-none"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="md:w-4/12 mt-8 md:mt-0">
          <div className="px-2 sm:px-6 py-3 bg-white rounded-xl shadow-box-sm mb-5">
            <div className="flex gap-x-1 items-center text-zinc-700 border-b pb-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="#d02525"
                viewBox="0 0 256 256"
              >
                <path
                  d="M240,120v64a8,8,0,0,1-8,8H208a24,24,0,0,0-32-22.63h0A24,24,0,0,0,160,192H96a24,24,0,0,0-48,0H24a8,8,0,0,1-8-8V144H176V120Z"
                  opacity="0.2"
                />
                <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z" />
              </svg>
              نوع ارسال
            </div>
            <ul className="grid w-full gap-3">
              <li onClick={() => setSendType("پیشتاز")}>
                <input
                  type="radio"
                  id="5"
                  name="send"
                  defaultValue={5}
                  className="hidden peer"
                />
                <label
                  htmlFor="5"
                  className="flex items-center justify-start gap-x-2 w-full p-2 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-400 peer-checked:text-red-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <img
                    className="max-w-12 border rounded-md p-1"
                    src="./assets/image/fastpost.jpg"
                    alt=""
                  />
                  <div className="text-center">
                    <span className="text-sm">پست پیشتاز :</span>
                    <span className="text-sm">
                      {(1).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <div className="px-2 sm:px-6 py-3 bg-white rounded-xl shadow-box-sm mb-5">
            <div className="flex gap-x-1 items-center text-zinc-700 border-b pb-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="#d02525"
                viewBox="0 0 256 256"
              >
                <path
                  d="M232,96v96a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V96Z"
                  opacity="0.2"
                />
                <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
              </svg>
              نحوه پرداخت
            </div>
            <ul className="grid w-full gap-3">
              <li>
                <input
                  type="radio"
                  id="6"
                  name="pey"
                  defaultValue={6}
                  className="hidden peer"
                />
                <label
                  htmlFor="6"
                  className="flex items-center justify-start gap-x-2 w-full p-2 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-400 peer-checked:text-red-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    className="max-w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="#d02525"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
                  </svg>
                  <div className="text-center">
                    <span className="text-sm">پرداخت با درگاه بانکی </span>
                  </div>
                </label>
              </li>
            </ul>
          </div>
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
                <div>
                  {(formik.values.sendType === "ویژه"
                    ? totalAmount + 1
                    : totalAmount + 1
                  ).toLocaleString("fa-IR")}
                </div>
                <div>تومان</div>
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="mx-auto w-full text-center px-2 py-3 mt-4 text-sm bg-red-500 hover:bg-red-400 transition text-gray-100 rounded-lg"
            >
              تایید و پرداخت
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutForm;
