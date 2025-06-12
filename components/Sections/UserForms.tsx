import ContactUs from "./compnent/ContactUs";
// import ProductReviews from "./compnent/ProductReviews";

const UserForms = () => {
    return (
        <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-8 px-4 py-8 z-20">
            {/* <div className="w-full lg:w-1/2">
                <ProductReviews />
            </div> */}
            <div className="w-full">
                <ContactUs />
            </div>
        </div>
    )
}

export default UserForms;