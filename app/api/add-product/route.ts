import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name: body.name,
          price: body.price,
          image: body.image,
        },
      ]);

  if (error) {
  console.log("SUPABASE ERROR:", error);

  return NextResponse.json(
    {
      message: error.message,
      details: error,
    },
    { status: 500 }
  );
}

    return NextResponse.json({
      message: "محصول اضافه شد",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در افزودن محصول",
      },
      { status: 500 }
    );
  }
} 