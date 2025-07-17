const Services = () => {
  return (
    <section className="flex flex-wrap items-center gap-y-5 justify-around mb-10">
      <div className="flex justify-center items-center flex-col rounded-3xl w-28 h-24">
        <img
          className="w-12 md:w-14"
          src="../assets/image/services/cash-on-delivery.svg"
          alt=""
        />
        <span className="text-xs text-zinc-600">پرداخت درب منزل</span>
      </div>
      <div className="flex justify-center items-center flex-col rounded-3xl w-28 h-24">
        <img
          className="w-12 md:w-14"
          src="../assets/image/services/days-return.svg"
          alt=""
        />
        <span className="text-xs text-zinc-600">ضمانت 7 روزه</span>
      </div>
      <div className="flex justify-center items-center flex-col rounded-3xl w-28 h-24">
        <img
          className="w-12 md:w-14"
          src="../assets/image/services/express-delivery.svg"
          alt=""
        />
        <span className="text-xs text-zinc-600">پست پیشتاز</span>
      </div>
      <div className="flex justify-center items-center flex-col rounded-3xl w-28 h-24">
        <img
          className="w-12 md:w-14"
          src="../assets/image/services/original-products.svg"
          alt=""
        />
        <span className="text-xs text-zinc-600">ضمانت کالا</span>
      </div>
      <div className="flex justify-center items-center flex-col rounded-3xl w-28 h-24">
        <img
          className="w-12 md:w-14"
          src="../assets/image/services/support.svg"
          alt=""
        />
        <span className="text-xs text-zinc-600">پشتیبانی 24 ساعته</span>
      </div>
    </section>
  );
};
export default Services;
