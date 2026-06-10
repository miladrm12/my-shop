"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminCategories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  async function fetchCategories() {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function addCategory() {
    if (!name) return;

    await supabase.from("categories").insert({
      name,
      slug: name.toLowerCase(),
    });

    setName("");
    fetchCategories();
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">دسته‌بندی‌ها</h1>

      {/* add */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 bg-black border border-gray-700 rounded"
          placeholder="نام دسته"
        />

        <button
          onClick={addCategory}
          className="bg-red-600 px-4 py-2 rounded"
        >
          افزودن
        </button>
      </div>

      {/* list */}
      <div className="space-y-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-zinc-900 p-3 rounded border border-zinc-800"
          >
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}