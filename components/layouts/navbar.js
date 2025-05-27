"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";
const selectedStyle = {
  color: "white",
  fontWeight: "900",
  borderRadius: "6px",
  backgroundColor: "#0070f3",
};
export default function Navbar() {
  const { auth, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const gotoLoginPage = (e) => {
    e.preventDefault();
    router.push(`/address-book/quick-login?back=${location.href}`);
  };

  const leftItems = [
    { title: "Cleanup", href: "/cleanup" },
    { title: "通訊錄列表", href: "/address-book" },
    { title: "新增通訊錄", href: "/address-book/add" },
    { title: "動畫測試", href: "/my-motion" },
  ];

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {leftItems.map((item) => {
                if (pathname === item.href) {
                  return (
                    <li className="nav-item" key={item.href}>
                      <span
                        className="nav-link"
                        aria-current="page"
                        href={item.href}
                        style={selectedStyle}
                      >
                        {item.title}
                      </span>
                    </li>
                  );
                }
                return (
                  <li className="nav-item" key={item.href}>
                    <Link className="nav-link" href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="navbar-nav  mb-2 mb-lg-0">
              {session.status === "loading" ? (
                <li className="nav-item">
                  <span className="nav-link">Loading...</span>
                </li>
              ) : session.status === "unauthenticated" ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("google");
                    }}
                  >
                    Google登入
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    {console.log(session)}
                    <a className="nav-link">{session?.data?.user?.email}</a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Google登出
                    </a>
                  </li>
                </>
              )}

              {auth.id ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link">{auth.nickname}</a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      登出
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={
                        pathname === "/address-book/quick-login"
                          ? selectedStyle
                          : {}
                      }
                      href="#"
                      onClick={gotoLoginPage}
                    >
                      快速登入
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="#">
                      註冊
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
