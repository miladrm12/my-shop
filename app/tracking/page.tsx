"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

const statusText: any = {
  pending: "در انتظار تایید",
  confirmed: "تایید شده",
  preparing: "در حال آماده سازی",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

const statusColor: any = {
  pending: "text-yellow-400",
  confirmed: "text-blue-400",
  preparing: "text-purple-400",
  shipped: "text-orange-400",
  delivered: "text-green-400",
  cancelled: "text-red-500",
};

export default function TrackingPage() {
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function searchOrder() {
    if (!phone) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("phone", phone)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      alert("سفارشی پیدا نشد");
      setOrder(null);
    } else {
      setOrder(data);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      
      {/* container */}
      <div className="max-w-md mx-auto w-full">

        {/* title */}
        <h1 className="text-3xl md:text-5xl font-black text-center mb-8">
          پیگیری سفارش
        </h1>

        {/* box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6">

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="شماره موبایل"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 text-sm md:text-base"
          />

          <button
            onClick={searchOrder}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold transition text-sm md:text-base"
          >
            {loading ? "در حال جستجو..." : "پیگیری سفارش"}
          </button>

        </div>

        {/* result */}
        {order && (
          <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6">

            <h2 className="text-xl md:text-3xl font-black mb-5">
              سفارش #{order.id}
            </h2>

            <div className="space-y-3 text-sm md:text-lg">

              <p>
                نام مشتری:
                <span className="text-zinc-300 mr-2">{order.customer_name}</span>
              </p>

              <p>
                شماره موبایل:
                <span className="text-zinc-300 mr-2">{order.phone}</span>
              </p>

              <p>
                مبلغ:
                <span className="text-red-500 mr-2 font-bold">
                  {order.total_price?.toLocaleString()} تومان
                </span>
              </p>

            </div>

            <div className="mt-5 bg-black border border-zinc-700 rounded-xl p-4">

              <p className="text-zinc-400 text-sm">وضعیت سفارش</p>

              <p className={`text-lg md:text-2xl font-black ${statusColor[order.status]}`}>
                {statusText[order.status] || "نامشخص"}
              </p>

            </div>

            {order.tracking_code && (
              <div className="mt-4 bg-zinc-800 rounded-xl p-4">

                <p className="text-zinc-400 text-sm">کد رهگیری</p>

                <p className="text-lg font-bold mt-1">
                  {order.tracking_code}
                </p>

              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}