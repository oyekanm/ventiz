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
export async function CreateCard(card: any) {
  try {
    const res = await client.post("support", card);
    if (!res.status) {
      throw new Error("Failed to fetch data");
    }
    console.log(res);
    return await res.data;
  } catch (error:any) {
    console.error("Error fetching data:", error);
    return {error:error.response.data.error}
  }
}
export async function UpdateCardDetail(
  card: any,
  userId: string
) {
  try {
    const res = await client.patch(
      `support?type=update-payout&ids=${userId}`,
      card
    );
    console.log(card, res);
    if (!res.status) {
      throw new Error("Failed to fetch data");
    }
    console.log(res);
    return await res.data;
  } catch (error:any) {
    console.error("Error fetching data:", error.response.data);
    return {error:error.response.data.error}
  }
}
export async function DeleteUserCard(id: string): Promise<any> {
  try {
    const res = await client.get(`support?types=delete-payout&ids=${id}`);
    console.log(res)
    if (!res.status) {
      throw new Error("Failed to fetch data");
    }
    return res.data.data;
  } catch (error:any) {
    console.error("Error fetching data:", error);
    return {error:error.response.data.error}
  }
}
export async function GetUserCard(id: string): Promise<any> {
  try {
    const res = await client.get(`support?types=get-payout&ids=${id}`);
    console.log(res)
    if (!res.status) {
      throw new Error("Failed to fetch data");
    }
    return res.data.data;
  } catch (error:any) {
    console.error("Error fetching data:", error);
    return {error:error.response.data.error}
  }
}