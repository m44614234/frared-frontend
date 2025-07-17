"use client"
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "چگونه می‌توانم سفارش خود را پیگیری کنم؟",
      answer: "شما می‌توانید با ورود به حساب کاربری خود و رفتن به بخش سفارش‌ها، وضعیت سفارش خود را پیگیری کنید."
    },
    {
      question: "آیا امکان بازگشت کالا وجود دارد؟",
      answer: "بله، شما می‌توانید کالاهای خریداری شده را تا 14 روز پس از دریافت، بازگردانید."
    },
    {
      question: "روش‌های پرداخت چیست؟",
      answer: "ما از روش‌های مختلف پرداخت از جمله کارت اعتباری، پرداخت آنلاین و پرداخت در محل پشتیبانی می‌کنیم."
    },
    {
      question: "آیا ارسال کالا رایگان است؟",
      answer: "بله، برای سفارش‌های بالای 500 هزار تومان ارسال رایگان است."
    },
  ];

  const toggleOpen = (index : any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div dir='rtl' className="mx-auto p-6 mt-20 md:mt-32 flex flex-col w-full  md:w-[95%]">
      <h1 className="text-3xl font-ShabnamMedium mb-6">سوالات متداول</h1>
      <div className="space-y-4 w-full">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <button
              className="flex justify-between w-full p-4 text-left focus:outline-none"
              onClick={() => toggleOpen(index)}
            >
              <span className="font-VazirMedium text-slate-700">{faq.question}</span>
              <span>{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 border-t">
                <p className='font-VazirMedium text-md'>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
