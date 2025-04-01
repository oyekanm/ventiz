import instance from "./api-instance";

interface info {
  email:string,
  password:string
}

const client = instance

export async function AdminLogin(user:info) {
    try {
      const res = await client.post("auth/login",user);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return await res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}