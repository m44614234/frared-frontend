"use client";
import React  from "react";
import CustomInput from "@/components/templates/CustomInput";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const Signup = () => {
  const { user, setUser, handleRegister } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  

  return (
    <>
      <div
        dir="rtl"
        className="w-full grid grid-cols-1 justify-center mt-20 md:mt-32 md:grid-cols-2"
      >
        <section className="hidden w-full md:flex justify-center">
        <img src="./assets/image/banner1.jpg" className="w-full h-full" alt="login" />
        </section>

        <section className="flex relative flex-col justify-center w-full ">
          <p
            dir="rtl"
            className="text-md font-VazirLight px-3 pt-2 pb-7 mt-4 md:px-5"
          >
            برای ثبت‌نام در فروشگاه ما، لطفاً مراحل زیر را دنبال کنید:
          </p>

          <div className="w-full lg:mt-0">
            <div className="flex-col justify-center gap-2">
              <form className="formik-form" onSubmit={handleRegister}>
                <CustomInput
                  type="text"
                  name="username"
                  placeholder="لطفا نام کاربری خود را وارد کنید"
                  value={user?.username}
                  onChange={handleChange}
                />

                <CustomInput
                  type="email"
                  name="email"
                  placeholder="لطفا ایمیل خود را وارد کنید"
                  value={user?.email}
                  onChange={handleChange}
                />

                <CustomInput
                  type="password"
                  name="password"
                  placeholder="لطفا رمز عبور خود را وارد کنید"
                  value={user?.password}
                  onChange={handleChange}
                />

                <div>
                  <div className="mt-1 flex justify-center gap-2 items-center">
                    <button
                      type="submit"
                      className="px-8 py-2 w-[95%] mx-auto text-white bg-red-500 rounded-md"
                    >
                      ثبت نام
                    </button>
                  </div>

                  <div className="w-[95%] mx-auto gap-4 items-center my-12 flex justify-between flex-col md:flex-row">
                    <div className="font-VazirLight">
                      آیا از قبل حساب کاربری دارید؟
                      <Link
                        href="/login"
                        className="px-1 text-red-600 font-VazirBold"
                      >
                        وارد شوید
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
