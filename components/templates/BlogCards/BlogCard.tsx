import Link from "next/link";

const BlogCard = ({ blog }: any) => {
  const monthNames = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  return (
    <>
      {blog.length &&
        blog?.map((blog: any) => (
          <div key={blog._id} className="relative md:full flex items-end justify-start text-left bg-center bg-cover group">
            <img
              className="rounded-xl min-h-[270px] bg-cover"
              src={blog?.images[0]?.url}
              alt=""
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b via-transparent from-gray-900 to-gray-900 rounded-xl" />
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
              <Link
                rel="noopener noreferrer"
                href={`/blog/${blog._id}`}
                className="px-3 py-2 text-xs font-semibold tracki uppercase text-gray-100 bgundefined"
              >
                {blog?.category}
              </Link>
              <div className="flex flex-col justify-start text-center text-gray-100">
                <span className="text-2xl font-semibold leadi tracki">
                  {new Date(blog?.createdAt).getDate().toLocaleString("fa-IR")}
                </span>
                <span className="text-sm">
                  {monthNames[new Date(blog?.createdAt).getMonth()]}
                </span>
              </div>
            </div>
            <h2 className="z-10 p-5 absolute -bottom-1 group-hover:bottom-0 group-hover:block transition-all text-right">
              <Link
                href={`/blog/${blog._id}`}
                className="text-md opacity-90 text-gray-100 transition-all"
              >
                {blog?.category}
              </Link>
              <br />
              <Link
                href={`/blog/${blog._id}`}
                className="text-sm bg-gray-300 bg-opacity-30 hover:bg-opacity-45 w-fit rounded-lg px-3 py-1 opacity-90 text-gray-100 mt-2 hidden group-hover:block transition-all"
              >
                مطالعه بیشتر
              </Link>
            </h2>
          </div>
        ))}
    </>
  );
};
export default BlogCard;
