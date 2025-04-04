"use client"

import { FunctionalButton, MetricsCard, SectionBlock, TimeFilter } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { EventCard, EventCreateForm } from '@/features/events/components';
import { NotificationCardContainer } from '@/features/notifications/components';
import useToast from '@/hooks/useToast';
import { BrowseAllBooking, BrowseAllEvents } from '@/services/eventService';
import { BrowseAllNotifications } from '@/services/notificationService';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export default function DashboardHome() {
  const {initialData} = useAppContext()
  const { data: notification = [] } = useSWR('all-notification', BrowseAllNotifications, {
    // suspense: true,
    // refreshInterval: 60000
    fallbackData:initialData.notifications
  });
  const { data: allBookings = [] } = useSWR('all-bookings', BrowseAllBooking, {
    // suspense: true,
    // refreshInterval: 60000
    fallbackData:initialData.bookings
  });
  
  const { data: events = [] } = useSWR('all-events', BrowseAllEvents, { 
    // suspense: true,
    fallbackData: initialData.events
   });
  
  const revenue = useMemo(() => {
    return allBookings?.reduce((num, item) => {
      return num + item.price
    }, 0)
  }, [allBookings])

  const route = useRouter()
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(!open)
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  const metrics = [
    { label: 'Revenue generated', value: `£${revenue}`, change: 7.4, period: '7 days' },
    { label: 'Total number of events', value: events.length, change: 7.4, period: '7 days' },
    { label: 'Total number of event hosts', value: '218', change: 7.4, period: '7 days' },
    { label: 'Total tickets sold', value: allBookings.length, change: 7.4, period: '7 days' },
  ];

  const timeFilters = ['All time', '30 days', '7 days', '24 hours'];

  return (
    <div className="relative grid gap-8">
      {open && <EventCreateForm close={() => openModal()} />}
      <div>
        <p className="md-text">Overview</p>
        <p className="sm-text">Get a quick snapshot of key metrics</p>
        <div className="flex items-center justify-between mt-8">
          {/* Time filters */}
         <TimeFilter />
          <div className="flex items-center gap-4">
            {/* <FunctionalButton click={callToast} noIcn text='Manage events' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' /> */}
            <FunctionalButton click={() => route.push("/events")} noIcn text='Manage events' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
            <FunctionalButton click={openModal} />
          </div>
        </div>
      </div>


      {/* Metrics grid */}
      <SectionBlock title="Metrics Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricsCard key={index} {...metric} />
          ))}
        </div>
      </SectionBlock>

      {/* New Events*/}
      <SectionBlock title="Newly created events" link='/events' >
        {events.length > 0 && (
          <div className="grid grid-cols-3 gap-6">
            {events.slice(0, 3).map(event => (
              <EventCard key={event._id} {...event} />
            ))}
          </div>)}
      </SectionBlock>

      {/* Recent Activity */}
      <SectionBlock title="Recent activity" link='/notifications'>
        {notification.length > 0 && (
          <NotificationCardContainer item={notification.slice(0, 7)} />
        )}
      </SectionBlock>
    </div>
  );
}
