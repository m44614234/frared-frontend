"use client";
import Meta from "@/components/templates/Meta";
import ProductCard from "@/components/templates/ProductCard";
import React, { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";
import useSWR from "swr";
import { baseUrl } from "@/utils/baseUrl";
import Container from "@/components/templates/Container";

interface Product {
  brand: string;
  category: string;
  tags: string[];
  price: number;
}

const OurStore: React.FC = () => {
  const [grid, setGrid] = useState<number>(4);
  const { products: productState } = useProduct();
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [openIndex, setOpenIndex] = useState(null);

  const fetcher = (...args: [string]) =>
    fetch(...args).then((res) => res.json());

  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(`${baseUrl}/category`, fetcher);

  const { data: brands } = useSWR(`${baseUrl}/brand`, fetcher);

  const filterCategory = (category: string) => {
    const filtered = productState.filter(
      (product: any) => product.category === category // استفاده از category به جای categories.title
    );
    setSortedProducts(filtered);
  };

  const filterBrand = (brand: string) => {
    const filtered = productState.filter(
      (product: any) => product.brand === brand
    );
    setSortedProducts(filtered);
  };

  const sortByLowestPrice = () => {
    const sorted = [...productState].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const sortByHighestPrice = () => {
    const sorted = [...productState].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  const sortByTime = () => {
    const sorted = [...productState].sort((a, b) => b.createdAt - a.createdAt);
    setSortedProducts(sorted);
  };

  const filterFromLowest = (from: number) => {
    const filtered = productState
      .filter((product: any) => product.price > from)
      .sort((a: any, b: any) => a.price - b.price);
    setSortedProducts(filtered);
  };

  const filterFromHighest = (from: any) => {
    if (from === undefined || from === null || from === "") {
      setSortedProducts(productState);
    } else {
      const filtered = productState
        .filter((product: any) => product.price < from)
        .sort((a: any, b: any) => b.price - a.price);
      setSortedProducts(filtered);
    }
  };

  useEffect(() => {
    setSortedProducts(productState);
  }, [productState]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>{" "}
      </div>
    );
  }

  const toggleOpen = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container className="bg-white">
      <Meta title={"فروشگاه ما"} />

      <div
        dir="rtl"
        className="flex bg-white  mt-24 flex-col gap-4 md:flex-row md:mt-36"
      >
        <section className="w-full  gap-6  rounded-md shadow-sm  p-4  md:w-1/3 md:sticky md:top-36  md:sticky-top md:h-[140vh] lg:h-[120vh] lg:w-1/4">
          <div className="space-y-4 mb-4 w-full">
            <button
              className="flex justify-between border rounded w-full px-2 py-2 md:px-1  lg:px-2 text-left focus:outline-none"
              onClick={() => toggleOpen(1)}
            >
              <span className="font-VazirMedium text-sm md:text-md text-slate-800">
                مرتب سازی بر اساس دسته بندی
              </span>
              <span>{openIndex === 1 ? "-" : "+"}</span>
            </button>
            {openIndex === 1 && (
              <>
                <button
                  className="font-VazirMedium cursor-pointer text-sm"
                  onClick={() => {
                    setSortedProducts(productState);
                  }}
                  style={{ color: "var(--color-777777)" }}
                >
                  <span className="text-sm px-1 text-red-700"> - </span>همه
                </button>
                {categories.map((item: any, index: any) => (
                  <div
                    key={index}
                    onClick={() => filterCategory(item.title)}
                    className="font-VazirMedium cursor-pointer text-sm"
                  >
                    <span className="text-sm pr-1 text-red-700">-</span>{" "}
                    {item.title}
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="space-y-4 mb-4 w-full">
            <button
              className="flex justify-between border rounded w-full p-2 text-left focus:outline-none"
              onClick={() => toggleOpen(2)}
            >
              <span className="font-VazirMedium text-sm md:text-md text-slate-800">
                مرتب سازی بر اساس قیمت
              </span>
              <span>{openIndex === 2 ? "-" : "+"}</span>
            </button>
            {openIndex === 2 && (
              <div className="flex flex-col">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-col gap-1  items-center xl:flex-row">
                    <span className="text-sm font-VazirMedium text-slate-900">
                      <span className="text-sm pe-1 text-red-700">-</span>
                      از قیمت{" "}
                    </span>
                    <input
                      type="number"
                      className="px-4 py-1 font-VazirMedium rounded-md border"
                      id="floatingInput"
                      placeholder="1000"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        filterFromLowest(Number(e.target.value));
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1  items-center xl:flex-row">
                    <span className="text-sm font-VazirMedium text-slate-900">
                      <span className="text-sm pe-1 text-red-700">-</span>
                      تا قیمت{" "}
                    </span>
                    <input
                      type="number"
                      className="px-4 py-1 font-VazirMedium rounded-md border"
                      id="floatingInput1"
                      placeholder="1000000"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        filterFromHighest(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-4 w-full">
            <button
              className="flex justify-between border rounded w-full p-2 text-left focus:outline-none"
              onClick={() => toggleOpen(3)}
            >
              <span className="font-VazirMedium text-sm md:stext-md text-slate-800">
                مرتب سازی بر اساس نشان
              </span>
              <span>{openIndex === 3 ? "-" : "+"}</span>
            </button>
            {openIndex === 3 && (
              <>
                <button
                  className="font-VazirMedium cursor-pointer text-sm"
                  onClick={() => {
                    setSortedProducts(productState);
                  }}
                  style={{ color: "var(--color-777777)" }}
                >
                  <span className="text-sm px-1 text-red-700"> - </span>همه
                </button>
                {brands &&
                  brands.map((item: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => filterBrand(item.title)}
                      className="font-VazirMedium cursor-pointer text-sm"
                    >
                      <span className="text-sm pr-1 text-red-700">-</span>{" "}
                      {item.title}
                    </div>
                  ))}
              </>
            )}
          </div>
        </section>

        <section className="w-full md:w-2/3 lg:w-3/4">
          <div className="filter-sort-grid mb-4">
            <div className="flex justify-between items-center">
              <article className="flex items-center flex-col justify-center lg:flex-row">
                <p className="mb-0 block font-VazirMedium text-sm px-2">
                  به ترتیب:
                </p>

                <div className="grid grid-cols-3 justify-center rounded-md gap-3 lg:grid-cols-6">
                  <button
                    className="flex w-full cursor-pointer text-sm mx-auto justify-center items-center text-center text-white px-4 py-2 rounded-xl bg-slate-500 hover:bg-slate-400 transition shadow-lg shadow-slate-500/50"
                    onClick={sortByLowestPrice}
                  >
                    ارزان ترین
                  </button>
                  <button
                    className="flex w-full cursor-pointer text-sm mx-auto justify-center items-center text-center text-white px-4 py-2 rounded-xl bg-slate-500 hover:bg-slate-400 transition shadow-lg shadow-slate-500/50"
                    onClick={sortByHighestPrice}
                  >
                    گران ترین
                  </button>
                  <button
                    className="flex w-full cursor-pointer text-sm mx-auto justify-center items-center text-center text-white px-4 py-2 rounded-xl bg-slate-500 hover:bg-slate-400 transition shadow-lg shadow-slate-500/50"
                    onClick={sortByTime}
                  >
                    جدیدترین
                  </button>
                  <button
                    className="flex w-full cursor-pointer text-sm mx-auto justify-center items-center text-center text-white px-4 py-2 rounded-xl bg-slate-500 hover:bg-slate-400 transition shadow-lg shadow-slate-500/50"
                    onClick={sortByTime}
                  >
                    پربازدیدترین
                  </button>
                  <button
                    className="flex w-full cursor-pointer text-sm mx-auto justify-center items-center text-center text-white px-4 py-2 rounded-xl bg-slate-500 hover:bg-slate-400 transition shadow-lg shadow-slate-500/50"
                    onClick={sortByTime}
                  >
                    پیشنهاد خریداران
                  </button>
                </div>
              </article>
            </div>
          </div>
          <div>
            <ProductCard
              data={productState ? sortedProducts : []}
              grid={grid}
            />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default OurStore;
