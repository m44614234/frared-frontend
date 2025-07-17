const CheckBredCrumb = ({ firstColor, secondColor , thirdColor , forthCaolor }: any) => {
  return (
    <div className="container mx-auto w-full h-full pt-9">
      <div className="relative pl-3 h-full">
        <div className="flex pt-3 *:border-2 md:*:border-4">
          <div className={`border-opacity-90  border-${firstColor} w-1/4`} />
          <div className={`border-opacity-90  border-${thirdColor} w-1/4`} />
          <div className={`border-opacity-90  border-${secondColor} w-1/4`} />
          <div className={`border-opacity-90  border-${secondColor} w-1/4`} />
        </div>
        {/* text */}
        <div className="absolute -top-10 inline-flex w-full justify-between">
          {/* not */}
          <div className="">
            <div className="w-8 h-8"></div>
          </div>
          {/* 1 */}
          <div className="flex items-center">
            <div className="z-20 flex items-center order-1">
              <h1 className="mx-auto md:font-semibold text-zinc-700 pr-6 text-xs md:text-base">
                سبد خرید
              </h1>
            </div>
          </div>
          {/* 2 */}
          <div className="flex items-center">
            <div className="z-20 flex items-center order-1">
              <h1 className="mx-auto md:font-semibold text-zinc-500 pr-4 text-xs md:text-base">
                جزئیات پرداخت
              </h1>
            </div>
          </div>
          {/* 3 */}
          <div className="flex items-center">
            <div className="z-20 flex items-center order-1">
              <h1 className="mx-auto md:font-semibold text-zinc-500 pr-1 pl-2 text-xs md:text-base">
                تکمیل سفارش
              </h1>
            </div>
          </div>
          {/* not */}
          <div className="pl-3">
            <div className="w-8 h-8"></div>
          </div>
        </div>
        {/* dots */}
        <div className="absolute top-0 md:-top-1 inline-flex w-full justify-between">
          {/* not */}
          <div className="flex items-center *:w-6 *:h-6 md:*:w-8 *:md:h-8">
            <div className="z-20 flex items-center order-1 bg-gray-200 shadow-box-md rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-zinc-700" />
            </div>
          </div>
          {/* 1 */}
          <div className="flex items-center *:w-6 *:h-6 md:*:w-8 *:md:h-8">
            <div className={`z-20 flex items-center order-1 bg-${forthCaolor} shadow-box-md rounded-full`}>
              <h1 className="mx-auto font-semibold text-base md:text-lg text-white">
                1
              </h1>
            </div>
          </div>
          {/* 2 */}
          <div className="flex items-center *:w-6 *:h-6 md:*:w-8 *:md:h-8">
            <div className={`z-20 flex items-center order-1 bg-${thirdColor} shadow-box-md rounded-full`}>
              <h1 className="mx-auto font-semibold text-base md:text-lg text-white">
                2
              </h1>
            </div>
          </div>
          {/* 3 */}
          <div className="flex items-center *:w-6 *:h-6 md:*:w-8 *:md:h-8">
            <div className= {`z-20 flex items-center order-1 bg-${secondColor} shadow-box-md rounded-full`}>
              <h1 className="mx-auto font-semibold text-base md:text-lg text-white">
                3
              </h1>
            </div>
          </div>
          {/* not */}
          <div className="flex items-center pl-3 *:w-6 *:h-6 md:*:w-8 *:md:h-8">
            <div className="z-20 flex items-center order-1 bg-gray-200 shadow-box-md rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-zinc-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckBredCrumb;
