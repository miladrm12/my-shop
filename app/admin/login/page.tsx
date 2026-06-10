"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/products");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-black text-center text-white mb-8">
          ورود ادمین
        </h1>

        <div className="flex flex-col gap-4">

          <input
            className="w-full p-4 rounded-xl bg-white text-black outline-none"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-4 rounded-xl bg-white text-black outline-none"
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-green-600 hover:bg-green-700 transition p-4 rounded-xl font-bold text-white"
          >
            ورود
          </button>

        </div>
      </div>
    </div>
  );
}