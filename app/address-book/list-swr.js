"use client";

import { AB_LIST, AB_DEL_DELETE, AB_LIKE } from "@/config/api-path";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import ABTableLoggedIn from "./table-logged-in";
import ABTableNoLoggedIn from "./table-no-logged-in";
import useSWR from "swr";

export default function ABListSWR() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetcher = (url) =>
    fetch(url, { headers: { ...getAuthHeader() } }).then((r) => r.json());
  const {
    data: listData,
    isLoading,
    error,
  } = useSWR(
    `${AB_LIST}?${searchParams.toString()}`,
    fetcher,
  );

  const { auth, getAuthHeader } = useAuth();
  // 取得 URL 中的 query string

  const deleteItem = async (ab_id) => {
    try {
      const r = await fetch(`${AB_DEL_DELETE}/${ab_id}`, {
        method: "DELETE",
      });
      const result = await r.json();
      if (result.success) {
        const usp = new URLSearchParams(searchParams.toString());
        usp.set("remove", ab_id);
  
        // 變更 URL 的 query string, 以觸發 SWR 重新載入資料
        router.push("?" + usp.toString()); 
      }
    } catch (ex) {}
  };

  const toggleLike = async (ab_id) => {
    const r = await fetch(`${AB_LIKE}/${ab_id}`, {
      headers: { ...getAuthHeader() },
    });
    const result = await r.json();

    if (result.success) {
      const usp = new URLSearchParams(searchParams.toString());
      usp.set("ab_id", ab_id);
      usp.set("action", result.action);

      // 變更 URL 的 query string, 以觸發 SWR 重新載入資料
      router.push("?" + usp.toString()); 
    }
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="keyword"
              defaultValue={searchParams.get("keyword") || ""}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      {!listData.rows?.length ? (
        <div className="row">
          <div className="col">
            <h3>沒有找到資料</h3>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {Array(11)
                    .fill(1)
                    .map((v, i) => {
                      let p = listData.page - 5 + i;
                      if (p < 1 || p > listData.totalPages) return null;
                      if (listData.page == p) {
                        return (
                          <li className="page-item active" key={p}>
                            <span className="page-link">{p}</span>
                          </li>
                        );
                      }
                      const usp = new URLSearchParams(searchParams.toString());
                      usp.set("page", p);
                      if (!searchParams.get("keyword")) usp.delete("keyword");
                      return (
                        <li className="page-item" key={p}>
                          <Link
                            className="page-link"
                            href={"?" + usp.toString()}
                          >
                            {p}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {auth.id ? (
                <ABTableLoggedIn
                  rows={listData.rows}
                  deleteItem={deleteItem}
                  toggleLike={toggleLike}
                  keyword={searchParams.get("keyword") || ""}
                />
              ) : (
                <ABTableNoLoggedIn rows={listData.rows} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
