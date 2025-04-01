"use client"
import { useEffect, useMemo, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FunctionalButton, Loader, MetricsCard } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { TicketSalesComponent } from '@/features/ticket-sales/components';
import { BrowseAllBooking, BrowseAllEvents } from '@/services/eventService';
import { BrowseAllSupport } from '@/services/supportService';
import { Calendar } from 'lucide-react';
import useSWR from 'swr';

const TicketSales = () => {
  const { initialData } = useAppContext()


  // const { data: allBookings = [] } = useSWR('all-bookings', BrowseAllBooking, { 
  //   suspense: true, 
  //   // refreshInterval: 60000,
  //   fallbackData:initialData.bookings
  //  });
  //  const { data: events = [] } = useSWR('all-events', BrowseAllEvents, { 
  //   suspense: true,
  //   fallbackData:initialData.events
  //  });
  //  const { data: supports = [] } = useSWR('all-supports', BrowseAllSupport, { 
  //   suspense: true, 
  //   // refreshInterval: 60000,
  //   fallbackData:initialData.supports
  //  });

  const [loading, setLoading] = useState(false)
  const [allBookings, setAllBookings] = useState<Bookings[]>([])
  const [supports, setSupports] = useState<dispute[]>([])
  const [events, setEvents] = useState<EventData[]>([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const bookings = await BrowseAllBooking();
        //   console.log(data)
        setAllBookings(bookings)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false)
      }
    };

    fetchEvents();
  }, []);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await BrowseAllEvents();
        //   console.log(data)
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const support: any = await BrowseAllSupport();
        //   console.log(data)
        setSupports(support)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const pending = supports?.filter(item => item.status === "pending")
  const revenue = useMemo(() => {
    return allBookings?.reduce((num, item) => {
      return num + item.price
    }, 0)
  }, [allBookings])
  const salesData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 4200 },
    { month: 'Mar', revenue: 4500 },
    { month: 'Apr', revenue: 4800 },
    { month: 'May', revenue: 5000 },
    { month: 'Jun', revenue: 5200 },
    { month: 'Jul', revenue: 5400 },
    { month: 'Aug', revenue: 5600 },
    { month: 'Sep', revenue: 5800 },
    { month: 'Oct', revenue: 6000 },
    { month: 'Nov', revenue: 6100 },
    { month: 'Dec', revenue: 6201 }
  ];

  const recentTransactions = [
    {
      type: 'Ticket purchases',
      description: '64 new ticket purchases on Africa Techfest 2025',
      timestamp: '59s ago'
    }
    // Add more transactions as needed
  ];

  const metrics = [
    { label: 'Total tickets sold', value: allBookings.length, change: 7.4, period: '7 days' },
    { label: 'Revenue generated', value: `£${revenue}`, change: 7.4, period: '7 days' },
    { label: 'Active events', value: events.length, change: 7.4, period: '7 days' },
    { label: 'Pending funding requests', value: pending.length, change: 7.4, period: '7 days' },
  ];
  const revenueData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    revenue: 4000 + Math.random() * 2000
  }));

  // console.log(allBookings)


  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="md-text">Ticket & Sales</h2>
          <p className="sm-text">Track ticket sales, revenue, and event performance in real-time</p>
        </div>
        <FunctionalButton Icon={Calendar} text='Jan 12, 2024 - Jan 18, 2024' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>
      {/* <div className="bg-white p-6 rounded-lg border mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button className="text-gray-900 font-medium">Revenue generated (from ticket fees)</button>
            <button className="text-indigo-600">Change</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Jan 07, 2025</span>
            <span className="font-medium">$6,201</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}
      {loading && <Loader />}
      {!loading && allBookings.length > 0 && (
        <TicketSalesComponent allBookings={allBookings} />)}

      {/* <RecentTransactions /> */}

    </div>
  )
}

export default TicketSales