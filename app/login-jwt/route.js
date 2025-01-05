import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "@/utils/connect-mysql";
import { getBody } from "@/utils/my-parsers";
import { responseJson } from "@/utils/my-responses";

export async function POST(request, { params }) {
  const body = await getBody(request);

  const output = {
    success: false,
    code: 0,
    error: "",
    bodyData: body,
    data: {}, // 傳給用戶端, 存到 localStorage
  };
  let { email, password } = body;

  email = email ? email.trim() : "";
  password = password ? password.trim() : "";
  // 0. 兩者, 若有一個沒有值就結束
  if (!email || !password) {
    output.error = "欄位資料不足";
    return responseJson(output);
  }

  // 1. 先確定帳號是不是對的
  const sql = `SELECT * FROM members WHERE email=?`;
  const [rows] = await db.query(sql, [email]);
  if (!rows.length) {
    // 帳號是錯的
    output.code = 400;
    output.error = "帳號或密碼錯誤";
    return responseJson(output);
  }
  const row = rows[0];
  // 2. 確定密碼是不是對的

  const result = await bcrypt.compare(password, row.password_hash);
  if (!result) {
    // 密碼是錯的
    output.code = 450;
    output.error = "帳號或密碼錯誤";
    return responseJson(output);
  }

  // 帳號密碼都是對的，打包 JWT
  const payload = {
    id: row.member_id,
    email,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY);
  output.data = {
    id: row.member_id,
    email,
    nickname: row.nickname,
    token,
  };

  output.success = true;
  return responseJson(output);
}
