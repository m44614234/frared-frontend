"use client";
import UserLayout from "@/components/layouts/UserPanelLayout";
import { useProduct } from "@/context/ProductContext";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const Profile_Favorites = () => {
  const {
    wish,
    products: productState,
    AddtoWish,
    RemoveFromWish,
    isInWishlist,
  } = useProduct();

  const productImage =
    productState &&
    productState.map((item: any) => {
      return item.images;
    });

  const Image =
    productImage &&
    productImage.map((item: any) => {
      return item[0];
    });

  const singleImage =
    Image &&
    Image.map((item: any) => {
      return item?.url;
    });
  return (
    <UserLayout>
      <main dir="rtl" className="w-full mx-auto px-3 md:px-5">
        <div className="w-full bg-white shadow-box-md rounded-2xl p-5 mt-5 md:mt-0">
          <div className="">
            <div className="text-zinc-800 text-lg mb-4">علاقه مندی ها:</div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {wish &&
                wish.map((item: any) => (
                  <div
                    key={item._id}
                    className="card  my-2 p-2 md:p-4 bg-white rounded-2xl drop-shadow-lg"
                  >
                    <div className="flex justify-between">
                      <section className="flex gap-x-1">
                        {isInWishlist(item?._id) ? (
                          <svg
                            className="bg-gray-200 rounded-full p-1 hover:fill-red-500 transition"
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={30}
                            fill="red"
                            viewBox="0 0 256 256"
                          >
                            <path d="M178,34c-21,0-39.26,9.47-50,25.34C117.26,43.47,99,34,78,34A60.07,60.07,0,0,0,18,94c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,153.59,238,123.2,238,94A60.07,60.07,0,0,0,178,34ZM128,209.11C111.59,199.64,30,149.72,30,94A48.05,48.05,0,0,1,78,46c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,56.83,157.72,46,178,46a48.05,48.05,0,0,1,48,48C226,149.72,144.41,199.64,128,209.11Z" />
                          </svg>
                        ) : (
                          <svg
                            className="bg-gray-200 cursor-pointer rounded-full p-1 hover:fill-red-500 transition"
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={30}
                            onClick={() => AddtoWish(item)}
                            fill="#2b2b2b"
                            viewBox="0 0 256 256"
                          >
                            <path d="M178,34c-21,0-39.26,9.47-50,25.34C117.26,43.47,99,34,78,34A60.07,60.07,0,0,0,18,94c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,153.59,238,123.2,238,94A60.07,60.07,0,0,0,178,34ZM128,209.11C111.59,199.64,30,149.72,30,94A48.05,48.05,0,0,1,78,46c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,56.83,157.72,46,178,46a48.05,48.05,0,0,1,48,48C226,149.72,144.41,199.64,128,209.11Z" />
                          </svg>
                        )}
                      </section>
                    </div>
                    <div className="image-box mb-6 ">
                      <Link
                        href={`/singleProduct/${item?._id}`}
                        className="cursor-pointer"
                      >
                        <img
                          className="max-w-52 h-[150px] mx-auto md:h-[180px] "
                          src={
                            singleImage
                              ? singleImage[0]
                              : "../assets/image/products/91.jpg"
                          }
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="space-y-6">
                      <span className="mb-2 h-8 md:h-10 flex justify-between">
                        <div className="flex flex-col gap-y-2">
                          <span className="text-sm font-semibold text-zinc-800">
                            {item?.title}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {item?.brand}
                          </span>
                        </div>
                      </span>
                      <div className="bg-gray-100 rounded-xl py-3 px-2 flex flex-col justify-between items-center lg:flex-row">
                        <div className="w-full flex flex-row justify-between gap-y-2">
                          <div className="flex justify-center gap-x-1 font-semibold text-sm text-zinc-800">
                            <div>{(item?.price).toLocaleString("fa-IR")}</div>
                            <div>تومان</div>
                          </div>
                          <DeleteFilled
                            className="text-red-500 text-xl"
                            onClick={() => RemoveFromWish(item._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
};
export default Profile_Favorites;
