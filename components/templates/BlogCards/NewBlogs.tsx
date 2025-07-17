import CalculateReadingTime from "@/utils/calculateReadingTime";
import Link from "next/link";

const NewBlogs = ({ blog }: any) => {
 

  return (
    <div className="lg:w-4/12">
      <div className="p-3 bg-white rounded-xl shadow-box-sm">
        <div className="mx-auto flex gap-x-1 group items-center text-right w-full px-2 py-3 text-sm text-gray-600 rounded-lg mb-2 font-semibold">
          <span className="w-44">جدیدترین مقالات</span>
          <span className="bg-red-400 w-full h-px" />
        </div>
        <ul className="grid w-full gap-3">
          {blog &&
            blog.map((item: any) => (
              <li>
                <Link href={`/blog/${item._id}`} className="flex items-center justify-start gap-x-2 w-full p-2 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100">
                  <img
                    className="max-w-20 rounded-md h-[70px]"
                    src={item?.images[0]?.url}
                    alt=""
                  />
                  <div className="text-center flex flex-col space-y-3">
                    <div className="text-xs sm:text-sm">{item?.title}</div>
                    <div className="flex items-start gap-x-1 text-xs text-zinc-400">
                      <svg
                        className="fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        fill=""
                        viewBox="0 0 256 256"
                      >
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                      </svg>
                      <span>{(CalculateReadingTime(item?.description)).toLocaleString("fa-IR")} دقیقه</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      
      </div>

    </div>
  );
};
export default NewBlogs;
