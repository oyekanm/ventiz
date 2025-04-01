import instance from "./api-instance";
const client = instance

export async function BrowseAllNotifications() {
    try {
      const res = await client.get("notification?type=all-notifications");
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}

export async function MarkAllNotificationRead() {
    try {
      const res = await client.put(`notification?type=mark-all-read`);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      console.log(res.data)
      return  res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
export async function MarkNotificationRead(id:string) {
    try {
      const res = await client.put(`notification?types=mark-read&id=${id}`);
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      console.log(res.data)
      return  res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}