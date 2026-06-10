import { NextResponse } from "next/server";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const body = await req.json();

    const user = await User.create({
      name: body.name,
      password: body.password,
    });

    return NextResponse.json({
      message: "ثبت نام موفق",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ثبت نام" },
      { status: 500 }
    );
  }
}