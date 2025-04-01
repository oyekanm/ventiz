import instance from "./api-instance";

const client = instance

export async function BrowseAllEvents():Promise<EventData[]> {
    try {
      const res = await client.get("events?type=all-events");
      // console.log(res)
      if (res.statusText !== 'OK') {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
export async function BrowseAllBooking():Promise<Bookings[]> {
    try {
      const res = await client.get("events?type=all-bookings");
      if (res.statusText !== 'OK') {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
export async function GetSingleEvent(id:string) {
  try {
    const res = await client.get(`events?types=get-event&id=${id}`);
    if (res.statusText !== 'OK') {
      throw new Error("Failed to fetch data");
    }
    console.log(id,res)
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // throw error;
      return error
    }
}
export async function GetSingleEventAttendies(id:string){
    try {
       
      const res = await client.get(`events?types=attendees&id=${id}`);
      if (res.statusText !== 'OK') {
        throw new Error("Failed to fetch data");
      }
      return  res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
export async function EditEvent(id:string, userId:string, eventData:any):Promise<any> {
  try {
    const res = await client.patch(`events?id=${id}&userId=${userId}`,eventData);
    console.log(res)
    if (res.statusText !== 'OK') {
      throw new Error("Failed to fetch data");
    }
    return  res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}