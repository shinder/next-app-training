// app/address-book/page.js
import ABList from "./list";

export async function generateMetadata({ params, searchParams }) {
  const page = searchParams.page;
  return {
    title: `第 ${page} 頁通訊錄 - 小新的網站`,
  };
}

export default function ABListPage() {
  return (
    <>
      <ABList />
    </>
  );
}
