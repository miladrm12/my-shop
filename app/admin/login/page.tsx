"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("❌ " + error.message);
      return;
    }

    alert("✅ ورود موفق");
    router.push("/admin/products");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input placeholder="ایمیل" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="رمز" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>ورود</button>
      </form>
    </div>
  );
}