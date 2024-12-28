// app/address-book/quick-login/page.js
"use client";

import { useAuth } from "@/contexts/auth-context";

export default function QuickLoginPage() {
  const { auth, login } = useAuth();
  console.log("quick:", auth);
  return (
    <>
      <hr />
      <button
        className="btn btn-warning"
        onClick={() => {
          login("ming@test.com", "123456");
        }}
      >
        登入 ming@test.com
      </button>

      <hr />
      <button
        className="btn btn-primary"
        onClick={() => {
          login("shin@test.com", "123456");
        }}
      >
        登入 shin@test.com
      </button>

      <hr />
      <div>目前登入的 email: {auth.email}</div>
    </>
  );
}
