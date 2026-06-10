import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, name, price, image } = await req.json();

    await fetch(
      `https://my-shop-af351-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          image,
        }),
      }
    );

    return NextResponse.json({
      message: "محصول ویرایش شد",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا" },
      { status: 500 }
    );
  }
}