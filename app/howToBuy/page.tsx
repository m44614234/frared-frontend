// components/OrderPage.js
import { CheckOutlined } from "@ant-design/icons";
import { title } from "process";
import React from "react";

const HowToBuy = () => {
  const order = [
    {
      id: 1,
      title: "انتخاب محصولات",
      icon: <CheckOutlined />,
    },
    {
      id: 2,
      title: "اضافه کردن به سبد خرید",
      icon: <CheckOutlined />,
    },
    {
      id: 3,
      title: "وارد کردن اطلاعات ارسال",
      icon: <CheckOutlined />,
    },
    {
      id: 4,
      title: "انتخاب شیوه پرداخت",
      icon: <CheckOutlined />,
    },
    {
      id: 5,
      title: "تأیید و ارسال سفارش",
      icon: <CheckOutlined />,
    },
  ];

  const items = [
    {
      id: 1,
      title: "پرداخت آنلاین (کارت به کارت)",
      icon: <CheckOutlined />,
    },
    {
      id: 2,
      title: "پرداخت در محل (در زمان تحویل)",
      icon: <CheckOutlined />,
    },
    // {
    //   id: 3,
    //   title: "پرداخت با کیف پول الکترونیکی",
    //   icon: <CheckOutlined />,
    // },
  ];
  return (
    <div
      dir="rtl"
      className="mt-20 p-4 md:mt-32 w-full md:w-[95%] gap-4 flex flex-col"
    >
      {/* <h1>صفحه ارسال سفارش</h1> */}

      <section>
        <p className="text-xl font-VazirBold mb-2 text-slate-700">
          نحوه ثبت سفارش
        </p>
        <p className="text-black font-VazirMedium text-md mb-2">
          برای ثبت سفارش، ابتدا محصولات مورد نظر خود را به سبد خرید اضافه کنید.
          سپس به سبد خرید رفته و اطلاعات لازم را وارد کنید.
        </p>
        <ol className="text-black space-y-1 font-VazirMedium text-md flex flex-col gap-2">
          {order.map((item) => (
            <div key={item.id} className="flex flex-row gap-1">
              <span className="text-green-700">{item.icon}</span>
              <span className="text-slate-950"> {item.title}</span>
            </div>
          ))}
        </ol>
      </section>

      <section>
        <p className="text-xl font-VazirBold mb-2 text-slate-700">
          شیوه‌های پرداخت
        </p>
        <p className="text-black font-VazirMedium text-md mb-2">
          ما چندین شیوه پرداخت را ارائه می‌دهیم:
        </p>
        <ul className="text-black space-y-1 font-VazirMedium text-md flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex flex-row gap-1">
              <span className="text-green-700">{item.icon}</span>
              <span className="text-slate-950"> {item.title}</span>
            </div>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-xl font-VazirBold mb-2 text-slate-700">
          سیاست‌های ارسال
        </p>
        <p className="text-black font-VazirMedium text-md mb-2">
          سفارشات معمولاً در مدت 1 تا 3 روز کاری ارسال می‌شوند. برای اطلاعات
          بیشتر درباره هزینه‌ها و زمان ارسال، لطفاً با ما تماس بگیرید.
        </p>
      </section>

      <footer style={{ marginTop: "20px", textAlign: "center" }}>
        <p>برای هرگونه سوال، با ما تماس بگیرید!</p>
      </footer>
    </div>
  );
};

export default HowToBuy;
