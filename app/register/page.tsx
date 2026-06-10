"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !password) {
      alert("فیلدها را پر کن");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: name,
        password: password,
      })
    );

    alert("ثبت شد");

    router.push("/dashboard");
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
      <div
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
          ثبت نام
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
          onClick={handleRegister}
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
          ثبت نام
        </button>
      </div>
    </div>
  );
}