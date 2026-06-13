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

const [support,setSupport]=useState(false);


useEffect(()=>{

async function load(){

const {data:productsData}=await supabase
.from("products")
.select("*");


setProducts(productsData || []);



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





{/* HERO */}


<section className="
text-center
py-28
px-5
">


<p className="
text-red-500
tracking-[5px]
">
NEW COLLECTION 2026
</p>


<h2 className="
text-6xl
font-black
mt-5
">

NARCISS

</h2>


<p className="
text-zinc-400
mt-5
text-xl
">
Luxury Street Fashion
</p>


</section>







{/* CATEGORY */}



<section className="px-5">


<h2 className="
text-3xl
font-black
mb-5
">
دسته بندی
</h2>


<div className="
flex
gap-3
overflow-x-auto
pb-5
">


{
[
"کفش",
"لباس",
"شلوار",
"اکسسوری",
"بدلیجات ست",
"هودی",
"کاپشن",
"کالکشن"
].map((x)=>(


<button

key={x}

className="
bg-zinc-900
border
border-zinc-700
px-6
py-3
rounded-full
hover:bg-red-600
transition
"
>

{x}

</button>


))

}


</div>


</section>







{/* PRODUCTS */}



<section className="
px-5
py-10
">


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
">


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
">

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


<h2 className="
text-3xl
font-black
">
NARCISS
</h2>



<p className="text-zinc-400 mt-5">
For communication
</p>


<p>
📞 09228594815
</p>


<p>
✉️ miladkamil18@gmail.com
</p>



<p className="
mt-5
text-zinc-500
">

Website Designer : Milad Kamali

</p>



<a

href="https://t.me/"

className="
inline-block
mt-5
bg-blue-600
px-8
py-3
rounded-xl
font-bold
">

Telegram

</a>


</footer>







{/* SUPPORT BUTTON */}


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
">

پشتیبانی

</button>





{
support &&


<div className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
z-[100]
">


<div className="
bg-zinc-900
p-8
rounded-3xl
w-96
">


<h2 className="
text-2xl
font-black
mb-5
">

پشتیبانی نارسیس

</h2>


<input

placeholder="شماره تماس شما"

className="
w-full
bg-black
p-4
rounded-xl
mb-4
"
/>


<textarea

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

className="
bg-red-600
w-full
py-3
rounded-xl
font-bold
">

ارسال

</button>


</div>


</div>


}



</main>


)

}