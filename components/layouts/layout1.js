import Head from "next/head";
import Navbar from "./navbar";

export default function Layout1({ children, title = "小新的網站" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="樣版頁" />
      </Head>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
}
