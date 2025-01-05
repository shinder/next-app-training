
export const API_SERVER = `http://localhost:3001`;

// export const AB_LIST = `${API_SERVER}/address-book/api`;
export const AB_LIST = `/address-book/api`;

// 新增資料 POST
// export const AB_ADD_POST = `${API_SERVER}/address-book/api`;
export const AB_ADD_POST = `/address-book/api`;

// 刪除通訊錄項目 method: DELETE
// `${API_SERVER}/address-book/api/${ab_id}`
export const AB_DEL_DELETE = `${API_SERVER}/address-book/api`;

// 讀取單筆 /address-book/api/:ab_id
// export const AB_GET_ONE = `${API_SERVER}/address-book/api`;
export const AB_GET_ONE = `/address-book/api`;

// 修改單筆通訊錄項目 method: PUT
// `${API_SERVER}/address-book/api/${ab_id}`
// export const AB_ITEM_PUT = `${API_SERVER}/address-book/api`;
export const AB_ITEM_PUT = `/address-book/api`;

export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`;

export const AB_LIKE = `${API_SERVER}/address-book/api/toggle-like`;