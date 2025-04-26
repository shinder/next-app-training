// app/address-book/page.js
import ABList from "./list";
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }) {
  const page = (await searchParams).page || 1;
  return {
    title: `第 ${page} 頁通訊錄 - 小新的網站`,
  };
}

export default function ABListPage() {
  console.log("ABListPage");
  
  return (
    <Suspense fallback={<div>loading</div>}>
      <ABList />
    </Suspense>
  );
}
