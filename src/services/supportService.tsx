import instance from "./api-instance";
const client = instance

export async function BrowseAllSupport():Promise<any[]> {
    try {
      const res = await client.get("support?type=get-refund-requests");
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
export async function BrowseLatestTransactions():Promise<any[]> {
    try {
      const res = await client.get("support?type=get-transactions");
      if (!res.status) {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}