"use client";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useProduct } from "@/context/ProductContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false); // حالت جدید برای کنترل overlay

  const { products } = useProduct();

  const handleSearch = (event: FormEvent<HTMLElement>) => {
    const newQuery = (event.target as HTMLInputElement).value;
    setQuery(newQuery);
    setShowOverlay(newQuery.length > 0); // نمایش overlay زمانی که جستجو شروع می‌شود
  };

  const fuse = useMemo(() => {
    if (!products) return null;
    return new Fuse(products, {
      includeScore: true,
      keys: ["title"],
    });
  }, [products]);

  const searchResults = useMemo(() => {
    if (!fuse || !query) return [];
    return fuse.search(query);
  }, [fuse, query]);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setQuery(""); // پاک کردن جستجو
  };

  return (
    <div className="relative">
      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={handleOverlayClick}
        />
      )}

      <div className="hidden relative md:flex flex-col gap-1 items-center bg-gray-100 px-2 py-1 rounded-md z-20">
        <div className="flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="#636363"
            viewBox="0 0 256 256"
          >
            <path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z" />
          </svg>
          <input
            className="w-96 font-VazirLight text-sm py-2 px-1 bg-gray-100 border-none rounded-md outline-none focus:bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-0"
            placeholder="جستجو"
            value={query}
            onChange={handleSearch}
            type="text"
          />
          {query.length ? (
            <CloseOutlined
              className="text-lg p-2 cursor-pointer"
              style={{ color: "red" }}
              onClick={() => {
                setQuery("");
                setShowOverlay(false); // پنهان کردن overlay
              }}
            />
          ) : null}
        </div>

        <div className="flex absolute w-full top-12 flex-col">
          {searchResults &&
            searchResults.slice(0, 4).map((item: any) => (
              <div key={item.item._id} className="flex flex-col gap-4">
                <div className="flex font-VazirLight w-full py-3 px-2 rounded-md my-[2px] flex-row items-center bg-gray-100">
                  <span className=" w-[5%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      fill="black"
                      viewBox="0 0 256 256"
                    >
                      <path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z" />
                    </svg>
                  </span>
                  <Link
                    href={`/singleProduct/${item.item._id}`}
                    className="text-sm text-black font-VazirLight w-[95%]"
                  >
                    {item.item.title}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
