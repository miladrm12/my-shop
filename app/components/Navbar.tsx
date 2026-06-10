"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        {/* لوگو */}
        <Link href="/" className="font-bold text-lg">
          🛒 MyShop
        </Link>

        {/* دسکتاپ */}
        <div className="hidden md:flex gap-6">
          <Link href="/">خانه</Link>
          <Link href="/admin/products">ادمین</Link>
          <Link href="/admin/orders">سفارشات</Link>
        </div>

        {/* موبایل دکمه */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* موبایل منو */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 p-4 border-t border-gray-800">
          <Link href="/">خانه</Link>
          <Link href="/admin/products">ادمین</Link>
          <Link href="/admin/orders">سفارشات</Link>
        </div>
      )}
    </nav>
  );
}