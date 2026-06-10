"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("name", name)
        .single();

      if (error || !data) {
        alert("کاربر پیدا نشد");
        return;
      }

      if (data.password === password) {
        alert("ورود موفق");
        router.push("/dashboard");
      } else {
        alert("رمز اشتباهه");
      }
    } catch (error) {
      console.log(error);
      alert("خطا در ورود");
    }
  };

  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "300px",
          background: "#111",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h1 style={{ color: "white", textAlign: "center" }}>
          ورود
        </h1>

        <input
          type="text"
          placeholder="نام کاربری"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="رمز"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            background: "lime",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ورود
        </button>
      </form>
    </div>
  );
}