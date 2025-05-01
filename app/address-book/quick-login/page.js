// app/address-book/quick-login/page.js
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function QuickLoginPage() {
  const { auth, login } = useAuth();
  const router = useRouter();

  const doLogin = async (email, password) => {
    const success = await login(email, password);
    if (success) {
      const usp = new URLSearchParams(window.location.search);
      const back = usp.get("back");
      if (back) {
        router.push(back);
      }
    }
  };

  return (
    <>
      <hr />
      <button
        className="btn btn-warning"
        onClick={() => {
          doLogin("ming@test.com", "123456");
        }}
      >
        登入 ming@test.com
      </button>
      <hr />
      <button
        className="btn btn-primary"
        onClick={() => {
          doLogin("shin@test.com", "123456");
        }}
      >
        登入 shin@test.com
      </button>
      <hr />
      {auth.id ? (
        <div>目前登入的 email: {auth.email}</div>
      ) : (
        <div>目前沒有登入</div>
      )}
    </>
  );
}
