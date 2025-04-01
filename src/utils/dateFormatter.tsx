// utils/dateUtils.js
import { formatDistanceToNow } from "date-fns";


// export default function formatDate(date:Date) {
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }).format(date);
//   }

export function convert12to24(time12h:any) {
  const date = new Date(`1970-01-01 ${time12h}`);
  return date.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
}

export const combineDateAndTime = (dateString:any, timeString:any) => {
  const date = new Date(dateString);
  const [time, modifier] = timeString ? timeString?.split(" "): "08:00"
  let [hours, minutes] = time?.split(":");

  // console.log(timeString)

  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  return date;
};


// Format: "Mon, Jan 27; 10:00 GMT +1"
export const formatDateWithGMT = (date:any) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "shortOffset",
  }).format(new Date(date? date : "2025-03-26T13:24:54.596Z" ));
};

// Format: "Jan 13, 2024; 09:44AM"
export const formatDateWithAMPM = (date:any) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date? date : "2025-03-26T13:24:54.596Z"));
};

// Format: "59s ago"
export const formatRelativeTime = (date:any) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};