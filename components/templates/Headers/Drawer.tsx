// components/Drawer.js
import {
  AccountBookOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  MenuOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  XOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const items = [
    {
      id: 1,
      title: "خانه",
      image: <HomeOutlined className="text-md text-[#4d4d4d]" />,
      href: "/",
    },
    {
      id: 2,
      title: "تماس با ما",
      image: <PhoneOutlined className="text-md text-[#4d4d4d]" />,
      href: "/contact",
    },
    {
      id: 3,
      title: "حساب کاربری",
      image: <AccountBookOutlined className="text-md text-[#4d4d4d]" />,
      href: "/profile",
    },
    {
      id: 4,
      title: "سوالات متداول",
      image: <QuestionCircleOutlined className="text-md text-[#4d4d4d]" />,
      href: "/faq",
    },
    {
      id: 5,
      title: "فروشگاه",
      image: <DollarCircleOutlined className="text-md text-[#4d4d4d]" />,
      href: "/ourStore",
    },
  ];

  return (
    <div dir="rtl" className="flex md:hidden">
      <button
        onClick={toggleDrawer}
        className="p-2 text-zinc-700 hover:text-red-500 rounded"
      >
        {isOpen ? <XOutlined /> : <MenuOutlined />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <>
          <div
            className={`fixed z-40 inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleDrawer}
          ></div>

          <div
            className={`fixed top-0 z-50 right-0 h-full w-64 bg-white transform transition-transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            dir="rtl"
          >
            <div className="my-6 w-full flex items-center justify-between gap-x-4 border-b border-gray-100 pb-5">
              {/* Logo */}
              <div className="w-full ">
                <div className="text-red-500 text-xl text-center">
                  FARED STORE
                </div>
              </div>
            </div>
            {/* Mobile Toggle Theme */}
            <div className="mb-4"></div>
            <div className="overflow-y-auto">
              <ul className="space-y-3">
                {items.map((i) => (
                  <li key={i.id} className="px-2">
                    <Link
                      className="flex  items-center justify-start gap-2 px-4 py-3 text-zinc-700 bg-white hover:bg-gray-100 transition clicked:bg-gray-100"
                      href={i.href}
                    >
                      {i.image}
                      <span className="text-sm font-VazirLight ">
                        {" "}
                        {i.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Drawer;
