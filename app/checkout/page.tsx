"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    postalCode: "",
    paymentMethod: "zarinpal",
  });

  const totalPrice = cart.reduce(
    (total: number, item: any) =>
      total + item.price * item.quantity,
    0
  );
async function submitOrder() {
  if (
    !formData.fullName ||
    !formData.phone ||
    !formData.address
  ) {
    alert("همه فیلدها را پر کنید");
    return;
  }


  // ساخت سفارش اصلی
  const { data: order, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        total_price: totalPrice,
        status: "pending",
      },
    ])
    .select()
    .single();


  if (error) {
    console.log(error);
    alert(error.message);
    return;
  }



  // ذخیره محصولات سفارش
  const items = cart.map((item:any)=>({

    order_id: order.id,

    product_id: item.id,

    product_name: item.name,

    price: item.price,

    quantity: item.quantity,

    size: item.size,

    color: item.color,

    product_image: item.image

  }));


  const { error:itemError } = await supabase
    .from("order_items")
    .insert(items);



  if(itemError){

    console.log(itemError);

    alert(itemError.message);

    return;

  }



  alert("سفارش ثبت شد ✅");
}
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2">
          ثبت سفارش
        </h1>

        <p className="text-zinc-400">
          اطلاعات سفارش و پرداخت
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORM */}

        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            اطلاعات ارسال
          </h2>

          <div className="space-y-5">

            {/* NAME */}

            <div>
              <label className="block mb-2 text-zinc-300">
                نام و نام خانوادگی
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="مثلا میلاد احمدی"
                className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-red-500"
              />
            </div>

            {/* PHONE */}

            <div>
              <label className="block mb-2 text-zinc-300">
                شماره موبایل
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09xxxxxxxxx"
                className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-red-500"
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label className="block mb-2 text-zinc-300">
                آدرس کامل
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="آدرس کامل خود را وارد کنید..."
                rows={5}
                className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-red-500 resize-none"
              />
            </div>

            {/* POSTAL */}

            <div>
              <label className="block mb-2 text-zinc-300">
                کد پستی
              </label>

              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="کد پستی"
                className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-red-500"
              />
            </div>

            {/* PAYMENT */}

            <div className="pt-4">

              <h3 className="text-xl font-bold mb-4">
                روش پرداخت
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ZARINPAL */}

                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      paymentMethod: "zarinpal",
                    })
                  }
                  className={`rounded-2xl border p-5 text-right duration-300 ${
                    formData.paymentMethod === "zarinpal"
                      ? "border-red-500 bg-red-500/10"
                      : "border-zinc-700 bg-black"
                  }`}
                >
                  <h4 className="text-lg font-bold mb-1">
                    پرداخت آنلاین
                  </h4>

                  <p className="text-zinc-400 text-sm">
                    اتصال به زرین پال
                  </p>
                </button>

                {/* IDPAY */}

                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      paymentMethod: "idpay",
                    })
                  }
                  className={`rounded-2xl border p-5 text-right duration-300 ${
                    formData.paymentMethod === "idpay"
                      ? "border-red-500 bg-red-500/10"
                      : "border-zinc-700 bg-black"
                  }`}
                >
                  <h4 className="text-lg font-bold mb-1">
                    درگاه آیدی پی
                  </h4>

                  <p className="text-zinc-400 text-sm">
                    پرداخت امن بانکی
                  </p>
                </button>

              </div>

            </div>

          </div>

        </div>



        {/* ORDER */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-fit sticky top-5">

          <h2 className="text-2xl font-bold mb-6">
            سفارش شما
          </h2>

          <div className="space-y-4">

            {cart.map((item: any) => (

              <div
                key={item.id}
                className="flex items-center justify-between border-b border-zinc-800 pb-4"
              >

                <div>
                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <p className="text-zinc-400 text-sm">
                    تعداد: {item.quantity}
                  </p>
                </div>

                <p className="text-red-500 font-bold">
                  {(item.price * item.quantity).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

          {/* TOTAL */}

          <div className="mt-8 pt-6 border-t border-zinc-800">

            <div className="flex items-center justify-between mb-5">

              <span className="text-zinc-400">
                مبلغ نهایی
              </span>

              <span className="text-3xl font-black text-red-500">
                {totalPrice.toLocaleString()}
              </span>

            </div>

           <button
  onClick={submitOrder}
  className="w-full bg-red-600 hover:bg-red-700 duration-300 py-4 rounded-2xl text-lg font-black"
>
  پرداخت و ثبت سفارش
</button>

          </div>

        </div>

      </div>

    </main>
  );
}