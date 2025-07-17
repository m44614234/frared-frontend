import React from "react";
interface props{
  onClick : () => void
}
const PrevPaginate = ({onClick}:props) => {
  return (
    <div onClick={onClick} className="w-10 h-10 text-center items-center  p-2 rounded-full border-stone-800 border-2 border-solid hover:cursor-pointer hover:bg-stone-800 hover:text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
};
export default PrevPaginate;
