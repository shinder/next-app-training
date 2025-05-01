// contexts/auth-context.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { JWT_LOGIN_POST } from "@/config/api-path";

const AuthContext = createContext();
/*
1. 登入
2. 登出
3. 取得登入者的資料
4. 取得已登入者的 token (或直接拿到 Authorization headers)
5. 是否已從 localStorage 取得登入狀態資料 (authInitialized)
*/
// 預設的狀態, 沒有登入
const emptyAuth = {
  id: 0,
  email: "",
  nickname: "",
  token: "",
};
const storageKey = "shinder-auth";

export function AuthContextProvider({ children }) {
  const [authInitialized, setAuthInitialized] = useState(false);
  const [auth, setAuth] = useState({ ...emptyAuth });

  // 登出的功能
  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth({ ...emptyAuth });
  };
  // 登入的功能
  const login = async (email, password) => {
    try {
      const r = await fetch(JWT_LOGIN_POST, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await r.json();
      if (result.success) {
        // 把取得的用戶資料和 token 記錄在 localStorage
        localStorage.setItem(storageKey, JSON.stringify(result.data));
        setAuth(result.data);
        return true;
      }
    } catch (ex) {}
    return false;
  };

  const getAuthHeader = () => {
    if (auth.token) {
      return { Authorization: "Bearer " + auth.token };
    }
    return {};
  };

  useEffect(() => {
    const str = localStorage.getItem(storageKey);
    try {
      const data = JSON.parse(str);
      if (data) {
        setAuth(data);
      }
    } catch (ex) {}
    setAuthInitialized(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, logout, login, getAuthHeader, authInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
