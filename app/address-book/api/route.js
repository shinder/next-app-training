import db from "@/utils/connect-mysql";
import { getQueryFromRequest } from "@/utils/get-qs-from-request";
import moment from "moment";

const fmDate = "YYYY-MM-DD";

/* ******* 取得列表資料的函式 ******* */
const getListData = async (req) => {

  let page = 1; // 預設值
  const query = getQueryFromRequest(req);
  if (query.page && +query.page > 0) {
    page = +query.page;
  }
  if (page < 1) {
    return { redirect: `?page=1` };
  }

  const perPage = 25; // 每頁最多有幾筆

  const member_id = req.my_jwt?.id || 0; // 授權的用戶
  console.log("授權的用戶: ", member_id, new Date());

  let where = " WHERE 1 "; // SQL 條件的開頭

  // 關鍵字的查詢
  const keyword = query.keyword || "";
  if (keyword) {
    const keyword_ = db.escape(`%${keyword}%`); // SQL 的跳脫, 同時會用單引號包起來
    where += ` AND ( ab.\`name\` LIKE ${keyword_} OR ab.mobile LIKE ${keyword_} ) `;
  }

  // 生日的篩選
  const birth_begin = query.birth_begin
    ? moment(query.birth_begin)
    : null;
  const birth_end = query.birth_end ? moment(query.birth_end) : null;

  if (birth_begin && birth_begin.isValid()) {
    where += ` AND ab.birthday >= '${birth_begin.format(fmDate)}' `;
  }
  if (birth_end && birth_end.isValid()) {
    where += ` AND ab.birthday <= '${birth_end.format(fmDate)}' `;
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM address_book ab ${where} `;
  // 多層的解構
  const [[{ totalRows }]] = await db.query(t_sql);
  const totalPages = Math.ceil(totalRows / perPage);

  let rows = [];
  if (totalRows) {
    if (page > totalPages) {
      return { redirect: `?page=${totalPages}` };
    }
    const sql = `SELECT ab.*, li.like_id
      FROM address_book ab
      LEFT JOIN (
        SELECT * FROM ab_likes WHERE member_id=${member_id}
      ) li ON ab.ab_id=li.ab_id
      ${where}
      ORDER BY ab.ab_id DESC 
      LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sql);
    for (let r of rows) {
      // 直接用 moment 做轉換, 空值就不做傳換
      if (r.birthday) {
        r.birthday2 = moment(r.birthday).format(fmDate);
      }
    }
  }
  return { perPage, page, totalRows, totalPages, rows };
};

// *** 取得列表資料
export const GET = async (request, { params }) => {
  // console.log("---", request.constructor.name, "---"); // NextRequest
  // console.log(request);
  const obj = await getListData(request);
  return new Response(JSON.stringify(obj));
};
