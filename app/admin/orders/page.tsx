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
 created_at:string;
};


const statuses = [
 {
  value:"pending",
  label:"در انتظار تایید"
 },
 {
  value:"confirmed",
  label:"تایید شده"
 },
 {
  value:"preparing",
  label:"در حال آماده سازی"
 },
 {
  value:"shipped",
  label:"ارسال شده"
 },
 {
  value:"delivered",
  label:"تحویل داده شده"
 },
 {
  value:"cancelled",
  label:"لغو شده"
 }
];



export default function OrdersPage(){


const [orders,setOrders]=useState<Order[]>([]);
const [loading,setLoading]=useState(true);



async function getOrders(){


setLoading(true);


const {data,error}=await supabase
.from("orders")
.select("*")
.order("created_at",{ascending:false});


if(error){

console.log(error);
alert(error.message);

return;

}


setOrders(data || []);

setLoading(false);


}



useEffect(()=>{

getOrders();

},[]);





async function updateStatus(
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



getOrders();


}






async function tracking(id:string){


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


getOrders();



}





async function removeOrder(id:string){


const ok = confirm(
"این سفارش حذف شود؟"
);


if(!ok)return;



const {error}=await supabase
.from("orders")
.delete()
.eq("id",id);



if(error){

alert(error.message);

return;

}



getOrders();


}





return (

<main className="
min-h-screen
bg-black
text-white
p-5
md:p-10
">


<h1 className="
text-4xl
font-black
mb-10
">

پنل مدیریت سفارشات NARCISS

</h1>




{
loading ?

<p>
درحال دریافت سفارشات...
</p>


:

orders.length===0 ?

<p>
سفارشی وجود ندارد
</p>


:


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
font-black
mb-5
">

سفارش #{order.id}

</h2>



<p>
👤 مشتری:
{order.customer_name}
</p>


<p>
📞 شماره:
{order.phone}
</p>



<p>
📍 آدرس:
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
mt-6
flex
flex-wrap
gap-3
">


<select

value={order.status}

onChange={(e)=>
updateStatus(
order.id,
e.target.value
)
}

className="
bg-black
border
border-zinc-700
rounded-xl
px-4
py-3
"


>


{
statuses.map(s=>(

<option
key={s.value}
value={s.value}
>

{s.label}

</option>


))
}



</select>




<button

onClick={()=>
updateStatus(
order.id,
"confirmed"
)

}

className="
bg-green-600
px-5
py-3
rounded-xl
font-bold
"

>

تایید سفارش

</button>






<button

onClick={()=>tracking(order.id)}

className="
bg-purple-600
px-5
py-3
rounded-xl
font-bold
"

>

ثبت کد رهگیری

</button>






<button

onClick={()=>removeOrder(order.id)}

className="
bg-red-600
px-5
py-3
rounded-xl
font-bold
"

>

حذف

</button>




</div>






{

order.tracking_code &&

<p className="
mt-5
text-green-400
font-bold
">

🚚 کد رهگیری:
{order.tracking_code}

</p>


}



</div>


))

}


</div>



}


</main>


)

}