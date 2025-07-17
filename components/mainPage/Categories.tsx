"use client";
import Link from "next/link";
import React from "react";
import Titles from "../templates/Titles";

const Categories = ({ pCategories }: any) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    الکترونیک: <img src="/images/phone.png " />,
    پوشاک: <img src="/images/pants.png " />,
    "خانه و آشپزخانه": <img src="/images/wedding-dinner.png " />,
  };

  return (
    <div className="w-full">
      <Titles title=" : انتخاب بر اساس دسته بندی "  />

      <div
        dir="rtl"
        className="w-full grid grid-cols-2 text-center justify-center  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6"
      >
        {pCategories &&
          pCategories.map((category: any) => (
            <Link
              href={`/category/${category.title}`}
              key={category.title}
              className="cursor-pointer gap-3  h-56 text-center w-full justify-center flex flex-col p-4 rounded-full"
            >
              <div className="w-[121px] mx-auto rounded-full border border-slate-600">
                <div className="w-[120px] mx-auto h-full p-2  my-auto flex justify-center items-center rounded-r-md">
                  {iconMap[category.title]}
                </div>
              </div>

              <span className="text-md mx-auto text-slate-900 font-VazirLight">
                {category.title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Categories;
