"use client";

import { useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const snapshot = await get(ref(db, "users/" + name));

      if (snapshot.exists()) {
        const data = snapshot.val();

        if (data.password === password) {
          alert("ورود موفق");

          router.push("/dashboard");
        } else {
          alert("رمز اشتباهه");
        }
      } else {
        alert("کاربر پیدا نشد");
      }
    } catch (error) {
      console.log(error);
      alert("خطا");
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
        <h1
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
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