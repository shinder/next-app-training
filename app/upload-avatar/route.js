// ****** Node 20.12 可以正常運作
// ****** Node 22.12, 20.18 會出錯
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { imgTypesMapping } from "@/utils/my-schemas";
import { v4 } from "uuid";

const uploadsDir = `${process.cwd()}/public/uploads`;

export async function POST(req) {
  const output = {
    success: false,
    message: "No file uploaded",
    file: "",
  };


  const formData = await req.formData();
  const f = formData.getAll("avatar")[0];

  if (!f || !(f instanceof File)) {
    return NextResponse.json(output);
  }
  // console.log(`File name: ${f.name}`);
  // console.log(`Content-Length: ${f.size}`);

  const ext = imgTypesMapping[f.type];
  // return NextResponse.json({...output, ext});
  if (!ext) {
    output.message = "Invalid file type";
    return NextResponse.json(output);
  }
  const newFileName = `${v4()}${ext}`;
  const fileArrayBuffer = await f.arrayBuffer();
  try {
    await fs.writeFile(
      `${uploadsDir}/${newFileName}`,
      Buffer.from(fileArrayBuffer)
    );
    output.success = true;
    output.message = "File uploaded";
    output.file = newFileName;
  } catch (ex) {
    output.message = ex.message;
  }
  return NextResponse.json(output);
}
