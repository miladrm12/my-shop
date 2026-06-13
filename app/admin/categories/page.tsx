"use client";

import {useEffect,useState} from "react";
import {supabase} from "../../lib/supabase";


export default function CategoriesAdmin(){

const [categories,setCategories]=useState<any[]>([]);
const [name,setName]=useState("");



async function load(){

const {data}=await supabase
.from("categories")
.select("*")
.order("id");


setCategories(data || []);

}


useEffect(()=>{

load();

},[]);



async function addCategory(){


if(!name)return;


await supabase
.from("categories")
.insert({
name
});


setName("");

load();

}




async function remove(id:number){

await supabase
.from("categories")
.delete()
.eq("id",id);


load();

}




return (

<div className="min-h-screen bg-black text-white p-10">


<h1 className="text-4xl font-black mb-10">
مدیریت دسته بندی
</h1>



<div className="flex gap-3">


<input

value={name}

onChange={e=>setName(e.target.value)}

placeholder="نام دسته"

className="
bg-zinc-900
p-4
rounded-xl
"

/>


<button

onClick={addCategory}

className="
bg-red-600
px-6
rounded-xl
">

افزودن

</button>


</div>




<div className="mt-10 space-y-4">


{
categories.map(cat=>(


<div

key={cat.id}

className="
bg-zinc-900
p-5
rounded-2xl
flex
justify-between
">


<span>
{cat.name}
</span>


<button

onClick={()=>remove(cat.id)}

className="
bg-red-600
px-4
py-2
rounded-xl
">

حذف

</button>



</div>


))

}



</div>


</div>

)

}