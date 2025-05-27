"use client";
import { useState, useEffect } from "react";
import { AB_ADD_POST } from "@/config/api-path";
import { useRouter } from "next/navigation";
import styles from "@/app/address-book/address-book.module.css";
import { useAuth } from "@/contexts/auth-context";
import MyAnimatePresence2 from "@/components/layouts/my-animate-presence2";

const noErrors = {
  name: "",
  email: "",
  birthday: "",
};

export default function ABAddPage() {
  const { auth, authInitialized } = useAuth();
  const router = useRouter();
  const [myForm, setMyForm] = useState({
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });
  const [myFormErrors, setMyFormErrors] = useState({ ...noErrors });

  const onChange = (e) => {
    const t = e.currentTarget;
    const obj = { ...myForm, [t.name]: t.value };
    // console.log(obj);
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
        } else {
          const newErrors = { ...noErrors };
          obj.errors?.forEach((v) => {
            const fieldName = v.path[0];
            if (newErrors[fieldName] == "") {
              newErrors[fieldName] = v.message;
            }
          });
          setMyFormErrors(newErrors);
        }
      });
  };

  useEffect(() => {
    if (authInitialized && !auth.id) {
      // 如果沒有登入, 不能拜訪這個頁面
      router.push(`/address-book/quick-login?back=/address-book/add`);
    }
  }, [auth, authInitialized, router]);

  return (
    <MyAnimatePresence2>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">新增通訊錄</h5>
              <form name="form1" onSubmit={onSubmit} noValidate>
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
                    電郵
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
                    手機
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={myForm.mobile}
                    onChange={onChange}
                  />
                </div>
                <div
                  className={`mb-3 ${
                    myFormErrors.birthday ? styles.errorFieldGroup : ""
                  }`}
                >
                  <label htmlFor="birthday" className="form-label">
                    生日
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
                    地址
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={myForm.address}
                    onChange={onChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  新增
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MyAnimatePresence2>
  );
}
