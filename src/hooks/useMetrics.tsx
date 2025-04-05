// import { useEffect, useState } from "react";

// // Custom hook to calculate metrics based on time range
// export function useMetrics(eventsData:EventData[], ticketsData:Bookings[], usersData:User[]) {
//     // const [timeRange, setTimeRange] = useState('7days'); // Default to 7 days
//     const [timeRange, setTimeRange] = useState('All time'); // Default to 7 days
//     const [metrics, setMetrics] = useState({
//       revenue: { value: 0, percentChange: 0 },
//       totalEvents: { value: 0, percentChange: 0 },
//       totalHosts: { value: 0, percentChange: 0 },
//       totalTickets: { value: 0, percentChange: 0 }
//     });
  
//     useEffect(() => {
//       if (!eventsData || !ticketsData || usersData) return;
  
//       // Calculate metrics based on selected time range
//       const calculateMetrics = () => {
//         const now = new Date();
//         let startDate = new Date();
//         let previousStartDate = new Date();
  
//         // Set the date range based on selection
//         switch (timeRange) {
//           case '24hours':
//             startDate.setHours(now.getHours() - 24);
//             previousStartDate.setHours(startDate.getHours() - 24);
//             break;
//           case '7days':
//             startDate.setDate(now.getDate() - 7);
//             previousStartDate.setDate(startDate.getDate() - 7);
//             break;
//           case '30days':
//             startDate.setDate(now.getDate() - 30);
//             previousStartDate.setDate(startDate.getDate() - 30);
//             break;
//           case 'alltime':
//             startDate = "" as any; // No filter for all time
//             previousStartDate = "" as any;
//             break;
//         }
  
//         // Filter events by date range
//         const filteredEvents = startDate
//           ? eventsData.filter(event => new Date(event.tickets[0].createdAt) >= startDate)
//           : eventsData;
  
//         // Filter for previous period (for percent change)
//         const previousEvents = previousStartDate
//           ? eventsData.filter(event =>
//             new Date(event.tickets[0].createdAt) >= previousStartDate &&
//             new Date(event.tickets[0].createdAt) < startDate)
//           : [];
  
//         // Filter tickets by date range
//         const filteredTickets = startDate
//           ? ticketsData.filter(ticket => new Date(ticket.purchaseDate) >= startDate)
//           : ticketsData;
  
//         const previousTickets = previousStartDate
//           ? ticketsData.filter(ticket =>
//             new Date(ticket.purchaseDate) >= previousStartDate &&
//             new Date(ticket.purchaseDate) < startDate)
//           : [];
//           const reduced = events.map(evt=>evt.creatorId)

//           console.log(new Set(reduced))
//         // Filter hosts by date range
//         const filteredHosts = startDate
//           ? usersData.filter(user =>
//             user.role. 'creator' &&
//             new Date(user.registrationDate) >= startDate)
//           : usersData.filter(user => user.role === 'creator');
  
//         const previousHosts = previousStartDate
//           ? usersData.filter(user =>
//             user.role === 'creator' &&
//             new Date(user.registrationDate) >= previousStartDate &&
//             new Date(user.registrationDate) < startDate)
//           : [];
  
//         // Calculate revenue
//         const currentRevenue = filteredTickets.reduce((sum, ticket) => sum + ticket.price, 0);
//         const previousRevenue = previousTickets.reduce((sum, ticket) => sum + ticket.price, 0);
  
//         // Calculate percentage changes
//         const calculatePercentChange = (current, previous) => {
//           if (previous === 0) return current > 0 ? 100 : 0;
//           return ((current - previous) / previous) * 100;
//         };
  
//         setMetrics({
//           revenue: {
//             value: currentRevenue,
//             percentChange: calculatePercentChange(currentRevenue, previousRevenue)
//           },
//           totalEvents: {
//             value: filteredEvents.length,
//             percentChange: calculatePercentChange(filteredEvents.length, previousEvents.length)
//           },
//           totalHosts: {
//             value: filteredHosts.length,
//             percentChange: calculatePercentChange(filteredHosts.length, previousHosts.length)
//           },
//           totalTickets: {
//             value: filteredTickets.length,
//             percentChange: calculatePercentChange(filteredTickets.length, previousTickets.length)
//           }
//         });
//       };
  
//       calculateMetrics();
//     }, [timeRange, eventsData, ticketsData, usersData]);
  
//     return {
//       metrics,
//       timeRange,
//       setTimeRange
//     };
//   }