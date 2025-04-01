// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      // Add any other user properties
    };
    accessToken: string;
  }
  
  interface User {
    id: string;
    email: string;
    token: string;
    // Add any other user properties
  }
}