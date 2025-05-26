# 測試專案

## NextAuth@5 使用 google 時發生 `redirect_uri_mismatch` 錯誤

在使用 **NextAuth.js v5** 時，若在登入 Google 時出現 `redirect_uri_mismatch` 錯誤，通常是由於 **Google OAuth 未正確配置回調地址（Redirect URI）** 所導致。以下是解決該問題的完整步驟：

---

### ✅ 1. 檢查 Google Cloud Console 配置

#### 步驟 1：訪問 Google Cloud Console
- 打開 [Google Cloud Console](https://console.cloud.google.com/)
- 選擇已建立的專案（或建立新專案）

#### 步驟 2：配置 OAuth 客戶端 ID
1. 進入 **API 與服務 → 憑證**
2. 點擊 **建立憑證 → OAuth 客戶端 ID**
   - **應用類型**：選擇 **Web 應用程式**
3. 設定 **授權重導 URI（Authorized redirect URIs）**
   - **開發環境（本機）**：
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - **生產環境（如 Vercel/Netlify）**：
     ```
     https://your-app.vercel.app/api/auth/callback/google
     ```
   - **多個環境**：可同時加入多個 URI（如本機和生產）
4. 儲存設定後，取得 **Client ID** 和 **Client Secret**

---

### ✅ 2. 更新 `.env` 環境變數

在專案根目錄的 `.env` 檔案中加入以下環境變數：

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000  # 本機開發環境
```

- **生產環境**：將 `NEXTAUTH_URL` 替換為你的部署網址（如 `https://your-app.vercel.app`）

---

### ✅ 3. 檢查 NextAuth.js 設定

確保 `auth.ts`（或 `pages/api/auth/[...nextauth].ts`）中正確配置了 Google 提供者：

```ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      // 可自定義登入邏輯
      return true;
    },
  },
});
```

---

### ✅ 4. 驗證環境變數載入

- 確保 `.env` 檔案位於專案根目錄，且未被 `.gitignore` 忽略。
- 在開發環境中，`.env` 檔案的變數會自動載入到 `process.env`。
- 在生產環境中，需透過部署平台（如 Vercel、Netlify）手動加入環境變數。

---

### ✅ 5. 確保 HTTPS（生產環境）

Google 要求回調地址必須使用 **HTTPS**，因此：
- **本機開發**：可臨時使用 `http://localhost:3000`
- **生產部署**：必須使用 HTTPS（如 `https://your-app.vercel.app`）
  - 如果使用自簽憑證或本機測試 HTTPS，可使用 [ngrok](https://ngrok.com/) 產生 HTTPS 隧道。

---

### ✅ 6. 清除瀏覽器快取

Google 會快取 OAuth 重導設定，建議：
- 使用 **無痕模式** 測試登入流程
- 或清除瀏覽器快取後重試

---

### ✅ 7. 常見錯誤排查

| 問題 | 解決方案 |
|------|----------|
| `redirect_uri_mismatch` | 檢查 Google Cloud Console 中的授權 URI 是否與 `NEXTAUTH_URL` 一致 |
| `Invalid client` | 檢查 `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET` 是否正確 |
| 本機開發失敗 | 確保 `.env` 中 `NEXTAUTH_URL` 設為 `http://localhost:3000` |
| 多環境部署 | 為每個環境（開發/生產）單獨設定 `NEXTAUTH_URL` 和 Google 授權 URI |

---

### ✅ 8. 示例：完整 `.env` 設定

```env
# Google OAuth
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth 配置
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000
```


