"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // ================= TOTAL PRICE =================

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* ================= TOP BAR ================= */}

      <div className="sticky top-0 z-50 mb-8">

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl px-6 py-5 shadow-2xl">

          <div className="flex items-center justify-between">

            {/* LEFT */}

            <div>

              <h1 className="text-3xl md:text-4xl font-black">
                سبد خرید
              </h1>

              <p className="text-zinc-400 mt-1 text-sm">
                مدیریت محصولات انتخابی
              </p>

            </div>

            {/* RIGHT */}

            <div className="text-left">

              <p className="text-zinc-400 text-sm mb-1">
                مبلغ کل
              </p>

              <h2 className="text-2xl md:text-3xl font-black text-red-500">
                {totalPrice.toLocaleString()} تومان
              </h2>

            </div>

          </div>

          {/* LINE */}

          <div className="w-full h-2 bg-zinc-800 rounded-full mt-5 overflow-hidden">

            <div
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(cart.length * 25, 100)}%`,
              }}
            />

          </div>

        </div>

      </div>



      {/* ================= PRODUCTS ================= */}

      <div className="space-y-5">

        {cart.length === 0 ? (

          <div className="text-center py-32">

            <h2 className="text-4xl font-black mb-4">
              سبد خرید خالیه 🛒
            </h2>

            <p className="text-zinc-400 mb-8">
              هنوز محصولی اضافه نکردی
            </p>

            <Link
              href="/"
              className="bg-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-red-700 duration-300"
            >
              برگشت به فروشگاه
            </Link>

          </div>

        ) : (

          cart.map((item) => (

            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 hover:border-red-500 duration-300"
            >

              {/* PRODUCT INFO */}

             <div className="flex items-center gap-5">

  <img
    src={item.image}
    alt={item.name}
    className="w-28 h-28 object-cover rounded-2xl"
  />

  <div>
    <h2 className="text-2xl font-bold mb-2">
      {item.name}
    </h2>

    <p className="text-zinc-400 text-sm">
      سایز: {item.size}
    </p>

    <p className="text-zinc-400 text-sm">
      رنگ: {item.color}
    </p>

    <p className="text-red-500 text-lg">
      {item.price.toLocaleString()} تومان
    </p>
  </div>

</div>


              {/* QUANTITY */}

              <div className="flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-2xl">

                <button
                 onClick={() =>
  decreaseQuantity(
    item.id,
    item.size,
    item.color
  )
}
                  className="w-10 h-10 rounded-xl bg-black hover:bg-red-600 duration-300 text-xl"
                >
                  -
                </button>

                <span className="text-xl font-bold w-10 text-center">
                  {item.quantity}
                </span>

                <button
                 onClick={() =>
  increaseQuantity(
    item.id,
    item.size,
    item.color
  )
}
                  className="w-10 h-10 rounded-xl bg-black hover:bg-green-600 duration-300 text-xl"
                >
                  +
                </button>

              </div>



              {/* TOTAL */}

              <div className="text-center">

                <p className="text-zinc-400 text-sm mb-1">
                  مجموع
                </p>

                <h3 className="text-2xl font-black text-white">
                  {(item.price * item.quantity).toLocaleString()}
                </h3>

              </div>



              {/* REMOVE */}

              <button
               onClick={() =>
  removeFromCart(
    item.id,
    item.size,
    item.color
  )
}
                className="bg-red-600 px-5 py-3 rounded-2xl font-bold hover:bg-red-700 duration-300"
              >
                حذف
              </button>

            </div>

          ))

        )}

      </div>



      {/* ================= CHECKOUT ================= */}

      {cart.length > 0 && (

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>

              <p className="text-zinc-400 mb-2">
                مبلغ نهایی سفارش
              </p>

              <h2 className="text-4xl font-black text-red-500">
                {totalPrice.toLocaleString()} تومان
              </h2>

            </div>

            <Link
              href="/checkout"
              className="bg-white text-black px-10 py-4 rounded-2xl font-black hover:scale-105 hover:bg-zinc-200 duration-300"
            >
              ادامه ثبت سفارش
            </Link>

          </div>

        </div>

      )}

    </main>
  );
}