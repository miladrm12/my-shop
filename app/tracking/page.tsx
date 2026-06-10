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
      .order("created_at", {
        ascending: false
      })
      .limit(1)
      .single();


    if(error){

      alert("سفارشی پیدا نشد");
      setOrder(null);

    }else{

      setOrder(data);

    }


    setLoading(false);

  }



  return (

    <main className="
    min-h-screen 
    bg-black 
    text-white 
    p-6
    ">


      <div className="
      max-w-xl 
      mx-auto
      ">


        <h1 className="
        text-5xl 
        font-black 
        text-center 
        mb-10
        ">
          پیگیری سفارش
        </h1>



        <div className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        p-6
        shadow-2xl
        ">


          <input

          value={phone}

          onChange={(e)=>setPhone(e.target.value)}

          placeholder="شماره موبایل"

          className="
          w-full
          bg-black
          border
          border-zinc-700
          rounded-2xl
          px-5
          py-4
          outline-none
          focus:border-red-500
          "

          />



          <button

          onClick={searchOrder}

          className="
          w-full
          mt-5
          bg-red-600
          hover:bg-red-700
          py-4
          rounded-2xl
          font-black
          transition
          "

          >

          {loading 
          ? 
          "در حال جستجو..."
          :
          "پیگیری سفارش"
          }

          </button>



        </div>




        {
        order && (

        <div className="
        mt-8
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        p-7
        shadow-2xl
        ">


          <h2 className="
          text-3xl
          font-black
          mb-6
          ">

          سفارش #{order.id}

          </h2>




          <div className="space-y-4 text-lg">


            <p>
              نام مشتری:
              <span className="text-zinc-300 mr-2">
              {order.customer_name}
              </span>
            </p>



            <p>
              شماره موبایل:
              <span className="text-zinc-300 mr-2">
              {order.phone}
              </span>
            </p>



            <p>
              مبلغ:
              <span className="text-red-500 mr-2 font-bold">
              {order.total_price?.toLocaleString()}
              تومان
              </span>
            </p>




            <div className="
            mt-6
            bg-black
            border
            border-zinc-700
            rounded-2xl
            p-5
            ">


            <p className="text-zinc-400 mb-2">
            وضعیت سفارش
            </p>


            <p className={`
            text-2xl
            font-black
            ${statusColor[order.status]}
            `}>

            {
            statusText[order.status] 
            || 
            "نامشخص"
            }

            </p>


            </div>





            {
            order.tracking_code && (

            <div className="
            mt-5
            bg-zinc-800
            rounded-2xl
            p-5
            ">

            <p className="text-zinc-400">
            کد رهگیری
            </p>


            <p className="
            text-xl
            font-bold
            mt-2
            ">
            {order.tracking_code}
            </p>


            </div>

            )
            }




          </div>



        </div>

        )
        }



      </div>


    </main>

  );

}