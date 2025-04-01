import instance from "./api-instance";

const client = instance
// /get-sessions 
// ?end=all-events
// get-sessions

export async function BrowseAllUsers(){
    try {
      const res = await client.get("admin");
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
export async function GetUserBooking(id:string):Promise<any> {
    try {
      const res = await client.get(`admin?types=user-bookings?ids=${id}`);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
export async function DisableUsers(id:string):Promise<any> {
    try {
      const res = await client.get(`admin?types=disable-account?ids=${id}`);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
export async function RemoveUserSession(id:string):Promise<any> {
    try {
      const res = await client.get(`admin?types=remove-session?ids=${id}`);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
export async function GetSingleUser():Promise<any> {
    try {
      const res = await client.get(`admin?id=true`);
      // const res = await client.get(`admin?id=${id}`);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}

export async function CreateAdmin(admin:Partial<User>) {
    try {
      const res = await client.post("admin",admin);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      console.log(res)
      return await res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
export async function UpdateAdminUserDetail(admin:Partial<User>,userId:string) {
    try {
      const res = await client.patch(`admin?type=update-user?ids=${userId}`,admin);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      console.log(res)
      return await res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
export async function UpdateUserNotification(admin:any,userId:string) {
    try {
      const res = await client.patch(`admin?type=update-user-notification?ids=${userId}`,admin);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      console.log(res)
      return await res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}