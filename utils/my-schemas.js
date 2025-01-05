import { z } from "zod";

export const fmDate = "YYYY-MM-DD"; // 日期的格式

export const mySchema = z.object({
  name: z
    .string({ message: "姓名欄為必填" })
    .min(3, { message: "長度要三個字以上" }),
  email: z.string().email({ message: "請填寫正確的電郵格式" }),
  birthday: z
    .string()
    .date("生日的日期格式為: YYYY-MM-DD")
    .optional() // 選擇性的欄位
    .or(z.literal("")), // 值可以是空字串
});

export const imgTypesMapping = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};
