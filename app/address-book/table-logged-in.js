"use client";

import Link from "next/link";

import {
  FaRegTrashCan,
  FaRegPenToSquare,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import FavHeart from "./fav-heart";

export default function ABTableLoggedIn({
  rows = [],
  deleteItem = (ab_id) => {},
  toggleLike = (ab_id) => {},
  keyword = "",
}) {
  return (
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
        {rows.map((v, i) => {
          return (
            <tr key={i}>
              <td>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // 避免刷新頁面
                    deleteItem(v.ab_id); // 呼叫刪除項目的函式
                  }}
                >
                  <FaRegTrashCan />
                </a>
              </td>
              <td>{v.ab_id}</td>

              <td
                dangerouslySetInnerHTML={{
                  __html: v.name
                    .split(keyword)
                    .join(`<b style="color:red">${keyword}</b>`),
                }}
              ></td>

              <td>{v.email}</td>
              <td
                dangerouslySetInnerHTML={{
                  __html: v.mobile
                    .split(keyword)
                    .join(`<b style="color:red">${keyword}</b>`),
                }}
              ></td>
              <td>{v.birthday2}</td>
              <td>{v.address}</td>
              <td>
                <Link href={"/address-book/" + v.ab_id}>
                  <FaRegPenToSquare />
                </Link>
              </td>
              <td>
                <FavHeart
                  color="purple"
                  checked={!!v.like_id}
                  onClick={(e) => {
                    toggleLike(v.ab_id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
