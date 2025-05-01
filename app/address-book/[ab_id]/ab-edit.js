"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AB_GET_ONE, AB_ITEM_PUT } from "@/config/api-path";
import useSWR from "swr";
import styles from "@/app/address-book/address-book.module.css";

const noErrors = {
  name: "",
  email: "",
  birthday: "",
};
export default function ABEdit() {
  const [myForm, setMyForm] = useState({
    ab_id: 0,
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });
  const [myFormErrors, setMyFormErrors] = useState({ ...noErrors });
  const params = useParams();

  const router = useRouter();
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, isLoading, error, mutate } = useSWR(
    `${AB_GET_ONE}/${params.ab_id}`,
    fetcher,
    { use: [] } // 避免全域快取
  );
  useEffect(() => {
    if (myForm.ab_id !== 0) return;
    if (data) {
      if (data.success) {
        delete data.data.created_at; // 去掉屬性
        setMyForm(data.data);
      } else {
        router.push("/address-book"); // 回列表頁
      }
    }
  }, [data, router, myForm.ab_id]);

  const onChange = (e) => {
    const t = e.currentTarget;
    const obj = { ...myForm, [t.name]: t.value };
    // console.log(obj);
    setMyForm(obj);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // TODO: 欄位檢查

    fetch(`${AB_ITEM_PUT}/${params.ab_id}`, {
      method: "PUT",
      body: JSON.stringify(myForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          alert("修改成功");
          router.back();
        } else {
          if (obj.errors?.length) {
            const newErrors = { ...noErrors };
            obj.errors?.forEach((v) => {
              const fieldName = v.path[0];
              if (newErrors[fieldName] == "") {
                newErrors[fieldName] = v.message;
              }
            });
            setMyFormErrors(newErrors);
          } else {
            alert("資料沒有修改");
          }
        }
      });
  };
  console.log("edit page", myForm);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">編輯通訊錄</h5>
              <form name="form1" onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="ab_id" className="form-label">
                    編號
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ab_id"
                    value={myForm.ab_id}
                    disabled
                  />
                </div>

                <div
                  className={`mb-3 ${
                    myFormErrors.name ? styles.errorFieldGroup : ""
                  }`}
                >
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
                  <div className="form-text">{myFormErrors.name}</div>
                </div>
                <div
                  className={`mb-3 ${
                    myFormErrors.email ? styles.errorFieldGroup : ""
                  }`}
                >
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
                  <div className="form-text">{myFormErrors.email}</div>
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
                <div
                  className={`mb-3 ${
                    myFormErrors.birthday ? styles.errorFieldGroup : ""
                  }`}
                >
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
                  <div className="form-text">{myFormErrors.birthday}</div>
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
                  修改
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
