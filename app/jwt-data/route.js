import { responseJson } from "@/utils/my-responses";
import { getJwtData } from "@/utils/my-parsers";

export async function GET(request, { params }) {
  const jwtData = getJwtData(request);
  return responseJson(jwtData);
}
