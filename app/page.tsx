import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Link href="/Admin" className="text-4xl font-bold text-blue-600 hover:underline">
        Welcome to Admin
      </Link>
    </div>
  );
}
