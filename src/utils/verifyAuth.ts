// utils/auth-actions.ts
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authOptions } from "./authOptions";

type AuthResponse =
  //   | { success: true; token: string; userId: string }
  | { success: true; token: string; id: string }
  | { success: false; error: string; status: number };

//   TODO: test without cookie
export const verifyAuth = async (): Promise<AuthResponse> => {
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   console.log(session);
  //   return {
  //     success: true,
  //     token: `Bearer ${session.accessToken}`,
  //     id: session.user.id,
  //   };
  // }
  // const cookieStore = cookies();
  // const user = JSON.parse(cookieStore.get("user")?.value || "{}");
  // console.log(user);
  // // if (user) {
  // //   return {
  // //     success: true,
  // //     token: `Bearer ${user.token}`,
  // //     id: user._id,
  // //   };
  // // }
  // if (!session || !user) {
  //   return {
  //     success: false,
  //     error: "Unauthorized - No token provided",
  //     status: 401,
  //   };
  // }


 
  // return {
  //   success: true,
  //   token: `Bearer ${user.token}`,
  //   id: user._id,
  // };

  // console.log(session)
  // No token found

  // Optional: Verify token validity (JWT, etc.)
  // const isValid = verifyJWT(token); // Your verification logic
  // if (!isValid) return { success: false, error: 'Invalid token', status: 403 };

  // return {
  //   success: true,
  //   token: `Bearer ${session.accessToken}`,
  //   id: session.user.id,
  // };

  
  return {
    success: true,
    token:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VmZjg2NjE5NzkxMjEwNmVhODc1NTAiLCJlbWFpbCI6ImVuaXRhbmJvbHV3YXRpZmU1QGdtYWlsLmNvbSIsInN1YnNjcmliZSI6dHJ1ZSwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNPbmJvYXJkIjp0cnVlLCJtZmEiOmZhbHNlLCJmdWxsTmFtZSI6ImVuaXRhbiBib2x1d2F0aWZlIiwidXJsIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD9kPW1wIiwicGhvbmUiOiIrNDQ1OTg2NTk0MzQ1Iiwic3RhdHVzIjoiYXBwcm92ZWQiLCJyb2xlIjpbInN1cGVyQWRtaW4iXSwiY3JlYXRlZEF0IjoiMjAyNS0wNC0wNFQxNToxOTowMi4wMjdaIiwidXBkYXRlZEF0IjoiMjAyNS0wNC0wNFQxNTozMjowOS4xMzVaIiwiYnVzaW5lc3NOYW1lIjoiM3ZlbnRpeiBBZG1pbiIsIl9fdiI6MCwibGFzdExvZ2luIjoiMjAyNS0wNC0wNFQxNTozMjowOS4xMzBaIiwiaWF0IjoxNzQzNzgwNzI5fQ.xoN2cN29OlEDyXBPxnLqbnxhZXfVUY2DtBSbU0Jo39o`,
    id:'67eff866197912106ea87550',
  };
};
