"use client"
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Error() {
  return (
    <>
      <Head>
        <title>متاسفانه صفحه مورد نظر شما یافت نشد</title>
      </Head>

      <main className="errorContainer">
        <Image
          className="image"
          src="/images/error.jpg"
          width={500}
          height={220}
          alt="error image"
        />
        <span className="mt-4 font-VazirMedium text-lg md:text-xl">متاسفانه صفحه مورد نظر شما یافت نشد</span>

        <Link href="/" className="text-white py-2 px-4 rounded-lg mt-2 bg-red-700">
          بازگشت به خانه
        </Link>
      </main>
    </>
  );
}