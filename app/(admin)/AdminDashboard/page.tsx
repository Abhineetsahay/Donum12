"use client";

import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminAuth } from "@/context/AdminAuthContext";

const Page = () => {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full bg-[#0a0a23] flex items-center justify-center relative">
      <ToastContainer position="top-center" theme="colored" />

      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6 w-[30rem]">
        <h1 className="text-2xl font-semibold text-center text-black">
          Welcome, {user?.displayName}
        </h1>

        <Link href="/AdminDashboard/AddProduct">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Product
          </button>
        </Link>
        <Link href="/AdminDashboard/CustomerReview">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Customer Reivew
          </button>
        </Link>
        <Link href="/AdminDashboard/SeeCustomerQuery">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            See Customer Query
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
