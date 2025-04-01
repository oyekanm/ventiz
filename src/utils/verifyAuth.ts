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
    token:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm90aWZpY2F0aW9uUHJlZmVyZW5jZXMiOnsiZW1haWwiOnRydWUsIm1hcmtldGluZyI6dHJ1ZSwicHVzaCI6dHJ1ZSwic21zIjp0cnVlfSwiYWRtaW5Ob3RpZmljYXRpb25QcmVmZXJlbmNlcyI6eyJnZW5lcmFsIjp7InR5cGVzIjp7ImVtYWlsIjp0cnVlLCJwdXNoIjp0cnVlLCJzbXMiOnRydWV9LCJlbmFibGVOb3RpZmljYXRpb25zIjp0cnVlfSwidGlja2V0QW5kRXZlbnQiOnsiZXZlbnRDcmVhdGlvbiI6dHJ1ZSwiZXZlbnRSZW1pbmRlciI6dHJ1ZSwicmVmdW5kRGlzcHV0ZSI6dHJ1ZSwidGlja2V0UHVyY2hhc2UiOnRydWV9LCJhZG1pbkFuZFZlbmRvciI6eyJsb3dUaWNrZXRXYXJuaW5nIjp0cnVlLCJuZXdFdmVudENyZWF0aW9uIjp0cnVlLCJuZXdWZW5kb3JBcHBsaWNhdGlvbkFwcHJvdmFsIjp0cnVlLCJwYXltZW50UHJvY2Vzc2luZyI6dHJ1ZSwicmVmdW5kUmVxdWVzdEFsZXJ0Ijp0cnVlLCJ0aWNrZXRTYWxlc1VwZGF0ZSI6dHJ1ZX0sImZyZXF1ZW5jeSI6WyJkYWlseSJdfSwiX2lkIjoiNjdjODU5YzljNzlmNGE4N2ZhYjE5MDMyIiwiZW1haWwiOiJhZGlzYS5hZGVvbHVAZ21haWwuY29tIiwic3Vic2NyaWJlIjp0cnVlLCJpc1ZlcmlmaWVkIjp0cnVlLCJpc09uYm9hcmQiOnRydWUsIm1mYSI6ZmFsc2UsImZ1bGxOYW1lIjoiQWRpc2EgYWRlb2x1IiwidXJsIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD9kPW1wIiwicGhvbmUiOiIrNDQxMjM0NTY3ODkwIiwic3RhdHVzIjoiYXBwcm92ZWQiLCJyb2xlIjpbInN1cGVyQWRtaW4iXSwiY2F0ZWdvcmllcyI6W10sImluZHVzdHJ5IjpbXSwiY3JlYXRlZEF0IjoiMjAyNS0wMy0wNVQxNDowMzo1My43OTlaIiwidXBkYXRlZEF0IjoiMjAyNS0wMy0yOVQxNzoyNjowMy4wNjNaIiwiX192IjoyLCJsYXN0TG9naW4iOiIyMDI1LTAzLTI5VDE3OjI2OjAzLjA2MFoiLCJpYXQiOjE3NDMyNjkxNjR9.h_1bgHyNieZOJrmNDC1GHR0e5q-3Aug-S8aJWPe9BAs`,
    id:'67c859c9c79f4a87fab19032',
  };
};
