import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AB_GET_ONE, AB_ITEM_PUT } from "@/config/api-path";
import Layout1 from "@/components/layouts/layout1";

export default function ABEdit() {
  const [myForm, setMyForm] = useState({
    ab_id: 0,
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const ab_id = +router.query.ab_id; // 轉換成數值
    if (!ab_id) {
      router.push("/address-book"); // 回列表頁
    }
    fetch(`${AB_GET_ONE}/${ab_id}`)
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          delete obj.data.created_at; // 去掉屬性
          setMyForm(obj.data);
        } else {
          router.push("/address-book"); // 回列表頁
        }
      });
  }, [router]);

  const onChange = (e) => {
    const t = e.currentTarget;
    const obj = { ...myForm, [t.name]: t.value };
    console.log(obj);

    setMyForm(obj);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // TODO: 欄位檢查

    fetch(`${AB_ITEM_PUT}/${router.query.ab_id}`, {
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
        }
      });
  };
  return (
    <Layout1>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">編輯通訊錄</h5>
              <form name="form1" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    編號
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={myForm.ab_id}
                    disabled
                  />
                </div>

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
                  修改
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  );
}
