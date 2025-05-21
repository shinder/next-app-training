"use client";
import { useEffect, useState } from "react";
import { AB_LIST, AB_DEL_DELETE, AB_LIKE } from "@/config/api-path";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import ABTableLoggedIn from "./table-logged-in";
import ABTableNoLoggedIn from "./table-no-logged-in";

export default function ABList() {
  const [refresh, setRefresh] = useState(false); // 為了刪除項目時觸發 re-render
  const router = useRouter();
  const { auth, getAuthHeader } = useAuth();
  // 取得 URL 中的 query string
  const searchParams = useSearchParams();
  // 存放載入進來的資料的狀態
  const [listData, setListData] = useState({
    totalPages: 0,
    totalRows: 0,
    page: 0,
    rows: [],
  });

  const deleteItem = async (ab_id) => {
    try {
      const r = await fetch(`${AB_DEL_DELETE}/${ab_id}`, {
        method: "DELETE",
      });
      const result = await r.json();
      if (result.success) {
        setRefresh((v) => !v); // 變更狀態，重新載入資料
      }
    } catch (ex) {}
  };

  const toggleLike = async (ab_id) => {
    const r = await fetch(`${AB_LIKE}/${ab_id}`, {
      headers: { ...getAuthHeader() },
    });
    const result = await r.json();

    if (result.success) {
      const newListData = { ...listData };
      newListData.rows = listData.rows.map((item) => {
        let like_id = item.like_id;
        if (item.ab_id === ab_id) {
          like_id = result.action === "add";
        }
        return { ...item, like_id };
      });
      setListData(newListData);
    }
  };

  useEffect(() => {
    const controller = new AbortController(); // 用來取消的控制器
    const signal = controller.signal;
    fetch(`${AB_LIST}${location.search}`, {
      headers: { ...getAuthHeader() },
      signal,
    })
      .then((r) => r.json())
      .then((obj) => {
        // api 回應的資料中，success 為 true 時，才更新 state
        if (obj.success) {
          setListData(obj);
        } else if (obj.redirect) {
          router.push(obj.redirect);
        }
      })
      .catch(console.warn); // 用戶取消時會發生 Exception
    return () => controller.abort(); // 取消未完成的 AJAX 請求
  }, [searchParams, refresh, getAuthHeader, router]);

  // console.log("ABList:", listData); // render 時就會執行

  return (
    <>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <form className="d-flex" role="search" onSubmit={(e) => {
            e.preventDefault();
            const qs = new URLSearchParams(new FormData(e.target)).toString();
            router.push(`/address-book?${qs}`);
            }}>
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
