"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "./context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { cart } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-3xl font-black tracking-[6px]"
        >
          NARCISS
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-10 text-zinc-300 font-semibold">

          <a href="#" className="hover:text-white duration-300">
            خانه
          </a>

          <a href="#" className="hover:text-white duration-300">
            محصولات
          </a>

          <a href="#" className="hover:text-white duration-300">
            کالکشن
          </a>

          <a href="#" className="hover:text-white duration-300">
            تماس
          </a>

        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <Link
            href="/cart"
            className="relative bg-red-600 hover:bg-red-700 duration-300 p-3 rounded-2xl"
          >
            <ShoppingBag size={24} />

            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cart.length}
            </span>

          </Link>

          {/* MOBILE BTN */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden bg-zinc-800 p-3 rounded-2xl"
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div className="md:hidden border-t border-zinc-800 bg-black/95 backdrop-blur-xl">

          <nav className="flex flex-col p-6 gap-6 text-lg font-bold text-zinc-300">

            <a href="#" onClick={() => setOpen(false)}>
              خانه
            </a>

            <a href="#" onClick={() => setOpen(false)}>
              محصولات
            </a>

            <a href="#" onClick={() => setOpen(false)}>
              کالکشن
            </a>

            <a href="#" onClick={() => setOpen(false)}>
              تماس
            </a>

          </nav>

        </div>

      )}

    </header>
  );
}