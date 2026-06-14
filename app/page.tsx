"use client";

import { useCart } from "./context/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Link from "next/link";


type Product = {
  id:string;
  name:string;
  price:number;
  image:string;
  category_id:string;
};



export default function Home(){


const {cart}=useCart();


const [products,setProducts]=useState<Product[]>([]);
const [categories,setCategories]=useState<any[]>([]);

const [selectedCategory,setSelectedCategory]=useState<string|null>(null);

const [loading,setLoading]=useState(true);


const [menuOpen,setMenuOpen]=useState(false);


const [support,setSupport]=useState(false);

const [phone,setPhone]=useState("");

const [message,setMessage]=useState("");

const [sending,setSending]=useState(false);






useEffect(()=>{


async function load(){


const {data:productData,error}=await supabase
.from("products")
.select("*");


if(!error){

setProducts(productData || []);

}




const {data:catData}=await supabase
.from("categories")
.select("*");


setCategories(catData || []);



setLoading(false);


}


load();


},[]);







const filteredProducts = selectedCategory

?

products.filter(
p=>p.category_id===selectedCategory
)

:

products;








async function sendSupport(){



if(!phone || !message){

alert("شماره و پیام را وارد کنید");

return;

}



setSending(true);



const {error}=await supabase
.from("support_messages")
.insert({

phone,

message

});



setSending(false);



if(error){

alert(error.message);

return;

}



alert("پیام ارسال شد ✅");

setPhone("");

setMessage("");

setSupport(false);


}









return (



<main className="
min-h-screen
bg-black
text-white
pt-24
">







{/* HEADER */}



<header className="
fixed
top-0
left-0
w-full
z-50
bg-black/80
backdrop-blur-xl
border-b
border-zinc-800
">



<div className="
max-w-7xl
mx-auto
px-5
py-4
flex
justify-between
items-center
">



<h1 className="
text-3xl
font-black
tracking-widest
">

NARCISS

</h1>





<div className="flex gap-3">



<button

onClick={()=>setMenuOpen(true)}

className="
bg-zinc-800
px-5
py-3
rounded-2xl
font-bold
"

>

☰ منو

</button>





<Link

href="/cart"

className="
bg-red-600
px-5
py-3
rounded-2xl
font-bold
"

>

🛒 {cart.length}

</Link>



</div>



</div>



</header>









{/* MENU */}



{

menuOpen && (



<div

onClick={()=>setMenuOpen(false)}

className="
fixed
inset-0
bg-black/70
z-[100]
"


>


<div

onClick={(e)=>e.stopPropagation()}

className="
absolute
right-0
top-0
h-full
w-72
bg-zinc-900
p-6
border-l
border-zinc-800
"


>



<div className="
flex
justify-between
mb-8
">


<h2 className="text-2xl font-black">

دسته بندی

</h2>



<button

onClick={()=>setMenuOpen(false)}

className="text-red-500"

>

✕

</button>


</div>





<button

onClick={()=>{

setSelectedCategory(null);

setMenuOpen(false);

}}

className="
block
w-full
text-right
py-3
hover:text-red-500
"

>

همه

</button>





{

categories.map(cat=>(


<button

key={cat.id}

onClick={()=>{

setSelectedCategory(cat.id);

setMenuOpen(false);

}}

className="
block
w-full
text-right
py-3
hover:text-red-500
"

>

{cat.name}

</button>


))


}




</div>


</div>


)

}









{/* HERO */}



<section className="
text-center
py-28
px-5
">


<p className="text-red-500 tracking-[5px]">

NEW COLLECTION 2026

</p>



<h2 className="
text-6xl
font-black
mt-5
">

NARCISS

</h2>



<p className="text-zinc-400 mt-5 text-xl">

Luxury Street Fashion

</p>


</section>









{/* PRODUCTS */}



<section className="px-5 py-10">



<h2 className="
text-4xl
font-black
text-center
mb-10
">

محصولات

</h2>





{

loading ?


<p className="text-center">

درحال بارگذاری...

</p>



:


<div className="
grid
grid-cols-2
md:grid-cols-3
gap-5
">



{

filteredProducts.map(product=>(



<div

key={product.id}

className="
bg-zinc-900
rounded-3xl
overflow-hidden
border
border-zinc-800
hover:scale-105
transition
"

>



<img

src={product.image}

className="
w-full
h-72
object-cover
"

/>



<div className="p-5">



<h3 className="
font-black
text-xl
">

{product.name}

</h3>



<p className="
text-red-500
mt-3
font-bold
">

{product.price.toLocaleString()} تومان

</p>




<Link

href={`/products/${product.id}`}

className="
block
mt-5
bg-white
text-black
text-center
py-3
rounded-xl
font-bold
"

>

مشاهده

</Link>




</div>



</div>



))


}


</div>



}



</section>









{/* FOOTER */}



<footer className="
border-t
border-zinc-800
mt-20
py-12
text-center
">



<h2 className="text-3xl font-black">

NARCISS

</h2>




<p className="mt-5">

For communication

</p>



<p>
📞 09228594815
</p>



<p>
✉️ miladkamil18@gmail.com
</p>



<p className="text-zinc-500 mt-5">

Website Designer : Milad Kamali

</p>






<div className="flex justify-center gap-4 mt-6">



<a

href="https://t.me/Milad_cod7600"

target="_blank"

className="
bg-blue-600
px-6
py-3
rounded-xl
font-bold
"

>

Telegram

</a>





<a

href="https://www.instagram.com/narcissus.1366/"

target="_blank"

className="
bg-pink-600
px-6
py-3
rounded-xl
font-bold
"

>

Instagram

</a>



</div>



</footer>









{/* SUPPORT */}



<button

onClick={()=>setSupport(true)}

className="
fixed
bottom-6
right-6
bg-red-600
px-6
py-4
rounded-full
font-black
shadow-xl
"

>

پشتیبانی

</button>







{

support && (



<div

className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
z-[200]
"

>


<div className="
bg-zinc-900
p-8
rounded-3xl
w-[90%]
max-w-md
">



<h2 className="text-2xl font-black mb-5">

پشتیبانی نارسیس

</h2>



<input

value={phone}

onChange={e=>setPhone(e.target.value)}

placeholder="شماره تماس"

className="
w-full
bg-black
p-4
rounded-xl
mb-4
"

/>





<textarea

value={message}

onChange={e=>setMessage(e.target.value)}

placeholder="مشکل خود را بنویسید"

className="
w-full
bg-black
p-4
rounded-xl
mb-5
"

/>




<button

onClick={sendSupport}

disabled={sending}

className="
bg-red-600
w-full
py-3
rounded-xl
font-bold
"

>

{

sending
?
"ارسال..."
:
"ارسال پیام"

}

</button>



</div>


</div>



)

}




</main>


)


}