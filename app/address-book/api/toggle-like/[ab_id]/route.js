import db from "@/utils/connect-mysql";
import { getJwtData } from "@/utils/my-parsers";
import { responseJson } from "@/utils/my-responses";

export const GET = async (request, { params }) => {
  const jwtData = getJwtData(request);
  const output = {
    success: false,
    action: "", // add, remove
    like_id: 0,
    error: "",
    code: 0,
  };
  if (!jwtData?.id) {
    // 沒有授權
    output.code = 430;
    output.error = "沒有授權";
    return responseJson(output);
  }
  const member_id = jwtData.id; // 從 JWT 來的

  // 先確認有沒有這個項目
  const sql1 = "SELECT ab_id FROM address_book WHERE ab_id=? ";
  const [rows1] = await db.query(sql1, [params.ab_id]);
  if (!rows1.length) {
    output.code = 401;
    output.error = "沒有這個朋友";
    return responseJson(output);
  }

  const sql2 = "SELECT * FROM `ab_likes` WHERE `member_id`=? AND `ab_id`=?";
  const [rows2] = await db.query(sql2, [member_id, params.ab_id]);
  if (rows2.length) {
    // 如果已經有這個項目, 就移除
    const sql3 = ` DELETE FROM ab_likes WHERE like_id=${rows2[0].like_id} `;
    const [result] = await db.query(sql3);
    if (result.affectedRows) {
      output.success = true;
      output.action = "remove";
    } else {
      output.code = 410;
      output.error = "無法移除";
    }
  } else {
    // 如果沒有這個項目, 就加入
    const sql4 = "INSERT INTO `ab_likes` (`member_id`, `ab_id`) VALUES (?, ?)";
    const [result] = await db.query(sql4, [member_id, params.ab_id]);
    if (result.affectedRows) {
      output.success = true;
      output.action = "add";
      output.like_id = result.insertId;
    } else {
      output.code = 420;
      output.error = "無法加入";
    }
  }
  return responseJson(output);
};
