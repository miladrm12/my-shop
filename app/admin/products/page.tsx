"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";


type Product = {
  id:string;
  name:string;
  price:number;
  image:string;
  description?:string;
  sizes?:string[];
  colors?:string[];
  stock?:number;
  category_id?:string;
};


export default function AdminProducts(){

const router = useRouter();


const [products,setProducts]=useState<Product[]>([]);
const [categories,setCategories]=useState<any[]>([]);

const [loading,setLoading]=useState(true);
const [uploading,setUploading]=useState(false);



const [name,setName]=useState("");
const [price,setPrice]=useState("");
const [image,setImage]=useState("");
const [description,setDescription]=useState("");
const [stock,setStock]=useState("");
const [category,setCategory]=useState("");

const [sizes,setSizes]=useState<string[]>([]);
const [colors,setColors]=useState<string[]>([]);



const [editingId,setEditingId]=useState("");

const [editName,setEditName]=useState("");
const [editPrice,setEditPrice]=useState("");
const [editImage,setEditImage]=useState("");
const [editDescription,setEditDescription]=useState("");
const [editStock,setEditStock]=useState("");
const [editCategory,setEditCategory]=useState("");

const [editSizes,setEditSizes]=useState<string[]>([]);
const [editColors,setEditColors]=useState<string[]>([]);



const ALL_COLORS=[
"مشکی",
"سفید",
"طوسی",
"سرمه‌ای",
"آبی",
"قرمز",
"سبز",
"کرم",
"قهوه‌ای",
"زرد"
];



useEffect(()=>{

checkUser();
fetchProducts();
fetchCategories();

},[]);



async function checkUser(){

const {
data:{user}
}=await supabase.auth.getUser();


if(!user){

router.push("/admin/login");

}

}





async function fetchProducts(){

setLoading(true);


const {data,error}=await supabase
.from("products")
.select("*");


if(error){

console.log(error);

}else{

setProducts(data || []);

}


setLoading(false);

}




async function fetchCategories(){


const {data,error}=await supabase
.from("categories")
.select("*");


if(error){

console.log(error);

return;

}


setCategories(data || []);


}






async function uploadImage(file:File){

setUploading(true);


const filename =
Date.now()+"-"+file.name;



const { error } = await supabase.storage
.from("products")
.upload(filename,file);



if(error){

alert(error.message);

setUploading(false);

return;

}



const { data } = supabase.storage
.from("products")
.getPublicUrl(filename);



setImage(data.publicUrl);



setUploading(false);


}







async function addProduct(){



if(!name || !price || !image){

alert("اطلاعات کامل نیست");

return;

}



const {error}=await supabase
.from("products")
.insert({

name,

price:Number(price),

image,

description,

stock:Number(stock),

category_id:category,

sizes,

colors

});



if(error){

alert(error.message);

return;

}



alert("محصول اضافه شد");



setName("");

setPrice("");

setImage("");

setDescription("");

setStock("");

setCategory("");

setSizes([]);

setColors([]);


fetchProducts();


}
async function deleteProduct(id:string){


const {error}=await supabase
.from("products")
.delete()
.eq("id",id);



if(error){

alert(error.message);

return;

}


fetchProducts();


}




async function startEdit(product:Product){


setEditingId(product.id);

setEditName(product.name);

setEditPrice(String(product.price));

setEditImage(product.image);

setEditDescription(product.description || "");

setEditStock(String(product.stock || ""));

setEditCategory(product.category_id || "");

setEditSizes(product.sizes || []);

setEditColors(product.colors || []);


}






async function updateProduct(){


const {error}=await supabase
.from("products")
.update({

name:editName,

price:Number(editPrice),

image:editImage,

description:editDescription,

stock:Number(editStock),

category_id:editCategory,

sizes:editSizes,

colors:editColors


})
.eq("id",editingId);



if(error){

alert(error.message);

return;

}



alert("ویرایش شد");


setEditingId("");

fetchProducts();


}





async function logout(){

await supabase.auth.signOut();

router.push("/admin/login");


}






return (

<div className="min-h-screen bg-black text-white p-6">


<div className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
gap-5
mt-10
">


<h1 className="
text-3xl
font-black
">
مدیریت محصولات
</h1>



<button

onClick={logout}

className="
bg-red-600
px-5
py-3
rounded-xl
"

>
خروج
</button>



</div>





{/* ADD PRODUCT */}


<div className="
bg-zinc-900
rounded-3xl
p-6
space-y-4
max-w-xl
">


<h2 className="text-2xl font-bold">
افزودن محصول
</h2>



<input

className="w-full p-4 rounded-xl text-black"

placeholder="نام محصول"

value={name}

onChange={e=>setName(e.target.value)}

 />




<input

className="w-full p-4 rounded-xl text-black"

placeholder="قیمت"

type="number"

value={price}

onChange={e=>setPrice(e.target.value)}

 />





<input

type="file"

onChange={(e)=>{

if(e.target.files?.[0])

uploadImage(e.target.files[0])

}}

/>




{
uploading &&

<p>
درحال آپلود عکس...
</p>

}






<select

className="
w-full
p-4
rounded-xl
text-black
"

value={category}

onChange={e=>setCategory(e.target.value)}

>


<option value="">
انتخاب دسته بندی
</option>



{

categories.map(cat=>(


<option

key={cat.id}

value={cat.id}

>

{cat.name}

</option>



))

}



</select>






<input

className="w-full p-4 rounded-xl text-black"

placeholder="موجودی"

type="number"

value={stock}

onChange={e=>setStock(e.target.value)}

 />






<textarea

className="w-full p-4 rounded-xl text-black"

placeholder="توضیحات"

value={description}

onChange={e=>setDescription(e.target.value)}

 />





<button

onClick={addProduct}

className="
bg-green-600
w-full
p-4
rounded-xl
font-bold
"

>

افزودن محصول

</button>




</div>






{/* PRODUCTS LIST */}



<div className="
grid
md:grid-cols-3
gap-5
mt-10
">


{


products.map(product=>(


<div

key={product.id}

className="
bg-zinc-900
rounded-3xl
p-4
"

>


<img

src={product.image}

className="
w-full
h-60
object-cover
rounded-xl
"

/>



<h3 className="
text-xl
font-bold
mt-4
">

{product.name}

</h3>



<p>

{product.price.toLocaleString()}

 تومان

</p>




<p className="text-red-400">

{
categories.find(
c=>c.id===product.category_id
)?.name

}

</p>





<div className="
flex
gap-3
mt-4
">


<button

onClick={()=>startEdit(product)}

className="
bg-blue-600
px-4
py-2
rounded-xl
"

>

ویرایش

</button>





<button

onClick={()=>deleteProduct(product.id)}

className="
bg-red-600
px-4
py-2
rounded-xl
"

>

حذف

</button>




</div>



</div>


))


}



</div>





{/* EDIT BOX */}



{

editingId &&

<div className="
fixed
inset-0
bg-black/80
flex
items-center
justify-center
p-5
">


<div className="
bg-zinc-900
rounded-3xl
p-6
w-full
max-w-xl
space-y-4
">


<h2 className="text-2xl font-bold">
ویرایش محصول
</h2>




<input

className="w-full p-3 rounded text-black"

value={editName}

onChange={e=>setEditName(e.target.value)}

 />




<input

className="w-full p-3 rounded text-black"

value={editPrice}

onChange={e=>setEditPrice(e.target.value)}

 />




<select

className="w-full p-3 rounded text-black"

value={editCategory}

onChange={e=>setEditCategory(e.target.value)}

>


<option value="">
دسته بندی
</option>


{

categories.map(cat=>(

<option

key={cat.id}

value={cat.id}

>

{cat.name}

</option>

))

}



</select>






<button

onClick={updateProduct}

className="
bg-green-600
w-full
p-3
rounded-xl
"

>

ذخیره تغییرات

</button>



<button

onClick={()=>setEditingId("")}

className="
bg-zinc-700
w-full
p-3
rounded-xl
"

>

بستن

</button>




</div>


</div>


}



</div>

)

}