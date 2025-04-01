import axios from "axios";
// let user;

// if (typeof window !== undefined) {
//   user = JSON.parse(localStorage.getItem("user") || "");
// }

const isServer = typeof window === 'undefined';
const baseURL = isServer
  ? process.env.NEXT_PUBLIC_API_URL + "/api/" || 'http://localhost:3000'
  : '/api/';

const instance = axios.create({
  baseURL,
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    // Authorization: `Bearer ${user.token}`,
    "Content-Type": "application/json",
  },
});

export default instance;
