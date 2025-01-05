import qs from "qs";

// *** 將 request 的 query string 轉換成物件 ***
export function getQueryStringObject(request) {
  const searchParams = request.nextUrl.searchParams;
  return qs.parse(searchParams.toString());
}



// *** 將 JSON Body 轉換成物件 ***
export async function getJsonBody(request) {
  const body = await request.json();
  return body;
}

// *** 將 Urlencoded Body 轉換成物件 ***
export async function getUrlencodedBody(request) {
  const bodyStr = await request.text();
  return qs.parse(bodyStr);
}

// *** 將 Form Body 轉換成物件 ***
export async function getFormBody(request) {
  const formData = await request.formData();
  const usp = new URLSearchParams(formData);
  return qs.parse(usp.toString());
}

// **************** 取得主體內容物件 ****************
export async function getBody(request) {
  const cType = request.headers.get("Content-Type");

  if (cType) {
    if (cType.indexOf("application/json") >= 0) {
      return await getJsonBody(request);
    } else if (cType.indexOf("application/x-www-form-urlencoded") >= 0) {
      return await getUrlencodedBody(request);
    } else if (cType.indexOf("multipart/form-data") >= 0) {
      return await getFormBody(request);
    }
  }
  return null;
}