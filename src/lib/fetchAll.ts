// lib/server-fetcher.ts
import instance from '@/services/api-instance';

export async function fetchAllData() {
  const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://ventiz.vercel.app'
  : 'http://localhost:3000';
  try {
    const [
      users,
      events,
      notifications,
      bookings,
      supports,
      transactions,
      user
    ] = await Promise.all([
      fetch(`${baseURL}/api/admin`).then(res => res.json()).then(data=> data.data),
      fetch(`${baseURL}/api/events?type=all-events`).then(res => res.json()).then(data=> data.data),
      fetch(`${baseURL}/api/notification?type=all-notifications`).then(res => res.json()).then(data=> data.data),
      fetch(`${baseURL}/api/events?type=all-bookings`).then(res => res.json()).then(data=> data.data),
      fetch(`${baseURL}/api/support?type=get-refund-requests`).then(res => res.json()).then(data=> data.data),
      fetch(`${baseURL}/api/support?type=get-transactions`).then(res => res.json()).then(data=> data.data),
      fetch(`${baseURL}/api/admin?id=true`).then(res => res.json()).then(data=> data.data),
    ]);

    return { 
      users,
      events,
      notifications,
      bookings,
      supports,
      transactions,
      user
    };
  } catch (error) {
    console.error('Failed to fetch app data:', error);
    // Return safe empty values
    return {
      users: [],
      events: [],
      notifications: [],
      bookings: [],
      supports: [],
      transactions: [],
      user: null
    };
  }
}