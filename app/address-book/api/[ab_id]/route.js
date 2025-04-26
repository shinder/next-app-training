import db from "@/utils/connect-mysql";
import { fmDate, mySchema } from "@/utils/my-schemas";
import moment from "moment";
import { getBody } from "@/utils/my-parsers";
import { NextResponse } from "next/server";

// *** 取得資料
export const GET = async (request, { params }) => {
  const output = { success: false, data: null, error: "" };
  const ab_id = parseInt((await params).ab_id);

  if (!ab_id) {
    output.error = "不正確的 ab_id";
    return NextResponse.json(output); // 沒 ab_id 就離開
  }

  const sql = `SELECT * FROM address_book WHERE ab_id=${ab_id}`;
  const [rows] = await db.query(sql);
  if (!rows.length) {
    output.error = "沒有該筆資料";
    return NextResponse.json(output);
  }
  let birthday = moment(rows[0].birthday);
  birthday = birthday.isValid() ? birthday.format(fmDate) : "";
  output.success = true;
  output.data = { ...rows[0], birthday };
  return NextResponse.json(output);
};

// *** 修改資料
export const PUT = async (request, { params }) => {
  const body = await getBody(request);
  const output = {
    success: false,
    bodyData: body,
    errors: [],
  };
  const { name, email, mobile, birthday, address } = body;
  const data = { name, email, mobile, birthday, address };

  const checkResult = mySchema.safeParse(data);
  if (!checkResult.success) {
    // 沒有通過資料檢查
    output.errors = checkResult.error.issues;
    return NextResponse.json(output);
  }

  // 處理生日沒有填寫的情況
  const m = moment(data.birthday);
  if (!m.isValid()) {
    data.birthday = null;
  }

  const sql = "UPDATE `address_book` SET ? WHERE ab_id=? ";
  try {
    const ab_id = (await params).ab_id;
    const [result] = await db.query(sql, [data, ab_id]);
    output.result = result;
    output.success = !!result.changedRows;
    // result.affectedRows: 條件找到的筆數
    // result.changedRows: 真正資料有變更的筆數
  } catch (ex) {
    output.ex = ex;
  }

  return NextResponse.json(output);
};

export const DELETE = async (request, { params }) => {
  const output = {
    success: false,
    result: {},
    params,
  };

  const sql = "DELETE FROM `address_book` WHERE ab_id=? ";
  try {
    const ab_id = (await params).ab_id;
    const [result] = await db.query(sql, [ab_id]);
    output.result = result;
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.ex = ex;
  }
  return NextResponse.json(output);
};
