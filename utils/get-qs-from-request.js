// 從 request 把 query string 轉換成 URLSearchParams 物件
export function getSearchParamsFromRequest(req) {
  const url = req.url || null;
  if (!url) return null;
  const qs = url.split("?")[1];
  if (!qs) return null;
  return new URLSearchParams(qs);
}

// 從 request 取得 query 物件
export function getQueryFromRequest(req) {
  const searchParams = getSearchParamsFromRequest(req);
  const query = {};
  for (let [k, v] of searchParams.entries()) {
    query[k] = v;
  }
  return query;
}
