"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
const selectedStyle = {
  color: "white",
  fontWeight: "900",
  borderRadius: "5px",
  backgroundColor: "#0070f3",
};
export default function Navbar() {
  const { auth, logout } = useAuth();
  const pathname = usePathname();

  const leftItems = [
    { title: "通訊錄列表", href: "/address-book" },
    { title: "新增通訊錄", href: "/address-book/add" },
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
                return <li className="nav-item" key={item.href}>
                  <Link
                    className="nav-link"
                    aria-current="page"
                    href={item.href}
                    style={pathname === item.href ? selectedStyle : {}}
                  >
                    {item.title}
                  </Link>
                </li>;
              })}
            </ul>

            <ul className="navbar-nav  mb-2 mb-lg-0">
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
                    <Link
                      className="nav-link"
                      style={
                        pathname === "/address-book/quick-login"
                          ? selectedStyle
                          : {}
                      }
                      href="/address-book/quick-login"
                    >
                      快速登入
                    </Link>
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
