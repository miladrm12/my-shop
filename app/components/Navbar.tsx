import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 border-b border-zinc-800 bg-black text-white">
      
      <h1 className="text-2xl font-bold">
        پوشاک نارسیس
      </h1>

      <div className="flex gap-4">

        <Link
          href="/register"
          className="bg-white text-black px-4 py-2 rounded-lg font-bold"
        >
          ثبت نام
        </Link>

        <button className="bg-white text-black px-4 py-2 rounded-lg font-bold">
          سبد خرید
        </button>

      </div>
    </nav>
  );
}