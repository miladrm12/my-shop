"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


type Order = {
  id:string;
  customer_name:string;
  phone:string;
  address:string;
  total_price:number;
  status:string;
  tracking_code?:string;
};


const statusText:any = {

pending:"در انتظار تایید",

confirmed:"تایید شده",

preparing:"در حال آماده سازی",

shipped:"ارسال شده",

delivered:"تحویل داده شده",

cancelled:"لغو شده"

};



export default function OrdersPage(){


const [orders,setOrders]=useState<Order[]>([]);
const [loading,setLoading]=useState(true);


async function fetchOrders(){

setLoading(true);


const {data,error}=await supabase

.from("orders")

.select("*")

.order("created_at",{ascending:false});



if(error){

console.log(error);

return;

}


setOrders(data || []);

setLoading(false);

}





useEffect(()=>{

fetchOrders();

},[]);






async function changeStatus(
id:string,
status:string
){


const {error}=await supabase

.from("orders")

.update({

status

})

.eq("id",id);



if(error){

alert(error.message);

return;

}


fetchOrders();


}







async function addTracking(
id:string
){

const code = prompt(
"کد رهگیری را وارد کنید"
);


if(!code)return;



const {error}=await supabase

.from("orders")

.update({

tracking_code:code,

status:"shipped"

})

.eq("id",id);



if(error){

alert(error.message);

return;

}


alert("کد رهگیری ثبت شد");

fetchOrders();


}







async function deleteOrder(id:string){


if(!confirm("حذف شود؟"))return;



const {error}=await supabase

.from("orders")

.delete()

.eq("id",id);



if(error){

alert(error.message);

return;

}



fetchOrders();



}





return (

<main className="
min-h-screen
bg-black
text-white
p-10
">


<h1 className="
text-5xl
font-black
mb-10
">

مدیریت سفارشات

</h1>



{loading ? (

<p>
در حال بارگذاری...
</p>


):

orders.length===0?(

<p>
سفارشی وجود ندارد
</p>


):

(


<div className="
grid
gap-6
">


{

orders.map(order=>(



<div

key={order.id}

className="
bg-zinc-900
border
border-zinc-800
rounded-3xl
p-6
shadow-xl
"


>


<h2 className="
text-2xl
font-bold
mb-4
">

{order.customer_name}

</h2>



<p className="text-zinc-400">

شماره:
{order.phone}

</p>



<p className="text-zinc-400">

آدرس:
{order.address}

</p>



<p className="
text-red-500
font-bold
text-xl
mt-3
">

{order.total_price.toLocaleString()}
تومان

</p>




<div className="
mt-5
flex
flex-wrap
gap-3
items-center
">



<span className="
bg-blue-600
px-4
py-2
rounded-xl
font-bold
">

{statusText[order.status] || order.status}

</span>





<select

value={order.status}

onChange={(e)=>

changeStatus(
order.id,
e.target.value
)

}

className="
bg-black
border
border-zinc-700
px-4
py-2
rounded-xl
"


>

<option value="pending">

در انتظار تایید

</option>


<option value="confirmed">

تایید شده

</option>


<option value="preparing">

در حال آماده سازی

</option>


<option value="shipped">

ارسال شده

</option>


<option value="delivered">

تحویل داده شده

</option>


<option value="cancelled">

لغو شده

</option>



</select>






<button

onClick={()=>changeStatus(order.id,"confirmed")}

className="
bg-green-600
px-5
py-2
rounded-xl
font-bold
"

>

تایید

</button>






<button

onClick={()=>addTracking(order.id)}

className="
bg-purple-600
px-5
py-2
rounded-xl
font-bold
"

>

کد رهگیری

</button>







<button

onClick={()=>deleteOrder(order.id)}

className="
bg-red-600
px-5
py-2
rounded-xl
font-bold
"

>

حذف

</button>




</div>






{

order.tracking_code && (

<p className="
mt-5
text-green-400
font-bold
">

کد رهگیری:
{order.tracking_code}

</p>

)

}



</div>



))

}


</div>


)}



</main>


)


}