"use client";

import { useCart } from "./context/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Link from "next/link";
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function Home() {
  const { addToCart, cart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function fetchProducts() {
    <p className="text-white">
  تعداد محصولات: {products.length}
</p>
    try {
 

const { data, error } = await supabase
  .from("products")
  .select("*");

console.log("DATA:", data);
console.log("ERROR:", error);

if (error) {
  console.error(error);
  setProducts([]);
  return;
}

setProducts(data || []);

      if (error) {
        console.error(error);
        setProducts([]);
        return;
      }

      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, []);

  return (
    <main
      className="min-h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="min-h-screen bg-black/70 backdrop-blur-[3px]">

        {/* ================= HEADER ================= */}
        <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
            <h1 className="text-3xl font-black tracking-[6px]">NARCISS</h1>
            <nav className="hidden md:flex gap-10 text-zinc-300 font-semibold">
              <a href="#" className="hover:text-white duration-300">خانه</a>



              <a href="#" className="hover:text-white duration-300">محصولات</a>




              <a href="#" className="hover:text-white duration-300">کالکشن</a>





              <a href="#" className="hover:text-white duration-300">تماس</a>


              
            </nav>
            <div className="flex gap-4">

  <Link
    href="/register"
    className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
  >
    ثبت نام
  </Link>

  <Link
    href="/tracking"
    className="bg-zinc-800 px-6 py-3 rounded-2xl font-bold hover:bg-zinc-700 duration-300"
  >
    پیگیری سفارش
  </Link>

  <Link
    href="/cart"
    className="bg-red-600 px-6 py-3 rounded-2xl font-bold"
  >
    🛒 سبد خرید
  </Link>

</div>
            <div className="flex gap-4">
              <Link href="/register" className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 hover:bg-zinc-200 duration-300 shadow-lg">ثبت نام</Link>
              <Link href="/cart" className="bg-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-700 hover:scale-105 duration-300 shadow-lg flex items-center gap-2">
                🛒 سبد خرید
                <span className="bg-white text-black px-2 rounded-full text-sm">{cart.length}</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="text-center py-32 px-6">
          <p className="text-red-500 text-xl mb-5 tracking-[5px] animate-pulse">NEW COLLECTION 2026</p>
          <h2 className="text-7xl md:text-8xl font-black leading-tight mb-8">استایل سمیرا<br />نسل جدید</h2>
          <p className="text-zinc-300 text-xl max-w-2xl mx-auto mb-10 leading-10">
           خاص بپوش، متفاوت دیده شو .
          </p>
        </section>

        {/* ================= PRODUCTS ================= */}
        <section className="px-10 py-16">
          <div className="text-center mb-16">
            <p className="text-red-500 tracking-[5px] mb-4">محصولات ترند</p>
            <h2 className="text-5xl font-black">جدیدترین محصولات</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-center col-span-3">در حال بارگذاری محصولات...</p>
            ) : (
              Array.isArray(products) &&
products.map((product) => (
                <div key={product.id} className="bg-zinc-900/70 rounded-3xl overflow-hidden border border-zinc-800 hover:scale-105 hover:-translate-y-2 duration-500 shadow-2xl">

  <img
    src={product.image}
    alt={product.name}
    className="w-full h-96 object-cover"
  />

  <div className="p-6">

    <h3 className="text-3xl font-bold mb-3">
      {product.name}
    </h3>

    <div className="flex items-center justify-between">

      <span className="text-2xl font-bold text-red-500">
        {product.price.toLocaleString()}
      </span>

      <Link
        href={`/products/${product.id}`}
        className="bg-white text-black px-5 py-3 rounded-xl font-bold"
      >
        مشاهده محصول
      </Link>

    </div>

  </div>

</div>
              ))
            )}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-zinc-800 py-12 text-center bg-black/40 mt-20">
          <h3 className="text-3xl font-black mb-4 text-white">NARCISS</h3>
          <p className="text-zinc-400 mb-3">سازنده سایت : میلاد کمالی</p>
          <p className="text-zinc-500 mb-2">شماره تماس : 09228594815</p>
          <p className="text-zinc-500 mb-6">ایمیل : miladkamil18@gmail.com</p>
          <p className="text-zinc-600 text-sm">© 2026 تمامی حقوق محفوظ است</p>
        </footer>

      </div>
    </main>
  );
}