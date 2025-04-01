// app/api/auth/[...nextauth]/authOptions.ts
import { loginUser } from "@/_actions";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        const { email, password } = credentials;
        // Call your existing login API
        const info = {
          email,
          password,
        };
        console.log(info)
        const response = await loginUser(info);

        console.log(response);
       
        // if(response.message !== "success") return;

        const user = response.data;

        console.log(user.token,user._id);

        // if (!response.statusText || !user.token) {
        //   throw new Error(user.message || "Authentication failed");
        // }

        // Return user object with token
        return {
          id: user._id,
          email: credentials.email,
          token: user.token,
          // Include any other user data you need
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add auth token to the JWT when user first signs in
      console.log(token, user)
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
        console.log(session, token)
      // Add token to the session so it's available on the client
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.accessToken = token.accessToken as string;
      }
      console.log("Session callback returning:", session); 
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page path
    // error: '/auth/error', // Error page
  },
};
