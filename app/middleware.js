// export { auth as middleware } from "@/auth"

import { auth } from "@/auth";

export default auth((req) => {
  console.log("Middleware invoked for request:", req.url);
  // req.auth
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
