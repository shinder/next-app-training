import Head from "next/head";
import Navbar from "@/components/layouts/navbar";

export const metadata = {
  title: "通訊錄 - 小新的網站",
  description: "通訊錄管理",
};

export default function ABLayout({ children}) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
}
