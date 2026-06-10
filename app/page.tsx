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



useEffect(()=>{


async function load(){


const {data:productData,error}=await supabase
.from("products")
.select("*");


if(error){
console.log(error);
}else{
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





return (

<main
className="
min-h-screen
bg-black
text-white
pt-24
overflow-x-hidden
"
>



{/* HEADER */}

<header
className="
fixed
top-0
left-0
w-full
z-50
bg-black/80
backdrop-blur-xl
border-b
border-zinc-800
"
>


<div
className="
max-w-7xl
mx-auto
px-4
py-4
flex
items-center
justify-between
gap-3
"
>


<h1
className="
text-xl
md:text-3xl
font-black
"
>
NARCISS
</h1>



<div
className="
flex
gap-2
items-center
"
>


<Link
href="/register"
className="
hidden
sm:block
bg-white
text-black
px-4
py-2
rounded-xl
font-bold
text-sm
"
>
ثبت نام
</Link>



<Link
href="/tracking"
className="
hidden
md:block
bg-zinc-800
px-4
py-2
rounded-xl
font-bold
text-sm
"
>
پیگیری
</Link>




<Link
href="/cart"
className="
bg-red-600
px-4
py-2
rounded-xl
font-bold
flex
gap-2
items-center
"
>

🛒

<span
className="
bg-white
text-black
rounded-full
px-2
text-xs
"
>
{cart.length}
</span>


</Link>



</div>


</div>


</header>





{/* HERO */}


<section
className="
text-center
px-5
py-24
"
>


<p
className="
text-red-500
tracking-[4px]
mb-5
"
>
NEW COLLECTION
</p>



<h2
className="
text-4xl
md:text-7xl
font-black
leading-tight
"
>
استایل جدید
<br/>
نسل آینده
</h2>



<p
className="
text-zinc-400
mt-5
"
>
خاص بپوش، متفاوت دیده شو
</p>



</section>






{/* CATEGORY */}


<section
className="
px-4
"
>


<div
className="
flex
gap-3
overflow-x-auto
pb-5
"
>


<button
onClick={()=>setSelectedCategory(null)}
className="
bg-zinc-800
px-5
py-3
rounded-full
whitespace-nowrap
"
>
همه
</button>




{
categories.map(cat=>(


<button

key={cat.id}

onClick={()=>setSelectedCategory(cat.id)}

className="
bg-zinc-800
px-5
py-3
rounded-full
whitespace-nowrap
hover:bg-red-600
transition
"

>

{cat.name}

</button>


))
}



</div>


</section>







{/* PRODUCTS */}



<section
className="
px-4
py-10
"
>


<h2
className="
text-3xl
font-black
mb-8
text-center
"
>
محصولات
</h2>



<div
className="
grid
grid-cols-2
md:grid-cols-3
gap-4
"
>



{

loading ?

<p>
درحال بارگذاری...
</p>


:

filteredProducts.map(product=>(



<div
key={product.id}

className="
bg-zinc-900
rounded-3xl
overflow-hidden
border
border-zinc-800
hover:scale-[1.03]
transition
"
>



<img

src={product.image}

className="
w-full
h-52
md:h-96
object-cover
"

/>



<div
className="
p-4
"
>


<h3
className="
font-bold
text-sm
md:text-xl
"
>
{product.name}
</h3>




<div
className="
flex
justify-between
items-center
mt-4
"
>


<span
className="
text-red-500
font-black
"
>
{product.price.toLocaleString()}
</span>



<Link

href={`/products/${product.id}`}

className="
bg-white
text-black
px-3
py-2
rounded-xl
text-xs
font-bold
"
>
دیدن
</Link>



</div>



</div>


</div>



))

}




</div>


</section>






<footer
className="
border-t
border-zinc-800
py-10
text-center
mt-20
"
>

<h2
className="
font-black
text-2xl
"
>
NARCISS
</h2>


<p
className="
text-zinc-500
mt-3
"
>
© 2026
</p>


</footer>




</main>


)


}