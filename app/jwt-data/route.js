import { NextResponse } from "next/server";
import { getJwtData } from "@/utils/my-parsers";

export async function GET(request, { params }) {
  const jwtData = getJwtData(request);
  return NextResponse.json(jwtData);
}
