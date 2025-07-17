"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import Drawer from "./Drawer";
import { game, laptop, mobile, pc } from "@/utils/menu";

export function Header() {
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user, cart } = useUser();
  const checkUser = user.username ? true : false;

  useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setShow(false)
    );
  }, []);

  return (
    <div dir="rtl">
      {/* header */}
      <header>
        <div className="fixed left-0 right-0 top-0 z-50 bg-white">
          {/* Header Desktop */}
          <section>
            {/* Top Header */}
            <div className="container relative px-5 z-30 flex max-w-[1680px] items-center justify-between gap-x-4 bg-white py-4">
              <Drawer />
              {/* LOGO */}
              <div className="hidden md:block z-0">
                <Link href="/">
                  <span className="text-red-600 font-VazirBlack text-2xl ">
                    FARED STORE
                  </span>
                </Link>
              </div>

              {/* Search Box */}
              <Search />

              {/* Mobile Desktop */}
              <div className="bg-red-500 md:hidden">
                {/* Top Section */}
                <div className="container relative z-30 flex h-16 items-center justify-between gap-x-4 bg-white">
                  {/* logo */}
                  <div>
                    <Link href="/">
                      <span className="text-red-600 font-VazirBlack text-2xl ">
                        FARED STORE
                      </span>
                    </Link>
                  </div>
                </div>
                {/* Bottom Section */}
                <section
                  className="absolute left-0 hidden right-0 top-full z-40 bg-white pb-4 pt-5 transition-transform duration-300 md:flex"
                  id="mobile-header-bottom"
                >
                  <Search />
                </section>
              </div>
              {/* Cart and Account */}
              <div className="flex items-center justify-center gap-x-6">
                {/* Account */}
                <div className="flex items-center py-2 px-2 rounded-xl bg-red-500 hover:bg-red-400 transition shadow-lg shadow-red-500/50">
                  {user.username ? (
                    <Link
                      className="text-gray-100 flex gap-x-1"
                      href="/profile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z" />
                      </svg>
                      <span className="hidden md:block text-sm">
                        حساب کاربری
                      </span>
                    </Link>
                  ) : (
                    <Link className="text-gray-100 flex gap-x-1" href="/login">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z" />
                      </svg>
                      <span className="hidden md:block text-sm">
                        ورود / ثبت نام
                      </span>
                    </Link>
                  )}

                  <div
                    className="z-50 !ml-5 hidden w-60 rounded-lg bg-white shadow-lg"
                    id="dropdownAccountDesktop"
                  ></div>
                </div>
                {/* card */}
                <section className="flex items-center p-2 rounded-xl bg-red-500 hover:bg-red-400 transition shadow-lg shadow-red-500/50">
                  <Link href="/cart" className="group relative">
                    <span className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                      >
                        <path d="M134,120v56a6,6,0,0,1-12,0V120a6,6,0,0,1,12,0ZM237.88,97.85,224,201.85A14,14,0,0,1,210.13,214H45.87A14,14,0,0,1,32,201.85l-13.87-104A14,14,0,0,1,32,82H69.28l54.2-61.95a6,6,0,0,1,9,0l54.2,62H224a14,14,0,0,1,13.87,15.85ZM85.22,82h85.56L128,33.11ZM225.5,94.68A2,2,0,0,0,224,94H32a2,2,0,0,0-1.51.68A2,2,0,0,0,30,96.26l13.86,104a2,2,0,0,0,2,1.73H210.13a2,2,0,0,0,2-1.73L226,96.26A1.93,1.93,0,0,0,225.5,94.68ZM181.4,114a6,6,0,0,0-6.57,5.37l-5.6,56A6,6,0,0,0,174.6,182l.61,0a6,6,0,0,0,6-5.4l5.6-56A6,6,0,0,0,181.4,114ZM81.17,119.4a6,6,0,0,0-11.94,1.2l5.6,56a6,6,0,0,0,6,5.4l.61,0a6,6,0,0,0,5.37-6.57Z" />
                      </svg>
                    </span>
                    <span className="absolute -right-3 -top-3 flex h-5 w-5 drop-shadow-lg cursor-pointer items-center justify-center rounded-lg bg-white text-sm font-semibold text-red-500">
                      {(cart?.length).toLocaleString("fa-IR")}
                    </span>
                  </Link>
                </section>
              </div>
            </div>
            {/* Bottom Header */}
            <div
              className="absolute hidden left-0 right-0 top-full z-20 bg-white shadow-sm transition-transform duration-300 md:flex"
              id="desktop-header-bottom"
            >
              <div className="container relative flex max-w-[1680px] items-center gap-x-2 px-5 pb-2">
                <div className="group flex flex-row items-center justify-center">
                  <div>
                    <Link className="group relative" href="/">
                      <div className="p-2 pt-0 text-sm text-zinc-700 flex items-center gap-x-1">
                        <svg
                          viewBox="-0.5 0 25 25"
                          width={16}
                          height={16}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                            <path
                              d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                            <path
                              d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                            <path
                              d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                        دسته بندی ها
                      </div>
                      <div className="absolute bottom-0 flex w-full justify-center">
                        <div className="left-0 h-[1px] animate-border-width-reverse rounded-full bg-gradient-to-r from-red-400 to-red-400 transition-all duration-200 group-hover:animate-border-width"></div>
                      </div>
                    </Link>
                  </div>

                  <div className="absolute bg-white hidden group-hover:flex top-8 right-1 lg:right-8 h-auto rounded-lg w-11/12 lg:w-9/12 shadow-lg border z-50 items-top gap-x-5 py-5">
                    <Link className="relative" href="/"></Link>
                    <div className="space-y-2 h-full">
                      <Link className="relative" href="/">
                        <div className="flex items-center gap-x-1 text-zinc-700 hover:text-red-400">
                          <span className="h-5 w-0.5 rounded-full bg-red-500" />
                          <div className="text-sm">برند های مختلف موبایل</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={12}
                            height={12}
                            fill="#4d4d4d"
                            viewBox="0 0 256 256"
                          >
                            <path d="M164.24,203.76a6,6,0,1,1-8.48,8.48l-80-80a6,6,0,0,1,0-8.48l80-80a6,6,0,0,1,8.48,8.48L88.49,128Z" />
                          </svg>
                        </div>
                      </Link>
                      <ul>
                        {mobile?.map((item: any) => (
                          <li key={item.id}>
                            <Link
                              className="block py-2 text-xs text-zinc-600 hover:text-red-500"
                              href={item.address || "/"}
                            >
                              <span className="text-sm text-red-500">-</span>{" "}
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-1 text-zinc-700 hover:text-red-400">
                        <span className="h-5 w-0.5 rounded-full bg-red-500" />
                        <div className="text-sm">برند های مختلف لپتاپ</div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          fill="#4d4d4d"
                          viewBox="0 0 256 256"
                        >
                          <path d="M164.24,203.76a6,6,0,1,1-8.48,8.48l-80-80a6,6,0,0,1,0-8.48l80-80a6,6,0,0,1,8.48,8.48L88.49,128Z" />
                        </svg>
                      </div>
                      <ul>
                        {laptop?.map((item: any) => (
                          <li key={item.id}>
                            <Link
                              className="block py-2 text-xs text-zinc-600 hover:text-red-500"
                              href={item.address || "/"}
                            >
                              <span className="text-sm text-red-500">-</span>{" "}
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-1 text-zinc-700 hover:text-red-400">
                        <span className="h-5 w-0.5 rounded-full bg-red-500" />
                        <div className="text-sm">کنسول بازی و لوازم جانبی</div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          fill="#4d4d4d"
                          viewBox="0 0 256 256"
                        >
                          <path d="M164.24,203.76a6,6,0,1,1-8.48,8.48l-80-80a6,6,0,0,1,0-8.48l80-80a6,6,0,0,1,8.48,8.48L88.49,128Z" />
                        </svg>
                      </div>
                      <ul>
                        {game?.map((item: any) => (
                          <li key={item.id}>
                            <Link
                              className="block py-2 text-xs text-zinc-600 hover:text-red-500"
                              href={item.address || "/"}
                            >
                              <span className="text-sm text-red-500">-</span>{" "}
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-1 text-zinc-700 hover:text-red-400">
                        <span className="h-5 w-0.5 rounded-full bg-red-500" />
                        <div className="text-sm">لوازم جانبی کامپیوتر</div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          fill="#4d4d4d"
                          viewBox="0 0 256 256"
                        >
                          <path d="M164.24,203.76a6,6,0,1,1-8.48,8.48l-80-80a6,6,0,0,1,0-8.48l80-80a6,6,0,0,1,8.48,8.48L88.49,128Z" />
                        </svg>
                      </div>
                      <ul>
                        {pc?.map((item: any) => (
                          <li key={item.id}>
                            <Link
                              className="block py-2 text-xs text-zinc-600 hover:text-red-500"
                              href={item.address || "/"}
                            >
                              <span className="text-sm text-red-500">-</span>{" "}
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <img
                      className="w-36 lg:w-64 mx-auto h-full"
                      src="./assets/image/General.webp"
                      alt=""
                    />
                  </div>
                </div>

                <div>
                  <Link className="group relative" href="/ourStore">
                    <div className="p-2 pt-0 text-sm text-zinc-700 flex items-center gap-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="#4d4d4d"
                        viewBox="0 0 256 256"
                      >
                        <path d="M230,96a6.19,6.19,0,0,0-.22-1.65l-14.34-50.2A14.07,14.07,0,0,0,202,34H54A14.07,14.07,0,0,0,40.57,44.15L26.23,94.35A6.19,6.19,0,0,0,26,96v16A38,38,0,0,0,42,143V208a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V143A38,38,0,0,0,230,112ZM52.11,47.45A2,2,0,0,1,54,46H202a2,2,0,0,1,1.92,1.45L216.05,90H40ZM102,102h52v10a26,26,0,0,1-52,0Zm-64,0H90v10a26,26,0,0,1-52,0ZM202,208a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V148.66a38,38,0,0,0,42-16.21,37.95,37.95,0,0,0,64,0,38,38,0,0,0,42,16.21Zm-10-70a26,26,0,0,1-26-26V102h52v10A26,26,0,0,1,192,138Z" />
                      </svg>
                      فروشگاه
                    </div>
                    <div className="absolute bottom-0 flex w-full justify-center">
                      <div className="left-0 h-[1px] animate-border-width-reverse rounded-full bg-gradient-to-r from-red-400 to-red-400 transition-all duration-200 group-hover:animate-border-width"></div>
                    </div>
                  </Link>
                </div>

                <div>
                  <Link className="group relative" href="/blog">
                    <div className="p-2 pt-0 text-sm text-zinc-700 flex items-center gap-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="#fff"
                        viewBox="0 0 24 24"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
                            stroke="#4d4d4d"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      مقالات
                    </div>
                    <div className="absolute bottom-0 flex w-full justify-center">
                      <div className="left-0 h-[1px] animate-border-width-reverse rounded-full bg-gradient-to-r from-red-400 to-red-400 transition-all duration-200 group-hover:animate-border-width"></div>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link className="group relative" href="/contact">
                    <div className="p-2 pt-0 text-sm text-zinc-700 flex items-center gap-x-1">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        width={16}
                        height={16}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M17.4009 19.2C15.8965 20.3302 14.0265 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V13.5C21 14.8807 19.8807 16 18.5 16C17.1193 16 16 14.8807 16 13.5V8M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                            stroke="#4d4d4d"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      ارتباط با ما
                    </div>
                    <div className="absolute bottom-0 flex w-full justify-center">
                      <div className="left-0 h-[1px] animate-border-width-reverse rounded-full bg-gradient-to-r from-red-400 to-red-400 transition-all duration-200 group-hover:animate-border-width"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="fixed inset-0 z-20 hidden bg-black/40 backdrop-blur-md"
          id="header-overlay"
        ></div>
      </header>
      {/* BOTTOM NAVIGATION */}
      <div className="px-4 bg-white shadow-2xl w-full border fixed bottom-0 left-1/2 -translate-x-1/2 md:hidden z-50">
        <div className="grid grid-cols-5">
          <div className="flex-1 group">
            <Link
              href="/profile"
              className="flex items-end justify-center text-center mx-auto pt-2 w-full text-gray-800 group-hover:text-red-500"
            >
              <span className="block pt-1 pb-1">
                <svg
                  className="mx-auto fill-gray-800 group-hover:fill-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  fill=""
                  viewBox="0 0 256 256"
                >
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                </svg>
                <span className="block text-xs py-1">پروفایل</span>
                <span className="block w-5 mx-auto h-1 group-hover:bg-red-500 rounded-full" />
              </span>
            </Link>
          </div>
          <div className="flex-1 group">
            <Link
              href="/profile/favorites"
              className="flex items-end justify-center text-center mx-auto pt-2 w-full text-gray-800 group-hover:text-red-500"
            >
              <span className="block pt-1 pb-1">
                <svg
                  className="mx-auto fill-gray-800 group-hover:fill-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z" />
                </svg>
                <span className="block text-xs py-1">علاقه مندی</span>
                <span className="block w-5 mx-auto h-1 group-hover:bg-red-500 rounded-full" />
              </span>
            </Link>
          </div>
          <div className="flex-1 group">
            <Link
              href="/"
              className="flex items-end justify-center text-center mx-auto pt-2 w-full text-red-500"
            >
              <span className="block pt-1 pb-1">
                <svg
                  className="mx-auto fill-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
                </svg>
                <span className="block text-xs py-1">صفحه اصلی</span>
                <span className="block w-5 mx-auto h-1 bg-red-500 rounded-full" />
              </span>
            </Link>
          </div>
          <div className="flex-1 group">
            <Link
              href="/"
              className="flex items-end justify-center text-center mx-auto pt-2 w-full text-gray-800 group-hover:text-red-500"
            >
              <span className="block pt-1 pb-1">
                <svg
                  className="mx-auto fill-gray-800 group-hover:fill-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
                <span className="block text-xs py-1">جستجو</span>
                <span className="block w-5 mx-auto h-1 group-hover:bg-red-500 rounded-full" />
              </span>
            </Link>
          </div>
          <div className="flex-1 group">
            <Link
              href="/cart"
              className="flex items-end justify-center text-center mx-auto pt-2 w-full text-gray-800 group-hover:text-red-500"
            >
              <span className="block pt-1 pb-1">
                <svg
                  className="mx-auto fill-gray-800 group-hover:fill-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" />
                </svg>
                <span className="block text-xs py-1">سبد خرید</span>
                <span className="block w-5 mx-auto h-1 group-hover:bg-red-500 rounded-full" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
