// app/address-book/page.js
"use client";
import { useEffect, useState } from "react";
import { AB_LIST, AB_DEL_DELETE, AB_LIKE } from "@/config/api-path";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaRegTrashCan,
  FaRegPenToSquare,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import { useAuth } from "@/contexts/auth-context";

export default function ABListPage() {
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

  const delItem = async (ab_id) => {
    console.log({ ab_id });
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
        if (item.ab_id === ab_id) {
          const like_id = result.action === "add" ? result.like_id : null;
          return { ...item, like_id };
        } else {
          return { ...item };
        }
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
        console.log("obj: ", obj);
        // api 回應的資料中，success 為 true 時，才更新 state
        if (obj.success) {
          setListData(obj);
        } else if (obj.redirect) {
          router.push(obj.redirect);
        }
      })
      .catch(console.warn); // 用戶取消時會發生 exception
    return () => controller.abort(); // 取消未完成的 ajax
  }, [searchParams, refresh, getAuthHeader, router]);
  console.log(listData); // render 時就會執行

  return (
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
                  const addActive =
                    searchParams.get("page") == p ? "active" : "";
                  return (
                    <li className={`page-item ${addActive}`} key={p}>
                      <Link className="page-link" href={`?page=${p}`}>
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
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>
                  <FaRegTrashCan />
                </th>
                <th>#</th>
                <th>姓名</th>
                <th>電郵</th>
                <th>手機</th>
                <th>生日</th>
                <th>地址</th>
                <th>
                  <FaRegPenToSquare />
                </th>
                <th>
                  <FaRegHeart />
                </th>
              </tr>
            </thead>
            <tbody>
              {listData.rows?.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // 避免刷新頁面
                          delItem(v.ab_id); // 呼叫刪除項目的函式
                        }}
                      >
                        <FaRegTrashCan />
                      </a>
                    </td>
                    <td>{v.ab_id}</td>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.mobile}</td>
                    <td>{v.birthday2}</td>
                    <td>{v.address}</td>
                    <td>
                      <Link href={"/address-book/" + v.ab_id}>
                        <FaRegPenToSquare />
                      </Link>
                    </td>
                    <td>
                      {v.like_id} {` `}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleLike(v.ab_id);
                        }}
                      >
                        {v.like_id ? <FaHeart /> : <FaRegHeart />}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
