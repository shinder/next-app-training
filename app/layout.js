import Navbar from "@/components/layouts/navbar";
import { AuthContextProvider } from "@/contexts/auth-context";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        <html lang="zh">
          <head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            />
          </head>
          <body>
            <Navbar />
            <div className="container">{children}</div>
            <script
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
              defer
            ></script>
          </body>
        </html>
      </AuthContextProvider>
    </SessionProvider>
  );
}
