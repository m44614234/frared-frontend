
const Container = ({ children, className } : any) => {
  return (
    <div className={`w-full py-4 mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;