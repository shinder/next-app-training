import ABEdit from "./ab-edit";
import db from "@/utils/connect-mysql";

// 這個和元件是分開來的，資料無法共享
export async function generateMetadata({ params, searchParams }) {
  const ab_id = (await params).ab_id;
  if (!ab_id) return {};
  const sql = "SELECT * FROM address_book WHERE ab_id=?";
  const [rows] = await db.query(sql, [ab_id]);
  if (!rows.length) return {};
  const item = rows[0];
  return {
    title: `[ ${item.name} | ${item.ab_id} ] 編輯 - 小新的網站`,
  };
}

export default async function ABEditPage({ params }) {
  return <ABEdit />;
}
