"use client";
import UserLayout from "@/components/layouts/UserPanelLayout";
import { useUser } from "@/context/UserContext";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

let profileSchema = yup.object({
  username: yup.string().required("نام ضروری است"),
  bio: yup.string().required(" معرفی ضروری است"),
  gender: yup.string().required("جنسیت ضروری است"),
  mobile: yup.string().required("شماره تماس ضروری است"),
  email: yup.string().required("ایمیل ضروری است").email("ایمیل نامعتبر است"),
});
const UserInfo = () => {
  const { user, setUser, updateUser } = useUser();

  const [edit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      bio: user?.bio || "",
      gender: user?.gender || "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      () => {
        console.log(values);
      };
    },
  });

  const updateAccount = async (e : any) => {
    e.preventDefault();
    try {
      const response = await updateUser({ data: formik.values });
      if (response.status === 200) {
        setEdit(false);
        toast.success("پروفایل با موفقیت بروزرسانی شد");
        setUser(response); // به‌روزرسانی داده‌های کاربر
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout>
      <main dir="rtl" className="w-full mx-auto px-3 md:px-5 ">
        <div className="w-full bg-white shadow-box-md rounded-2xl p-5 mt-5 md:mt-0">
          <form onSubmit={updateAccount}>
            {/* inputs */}
            <div className="sm:flex gap-x-5 mt-5">
              <div className="sm:w-1/2 mb-2 sm:mb-0 flex flex-col gap-y-1">
                <label className="text-sm text-zinc-700 flex">
                  نام کاربری
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
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange("username")}
                  onBlur={formik.handleBlur("username")}
                  // defaultValue={user?.username}
                  className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
                />
              </div>
              <div className="sm:w-1/2 flex flex-col gap-y-1">
                <label className="text-sm text-zinc-700 flex">
                  ایمیل
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
                  type="email"
                  name="email"
                  onChange={formik.handleChange("email")}
                  value={formik.values.email}
                  // defaultValue={user?.email}
                  onBlur={formik.handleBlur("email")}
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
                  onChange={formik.handleChange("mobile")}
                  value={formik.values.mobile}
                  onBlur={formik.handleBlur("mobile")}
                  // defaultValue={user?.mobile}
                  className="focus:shadow-primary-outline text-sm leading-5.6 block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-300 focus:outline-none"
                />
              </div>
              <div className="sm:w-1/2 mb-2 sm:mb-0 flex flex-col gap-y-1">
                <label className="text-sm text-zinc-700 flex">
                  جنسیت
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
                <select
                  name="gender"
                  onChange={formik.handleChange("gender")}
                  value={formik.values.gender}
                  onBlur={formik.handleBlur("gender")}
                  // defaultValue={user?.gender}
                  className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">-</option>
                  <option value={"male"}>مرد</option>
                  <option value={"female"}>زن</option>
                </select>
              </div>
            </div>
            <div className="sm:flex items-center gap-x-5 mt-5">
              <div className="sm:w-full flex flex-col gap-y-1">
                <label className="text-sm text-zinc-700 flex">درباره من</label>
                <textarea
                  placeholder="خودتان را به صورت مختصر معرفی کنید."
                  name="bio"
                  onChange={formik.handleChange("bio")}
                  onBlur={formik.handleBlur("bio")}
                  cols={30}
                  rows={7}
                  className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all focus:border-red-400 focus:outline-none"
                  value={formik.values.bio}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mx-auto w-1/3 px-2 py-3 mt-8 text-sm bg-red-500 hover:bg-red-400 transition text-gray-100 rounded-lg"
            >
              ثبت اطلاعات
            </button>
          </form>
        </div>
      </main>
    </UserLayout>
  );
};

export default UserInfo;
