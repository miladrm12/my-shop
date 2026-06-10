import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// استفاده از Service Role Key برای دسترسی امن سمت سرور
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // این کلید هرگز نباید لو برود
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, userId } = body; // items = [{ id: "...", quantity: 2 }]

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: "سبد خرید خالی است" }, { status: 400 });
    }

    // ۱. استخراج تمام آیدی‌های محصولات کلاینت
    const productIds = items.map((item: any) => item.id);

    // ۲. استعلام قیمت واقعی محصولات مستقیماً از دیتابیس (جلوگیری از هک قیمت)
    const { data: dbProducts, error: dbError } = await supabaseAdmin
      .from("products")
      .select("id, price, stock, name")
      .in("id", productIds);

    if (dbError || !dbProducts) {
      return NextResponse.json({ success: false, error: "خطا در استعلام محصولات" }, { status: 500 });
    }

    let totalPrice = 0;
    const orderItemsDetails = [];

    // ۳. محاسبه قیمت نهایی و بررسی موجودی انبار در سمت سرور
    for (const clientItem of items) {
      const dbProduct = dbProducts.find((p) => p.id === clientItem.id);

      if (!dbProduct) {
        return NextResponse.json({ success: false, error: `محصولی پیدا نشد` }, { status: 404 });
      }

      if (dbProduct.stock < clientItem.quantity) {
        return NextResponse.json({ success: false, error: `موجودی محصول ${dbProduct.name} کافی نیست` }, { status: 400 });
      }

      totalPrice += dbProduct.price * clientItem.quantity;
      orderItemsDetails.push({
        product_id: dbProduct.id,
        quantity: clientItem.quantity,
        price_at_purchase: dbProduct.price
      });
    }

    // ۴. ثبت سفارش در جدول سفارشات (Orders) با وضعیت "در انتظار پرداخت"
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId || null, // اگر کاربر مهمان بود نال می‌ماند
        total_amount: totalPrice,
        status: "pending", // در انتظار پرداخت درگاه
        items: orderItemsDetails
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json({ success: false, error: orderError.message }, { status: 500 });
    }

    // ۵. اینجا بعداً توکن درگاه پرداخت (مثل زرین‌پال) را می‌سازیم و به فایربیس/کلاینت می‌فرستیم
    // فعلاً شناسه سفارش و مبلغ نهاییِ تایید شده را برمی‌گردانیم
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amountToPay: totalPrice,
      message: "سفرش امن با موفقیت ثبت شد و آماده پرداخت است."
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: "خطای سرور" }, { status: 500 });
  }
}
