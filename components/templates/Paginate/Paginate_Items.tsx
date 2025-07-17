import React from "react";

interface props {
  page: "" | number | null;
  currentPage: number | null;
  key : "" |number | null;
  onClick: () => void;
  
}
const PaginateItems = ({ page, currentPage, key, onClick } : props ) => {
  return (
    <div
      onClick={onClick}
      // className={"w-10 h-10 text-center items-center text-stone-800  p-2 rounded-full border-stone-800 border-2 border-solid hover:cursor-pointer hover:bg-stone-800 hover:text-white "}
      className={`w-10 h-10 text-center items-center text-stone-800  p-2 rounded-full border-stone-800 border-2 border-solid hover:cursor-pointer hover:bg-stone-800 hover:text-white 
        ${currentPage === page && "w-10 h-10 text-center items-center text-white p-2 rounded-full border-stone-800 bg-stone-800  border-2 border-solid hover:cursor-pointer hover:bg-stone-800 hover:text-stone-800" }`}
   >
      {page}
    </div>
  );
};
export default PaginateItems;
