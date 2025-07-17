// components/PrivacyPolicy.js
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div
      dir="rtl"
      className="mt-20 p-4 md:mt-32 w-full md:w-[95%] flex flex-col"
    >
      <h1 className="text-2xl md:text-3xl font-VazirMedium text-slate-800 mb-4">سیاست حفظ حریم خصوصی</h1>
      <p className="text-md mt-2 font-VazirMedium">
        این سیاست حریم خصوصی توضیح می‌دهد که چگونه اطلاعات شما جمع‌آوری، استفاده
        و محافظت می‌شود.
      </p>
      <h2 className="text-xl md:text-2xl font-VazirMedium mt-6 text-slate-800">
        اطلاعاتی که جمع‌آوری می‌کنیم
      </h2>
      <p className="text-md mt-2 font-VazirMedium">
        ما ممکن است اطلاعات شخصی شما را در زمان ثبت‌نام، خرید یا ارتباط با ما
        جمع‌آوری کنیم.
      </p>
      <h2 className="text-xl md:text-2xl font-VazirMedium mt-6 text-slate-800">
        چگونه از اطلاعات شما استفاده می‌کنیم
      </h2>
      <p className="text-md mt-2 font-VazirMedium">
        اطلاعات شما برای ارائه خدمات بهتر، بهبود تجربه کاربری و ارتباط با شما
        استفاده می‌شود.
      </p>
      <h2 className="text-xl md:text-2xl font-VazirMedium mt-6 text-slate-800">امنیت اطلاعات</h2>
      <p className="text-md mt-2 font-VazirMedium">
        ما اقدامات امنیتی مناسبی را برای محافظت از اطلاعات شما انجام می‌دهیم.
      </p>
      <h2 className="text-xl md:text-2xl font-VazirMedium mt-6 text-slate-800">
        تغییرات در این سیاست
      </h2>
      <p className="text-md mt-2 font-VazirMedium">
        ما ممکن است این سیاست را به‌روزرسانی کنیم و تغییرات را در این صفحه منتشر
        خواهیم کرد.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
