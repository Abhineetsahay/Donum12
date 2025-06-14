import ContactUs from "./compnent/ContactUs";
import allProduct from "@/public/allprods.jpg";
import Image from "next/image";
// import ProductReviews from "./compnent/ProductReviews";

const UserForms = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-end items-stretch gap-8 px-4 py-8 z-10">
      <div className="w-full lg:w-1/2 hidden lg:flex justify-center items-center">
        <Image src={allProduct} alt="Product Image" className="object-contain rounded-2xl"/>
      </div>
      <div className="w-ful lg:w-3/5">
        <ContactUs />
      </div>
    </div>
  );
};

export default UserForms;
