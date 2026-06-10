"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black mb-10 text-center">
        پنل مدیریت
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* محصولات */}
        <Link
          href="/admin/products"
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:scale-105 duration-300"
        >
          <h2 className="text-3xl font-bold mb-4">
            محصولات
          </h2>

          <p className="text-zinc-400">
            افزودن و حذف محصولات
          </p>
        </Link>

        {/* سفارشات */}
        <Link
          href="/admin/orders"
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:scale-105 duration-300"
        >
          <h2 className="text-3xl font-bold mb-4">
            سفارشات
          </h2>

          <p className="text-zinc-400">
            مدیریت سفارش مشتری‌ها
          </p>
        </Link>

        {/* تخفیف */}
        <Link
          href="/admin/discount"
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl hover:scale-105 duration-300"
        >
          <h2 className="text-3xl font-bold mb-4">
            کد تخفیف
          </h2>

          <p className="text-zinc-400">
            ساخت تخفیف و جشنواره
          </p>
        </Link>

      </div>
    </div>
  );
}