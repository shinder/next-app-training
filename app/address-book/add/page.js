"use client";
import React, { useState } from "react";
import { AB_ADD_POST } from "@/config/api-path";
import { useRouter } from "next/navigation";

export default function ABAddPage() {
  const router = useRouter();
  const [myForm, setMyForm] = useState({
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });

  const onChange = (e) => {
    const t = e.currentTarget;
    const obj = { ...myForm, [t.name]: t.value };
    console.log(obj);

    setMyForm(obj);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // TODO: 欄位檢查

    fetch(AB_ADD_POST, {
      method: "POST",
      body: JSON.stringify(myForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          alert("新增成功");
          router.push(`/address-book`); // 跳頁
        }
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">新增通訊錄</h5>
              <form name="form1" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={myForm.name}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={myForm.email}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    mobile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={myForm.mobile}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="birthday" className="form-label">
                    birthday
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    value={myForm.birthday}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={myForm.address}
                    onChange={onChange}
                  ></textarea>
                  <div className="form-text"></div>
                </div>

                <button type="submit" className="btn btn-primary">
                  新增
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
