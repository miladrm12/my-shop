"use client";

import { useState } from "react";

export default function DiscountPage() {

  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-black mb-10">
        ساخت کد تخفیف
      </h1>

      <div className="bg-zinc-900 p-8 rounded-3xl space-y-5">

        <input
          type="text"
          placeholder="کد تخفیف"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="درصد تخفیف"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          className="w-full bg-zinc-800 p-4 rounded-xl"
        />

        <button className="bg-white text-black px-6 py-3 rounded-xl font-bold">
          ذخیره تخفیف
        </button>

      </div>

    </div>
  );
}