"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  sizes?: string[];
colors?: string[];
  stock?: number;
  category?: string;
};

export default function AdminProducts() {
const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
const [description, setDescription] = useState("");
const [sizes, setSizes] = useState<string[]>([]);
const [stock, setStock] = useState("");
const [category, setCategory] = useState("");

  const [editingId, setEditingId] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editStock, setEditStock] = useState("");
const [editCategory, setEditCategory] = useState("");
const [editSizes, setEditSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
 const [colors, setColors] = useState<string[]>([]);
 const [editColors, setEditColors] = useState<string[]>([]);
  const ALL_COLORS = [
  "مشکی",
  "سفید",
  "طوسی روشن",
  "طوسی تیره",
  "سرمه‌ای",
  "آبی نفتی",
  "آبی کاربنی",
  "آبی آسمانی",
  "قرمز",
  "زرشکی",
  "صورتی",
  "بنفش",
  "سبز",
  "زیتونی",
  "ارتشی",
  "خردلی",
  "نارنجی",
  "کرم",
  "بژ",
  "قهوه‌ای",
  "شکلاتی",
  "شتری",
  "ذغالی"
];

useEffect(() => {
  checkUser();
  fetchProducts();
}, []);

async function checkUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    router.push("/admin/login");
  }
}
  async function fetchProducts() {
  try {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error(error);
      setProducts([]);
      return;
    }

    setProducts(data || []);
  } catch (err) {
    console.error(err);
    setProducts([]);
  } finally {
    setLoading(false);
  }
}
async function uploadImage(file: File) {
  try {
    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);

  } catch (err) {
    console.log(err);
    alert("خطا در آپلود عکس");
  } finally {
    setUploading(false);
  }
}
 async function addProduct() {
  if (!name || !price || !image) {
    alert("لطفاً همه فیلدها را پر کنید");
    return;
  }

  const { error } = await supabase
  .from("products")
  .insert([
  {
  name,
  price: Number(price),
  image,
  description,
  sizes,
  colors,
  stock: Number(stock),
  category,
}
  ]);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  alert("محصول اضافه شد");

setEditingId("");
setEditName("");
setEditPrice("");
setEditImage("");
setEditDescription("");
setEditStock("");
setEditCategory("");
setEditSizes([]);
setEditColors([]);

  fetchProducts();
}

 async function deleteProduct(id: string) {
  if (!confirm("آیا مطمئن هستید؟")) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  alert("محصول حذف شد");
  fetchProducts();
}

  async function updateProduct() {
  if (!editName || !editPrice || !editImage) {
    alert("لطفاً همه فیلدها را پر کنید");
    return;
  }

  const { error } = await supabase
    .from("products")
   .update({
  name: editName,
  price: Number(editPrice),
  image: editImage,
  description: editDescription,
  stock: Number(editStock),
  category: editCategory,
  sizes: editSizes,
  colors: editColors,
})
    .eq("id", editingId);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

 alert("محصول ویرایش شد");

setEditingId("");
setEditName("");
setEditPrice("");
setEditImage("");
setEditDescription("");
setEditStock("");
setEditCategory("");
setEditSizes([]);
setEditColors([]);

  fetchProducts();
}
async function logout() {
  await supabase.auth.signOut();
  router.push("/admin/login");
}

return (
  <div className="min-h-screen bg-black text-white p-10">

    <div className="flex justify-between items-center mb-10">
      <h1 className="text-5xl font-black">
        پنل مدیریت محصولات
      </h1>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold"
      >
        خروج
      </button>
    </div>
      
      {/* فرم افزودن محصول */}
      <div className="max-w-xl flex flex-col gap-4 mb-10">
        <input
          className="p-4 rounded bg-white text-black"
          placeholder="نام محصول"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-4 rounded bg-white text-black"
          placeholder="قیمت"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
       <div className="flex flex-col gap-3">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        uploadImage(e.target.files[0]);
      }
    }}
  />
<input
  className="p-4 rounded bg-white text-black"
  placeholder="توضیحات محصول"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
<input
  className="p-4 rounded bg-white text-black"
  placeholder="دسته بندی (مثلا هودی)"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>

<input
  className="p-4 rounded bg-white text-black"
  placeholder="موجودی"
  type="number"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
/>
<h3 className="text-xl font-bold mb-4">
  انتخاب سایز
</h3>

<div className="flex gap-3 flex-wrap mb-6">
  {["S", "M", "L", "XL", "XXL"].map((size) => (
    <button
      key={size}
      type="button"
      onClick={() => {
        if (sizes.includes(size)) {
          setSizes(sizes.filter((s) => s !== size));
        } else {
          setSizes([...sizes, size]);
        }
      }}
      className={
        sizes.includes(size)
          ? "bg-green-600 px-4 py-2 rounded-xl"
          : "bg-zinc-700 px-4 py-2 rounded-xl"
      }
    >
      {sizes.includes(size) ? "✓ " : ""}
      {size}
    </button>
  ))}
</div>

<h3 className="text-xl font-bold mb-4">
  انتخاب رنگ
</h3>

