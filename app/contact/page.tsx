"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  HomeFilled,
  InfoCircleFilled,
  MailFilled,
  PhoneFilled,
} from "@ant-design/icons";
import CustomInput from "@/components/templates/CustomInput";
import { toast } from "react-toastify";
import { baseUrl } from "@/utils/baseUrl";

let contactSchema = yup.object({
  name: yup.string().required("نام اجباری است"),
  email: yup
    .string()
    .required("ایمیل اجباری است")
    .email("لطفا ایمیل صحیح وارد کنید"),
  mobile: yup.number().required().positive().integer("شماره موبایل صحیح نیست"),
  comment: yup.string().required("پیام اجباری است"),
});

const Contact = () => {
  const [contact, setContact] = React.useState<any>(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      // dispatch(createQuery(values));
    },
  });

  const creatContact: (e: any) => void = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formik.values),
      });
      if (res.status === 201 || res.status === 200) {
        setContact(res);
        formik.resetForm();
        toast.success("پیغام شما با موفقیت ارسال شد", {});
      } else if (res.status === 400) {
        toast.warning("لطفا تمام مقادیر را وارد کنید");
      }
    } catch (error) {
      console.log("error =>", error);
      toast.error("خطای غیرمنتظره‌ای رخ داده است. لطفاً دوباره تلاش کنید");
    }
  };

  return (
    <div className="mt-20 p-4 md:mt-32 w-full md:w-[95%] flex flex-col md:flex-row">
      <div className="w-full p-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6986.771103663534!2d76.99275607711007!3d28.886888929272477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390da5e51463d4c9%3A0xe5a485e2ac7c3d4a!2sMandaura%2C%20Haryana%20131103!5e0!3m2!1sen!2sin!4v1669909087902!5m2!1sen!2sin"
          width="100%"
          height="100%"
          className="border-0 w-100"
          //   allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div dir="rtl" className="w-full flex flex-col justify-end px-2 ">
        <div>
          <p className="text-lg my-4 font-VazirBold text-slate-700">
            تماس با ما
          </p>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-5 font-VazirMedium"
          >
            <div>
              <CustomInput
                type="text"
                dir="rtl"
                placeholder="لطفا نام خود را وارد کنید"
                name="name"
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
              />
              {/* <div className="formik-error">
                {formik.touched.name && (formik.errors.name as string)}
              </div> */}
            </div>

            <div>
              <CustomInput
                type="email"
                dir="rtl"
                className="w-full p-2 rounded-md"
                placeholder="لطفا ایمیل خود را وارد کنید"
                name="email"
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />
              {/* <div className="formik-error">
                {formik.touched.email && (formik.errors.email as string)}
              </div> */}
            </div>
            <div>
              <CustomInput
                type="tel"
                dir="rtl"
                className="w-full p-2 rounded-md"
                placeholder="لطفا شماره موبایل خود را وارد کنید"
                name="phone"
                onChange={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                value={formik.values.phone}
              />
              {/* <div className="formik-error">
                {formik.touched.mobile && (formik.errors.mobile as string)}
              </div> */}
            </div>
            <div>
              <textarea
                id=""
                dir="rtl"
                className="w-[95%] mx-auto px-6 text-md justify-center py-3 shadow-md rounded-md  border"
                //   rows="4"
                placeholder="لطفا نظر خود را وارد کنید"
                name="comment"
                onChange={formik.handleChange("comment")}
                onBlur={formik.handleBlur("comment")}
                value={formik.values.comment}
              ></textarea>
              {/* <div className="formik-error">
                {formik.touched.comment && (formik.errors.comment as string)}
              </div> */}
            </div>
            <div>
              <button
                dir="rtl"
                onClick={creatContact}
                className="w-[95%] bg-slate-950 text-white mx-auto px-6 text-md justify-center py-3 shadow-md rounded-md  border"
              >
                ثبت نظر
              </button>
            </div>
          </form>
        </div>
        <div>
          <div>
            <ul className="flex flex-col gap-4 py-4">
              <li className="flex flex-row gap-1 flex-wrap">
                <HomeFilled style={{ fontSize: "20px" }} />
                <address className="mb-0 font-VazirMedium">
                  تهران ، خیابان قائم مقام فراهانی ، خیابان مگنولیا ، پلاک 30 ،
                  واحد 12
                </address>
              </li>
              <li className="flex flex-row gap-1 flex-wrap">
                <PhoneFilled style={{ fontSize: "20px" }} />
                <p className="font-VazirMedium">021-88322389</p>
              </li>
              <li className="flex flex-row gap-1 flex-wrap">
                <MailFilled style={{ fontSize: "20px" }} />
                <p className="font-VazirMedium">MRHZS1376@gmail.com</p>
              </li>
              <li className="flex flex-row gap-1 flex-wrap">
                <InfoCircleFilled style={{ fontSize: "20px" }} />
                <p className="mb-0 font-VazirMedium">
                  Monday – Friday 10 AM – 8 PM
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
