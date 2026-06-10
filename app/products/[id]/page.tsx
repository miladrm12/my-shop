"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useCart } from "@/app/context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;

  description?: string;
  category?: string;
  stock?: number;

  sizes?: string[];
  colors?: string[];

  size?: string;
  color?: string;

  quantity?: number;
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setProduct(data);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* بنر */}
      <div className="text-center py-20 border-b border-zinc-800">
        <p className="text-red-500 tracking-[6px] mb-4 animate-pulse">
          NEW DROP 2026
        </p>

        <h1 className="text-6xl md:text-8xl font-black mb-6">
          NARCISS
        </h1>

        <p className="text-zinc-400 text-xl">
          استایل خاص برای آدم‌های خاص
        </p>
      </div>

      {/* محصول */}
      <div className="max-w-7xl mx-auto p-10 grid md:grid-cols-2 gap-12">

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[700px] object-cover rounded-3xl shadow-2xl"
          />
        </div>

        <div>

          <h2 className="text-5xl font-black mb-5">
            {product.name}
          </h2>

          <p className="text-red-500 text-3xl font-bold mb-6">
            {Number(product.price).toLocaleString("fa-IR")} تومان
          </p>

          {product.category && (
            <p className="text-blue-400 mb-3">
              دسته بندی: {product.category}
            </p>
          )}

          {product.stock !== undefined && (
            <p className="text-yellow-400 mb-6">
              موجودی: {product.stock}
            </p>
          )}

          <p className="text-zinc-300 leading-8 mb-8">
            {product.description ||
              "کالکشن اختصاصی نارسیس، طراحی شده با بهترین متریال و مناسب استایل خیابانی."}
          </p>

{/* سایزها */}
<h3 className="text-xl font-bold mb-4">
  انتخاب سایز
</h3>

<div className="flex gap-3 flex-wrap mb-6">
  {product.sizes?.map((size: string) => (
    <button
      key={size}
      onClick={() => setSelectedSize(size)}
      className={
        selectedSize === size
          ? "bg-red-600 px-5 py-3 rounded-xl font-bold"
          : "bg-zinc-800 px-5 py-3 rounded-xl font-bold"
      }
    >
      {size}
    </button>
  ))}
</div>

{selectedSize && (
  <p className="text-green-400 mb-6">
    سایز انتخاب شده: {selectedSize}
  </p>
)}

{/* رنگ ها */}
<h3 className="text-xl font-bold mb-4">
  انتخاب رنگ
</h3>

<div className="flex gap-3 flex-wrap mb-6">
  {product.colors?.map((color: string) => (
    <button
      key={color}
      onClick={() => setSelectedColor(color)}
      className={
        selectedColor === color
          ? "bg-blue-600 px-5 py-3 rounded-xl font-bold"
          : "bg-zinc-800 px-5 py-3 rounded-xl font-bold"
      }
    >
      {color}
    </button>
  ))}
</div>

{selectedColor && (
  <p className="text-blue-400 mb-6">
    رنگ انتخاب شده: {selectedColor}
  </p>
)}

<button
  disabled={!selectedSize || !selectedColor}
  onClick={() =>
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    })
  }
  className="
    bg-red-600
    hover:bg-red-700
    text-white
    px-10
    py-5
    rounded-2xl
    font-black
    text-lg
    shadow-[0_0_30px_rgba(239,68,68,.5)]
    transition-all
    duration-300
    hover:scale-105
    disabled:opacity-50
  "
>
  افزودن به سبد خرید
</button>

        </div>
      </div>
    </div>
  );
}