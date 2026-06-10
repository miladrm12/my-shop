import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "شناسه محصول لازم است" }, { status: 400 });
    }

    await fetch(
      `https://my-shop-af351-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "DELETE",
      }
    );

    return NextResponse.json({ message: "محصول حذف شد" });
  } catch (error) {
    return NextResponse.json({ message: "خطا در حذف محصول" }, { status: 500 });
  }
}