<div className="flex flex-wrap gap-3 mb-6">
  {ALL_COLORS.map((color) => (
    <button
      key={color}
      type="button"
      onClick={() => {
        if (colors.includes(color)) {
          setColors(colors.filter((c) => c !== color));
        } else {
          setColors([...colors, color]);
        }
      }}
      className={
        colors.includes(color)
          ? "bg-blue-600 px-4 py-2 rounded-xl"
          : "bg-zinc-700 px-4 py-2 rounded-xl"
      }
    >
      {colors.includes(color) ? "✓ " : ""}
      {color}
    </button>
  ))}
</div>
  {uploading && (
    <p>در حال آپلود عکس...</p>
  )}

 {image && (
  <img
    src={image}
    alt="preview"
    className="w-40 rounded"
  />
)}
</div> {/* flex flex-col gap-3 */}

<button
  onClick={addProduct}
  className="bg-green-600 p-4 rounded font-bold hover:bg-green-700"
>
  افزودن محصول
</button>

</div> {/* max-w-xl flex flex-col gap-4 mb-10 */}

      {/* لیست محصولات */}
      {loading ? (
        <p>در حال بارگذاری محصولات...</p>
      ) : products.length === 0 ? (
        <p>محصولی موجود نیست</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded mb-3" />
             <h2 className="text-2xl font-bold">{product.name}</h2>

<p className="text-zinc-400 mb-3">
  {product.price.toLocaleString()} تومان
</p>

<p className="text-sm text-blue-400">
  دسته بندی: {product.category}
</p>

<p className="text-sm text-yellow-400">
  موجودی: {product.stock}
</p>

<p className="text-zinc-500 text-sm mt-2">
  {product.description}
</p>

<div className="flex gap-2 flex-wrap mt-3">
  {product.sizes?.map((size) => (
    <span
      key={size}
      className="bg-zinc-700 px-3 py-1 rounded"
    >
      {size}
    </span>
  ))}
</div>
              <div className="flex gap-2">
                <button onClick={() => deleteProduct(product.id)} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">حذف</button>
                <button
  onClick={() => {
  setEditingId(product.id);

  setEditName(product.name);
  setEditPrice(product.price.toString());
  setEditImage(product.image);

  setEditDescription(product.description || "");
  setEditStock(product.stock?.toString() || "");
  setEditCategory(product.category || "");

  setEditSizes(product.sizes || []);
  setEditColors(product.colors || []);
}}
  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
>
  ویرایش
</button>
              </div>
            </div>
          ))}
        </div>
      )}

  {/* فرم ویرایش محصول */}
{editingId && (
  <div className="mt-10 bg-zinc-900 p-6 rounded-xl max-w-xl">
    <h2 className="text-3xl font-bold mb-5">
      ویرایش محصول
    </h2>

    <div className="flex flex-col gap-4">

      <input
        className="p-4 rounded bg-white text-black"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />

      <input
        className="p-4 rounded bg-white text-black"
        type="number"
        value={editPrice}
        onChange={(e) => setEditPrice(e.target.value)}
      />

      <input
        className="p-4 rounded bg-white text-black"
        value={editImage}
        onChange={(e) => setEditImage(e.target.value)}
      />

      <input
        className="p-4 rounded bg-white text-black"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="توضیحات"
      />

      <input
        className="p-4 rounded bg-white text-black"
        value={editCategory}
        onChange={(e) => setEditCategory(e.target.value)}
        placeholder="دسته بندی"
      />

      <input
        className="p-4 rounded bg-white text-black"
        value={editStock}
        onChange={(e) => setEditStock(e.target.value)}
        placeholder="موجودی"
      />

      {/* سایزها */}
      <h3 className="text-xl font-bold">
        سایزها
      </h3>

      <div className="flex gap-3 flex-wrap mb-4">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => {
              if (editSizes.includes(size)) {
                setEditSizes(
                  editSizes.filter((s) => s !== size)
                );
              } else {
                setEditSizes([...editSizes, size]);
              }
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all
              ${
                editSizes.includes(size)
                  ? "bg-green-600 ring-4 ring-green-300 scale-105"
                  : "bg-zinc-700 hover:bg-zinc-600"
              }`}
          >
            {editSizes.includes(size) ? "✓ " : ""}
            {size}
          </button>
        ))}
      </div>

      {/* رنگ ها */}
      <h3 className="text-xl font-bold">
        رنگ ها
      </h3>

      <div className="flex flex-wrap gap-3 mb-4">
        {ALL_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => {
              if (editColors.includes(color)) {
                setEditColors(
                  editColors.filter((c) => c !== color)
                );
              } else {
                setEditColors([...editColors, color]);
              }
            }}
            className={`px-4 py-2 rounded-xl transition-all
              ${
                editColors.includes(color)
                  ? "bg-blue-600 ring-4 ring-blue-300 scale-105"
                  : "bg-zinc-700 hover:bg-zinc-600"
              }`}
          >
            {editColors.includes(color) ? "✓ " : ""}
            {color}
          </button>
        ))}
      </div>

           <button
        onClick={updateProduct}
        className="bg-green-600 p-4 rounded font-bold hover:bg-green-700"
      >
        ذخیره تغییرات
      </button>

    </div>
  </div>
)}

</div>

);
}