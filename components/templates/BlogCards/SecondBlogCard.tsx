import { useBlog } from "@/context/BlogContext";
import CalculateReadingTime from "@/utils/calculateReadingTime";
import Link from "next/link";

const SecondBlogCard = ({ blog }: any) => {
  const { isInSaveList, AddToSaveBlogs }: any = useBlog();
  const readTime = CalculateReadingTime(blog?.description);

  return (
    <div className="my-2 w-full flex flex-col p-2 md:p-4 bg-white rounded-2xl drop-shadow-lg h-fit">
      <div className="image-box mb-6">
        <Link
          key={blog._id} // اضافه کردن کلید
          href={`/blog/${blog._id}`}
          className="relative"
        >
          <img
            className="mx-auto rounded-xl h-[170px] md:h-[250px] bg-cover"
            src={blog?.images[0]?.url}
            alt=""
          />
          <div className="absolute top-2 left-2">
            {isInSaveList(blog?._id) ? (
              <svg
                className="bg-red-200 pointer-events-none rounded-full p-1 hover:fill-gray-300 transition"
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="#3d3d3d"
                viewBox="0 0 256 256"
              >
                <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
              </svg>
            ) : (
              <svg
                onClick={()=>AddToSaveBlogs(blog)}
                className="bg-gray-200 rounded-full cursor-pointer p-1 hover:fill-gray-500 transition"
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="#3d3d3d"
                viewBox="0 0 256 256"
              >
                <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
              </svg>
            )}
          </div>
        </Link>
      </div>
      <div className="">
        <span className="mb-2 flex justify-between items-center flex-wrap gap-y-2">
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-semibold text-zinc-800">
              {blog.title}
            </span>
          </div>
          <div className="flex items-start gap-x-1 text-xs text-zinc-400">
            <span>{readTime.toLocaleString("fa-IR")} دقیقه</span>
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
          </div>
        </span>
      </div>
    </div>
  );
};
export default SecondBlogCard;
