"use client";
import CustomInput from "@/components/templates/CustomInput";
import { baseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios"; // Make sure to import axios
import { toast } from "react-toastify";

const ResetPassword = ({ params }: any) => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { token } = params;


  const handleResetPassword = async (e: any) => {
    e.preventDefault();

    if (!token) {
      toast.error("توکن نامعتبر است");
      return;
    }
    const newPassword = password;

    try {
      const response: any = await axios.post(
        `${baseUrl}/auth/reset-password/${token}`,
        { newPassword } // Send new password as an object
      );

      if (response.data.success) {
        toast.success("رمز عبور با موفقیت تغییر کرد.");
        router.push("/login");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
         toast.error("لطفا مقادیر را وارد کنید");
        } else if (error.response.status === 404) {
          toast.error("کاربری با این توکن وجود ندارد");
        } else {
          toast.error("خطای غیرمنتظره‌ای رخ داده است. لطفاً دوباره تلاش کنید");
        }
      } else {
        toast.error("خطای غیرمنتظره‌ای رخ داده است. لطفاً دوباره تلاش کنید");
      }
    }
  };

  return (
    <div className="font-ShabnamMedium w-full mt-20 md:mt-32 flex flex-col justify-center">
      <div
        dir="rtl"
        className="w-full grid grid-cols-1 justify-center md:grid-cols-2"
      >
        <section className="hidden w-full md:flex justify-center">
        <img src="./assets/image/banner1.jpg" className="w-full h-full" alt="login" />
        </section>
        <section className="flex relative flex-col justify-center w-full">
          <div className="w-full mt-6 md:mt-0">
            <div className="flex-col justify-center gap-2">
              <p className="text-center mt-2 mb-3">
                رمزعبور جدید خود را وارد کنید.
              </p>
              <form onSubmit={handleResetPassword} className="formik-form">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="رمز عبور جدید خود را وارد کنید"
                  label="رمز عبور جدید"
                  className="w-full"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />

                <div>
                  <div className="mt-1 d-flex justify-content-center gap-2 align-items-center">
                    <button
                      type="submit"
                      className="px-8 py-2 w-[95%] mx-auto text-white bg-red-500 rounded-md"
                    >
                      بازیابی رمز عبور
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
