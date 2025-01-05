import db from "@/utils/connect-mysql";
import { responseJson } from "@/utils/my-parsers";
import moment from "moment";

// *** 取得列表資料
export const GET = async (request, { params }) => {
  const output = { success: false, data: null, error: "" };

  const ab_id = +params.ab_id;
  output.error = "不正確的 ab_id";
  if (!ab_id) return responseJson(output); // 沒 ab_id 就離開

  const sql = `SELECT * FROM address_book WHERE ab_id=${ab_id}`;
  const [rows] = await db.query(sql);
  if (!rows.length) {
    output.error = "沒有該筆資料";
    return responseJson(output);
  }
  let birthday = moment(rows[0].birthday);
  birthday = birthday.isValid() ? birthday.format(fmDate) : "";
  output.success = true;
  output.data = { ...rows[0], birthday};
  return responseJson(output);
};

// *** 取得列表資料
export const PUT = async (request, { params }) => {
  // console.log("---", request.constructor.name, "---"); // NextRequest
  // console.log(request);
  const obj = await getListData(request);
  const success = !obj.redirect;
  return responseJson({});
};
