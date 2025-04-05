"use client"

import { EmptyContainer, Loader, Pagination } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { BrowseAllBooking } from '@/services/eventService';
import React, { useState } from 'react'
import useSWR from 'swr';

interface Props {
    allBookings:Bookings[]
}

export default function TicketSalesComponent({allBookings}:Props) {
    // const { data: allBookings = [] } = useSWR('all-bookings', BrowseAllBooking, { 
    //     suspense: true, 
    //     refreshInterval: 30000,
    //     fallbackData:[]
    //    });
    const groupedTickets = allBookings.reduce((acc: any, ticket) => {
        const { eventId, ticketType, price, event, creator } = ticket;
        const key = `${eventId}-${ticketType}`;

        if (!acc[key]) {
            acc[key] = { 
                eventId,
                ticketType,
                totalTicketsSold: 0,
                totalRevenue: 0,
                event,
                creator,
                key
            };
        }

        acc[key].totalTicketsSold += 1;
        acc[key].totalRevenue += price;

        return acc;
    }, {});
    const groupedTicketsArray = Object.values(groupedTickets);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10
    const totalPages = Math.ceil(groupedTicketsArray.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    console.log(groupedTickets)
    return (
        <div className='flex flex-col gap-4'>
            <p className='sm-text !font-semibold'>Ticket Sales</p>
            {allBookings.length  === 0 && <EmptyContainer text='We do not have any booking at the Moment' />}

            {allBookings.length > 0 && groupedTicketsArray.length > 0 && (
            <div className="bg-white rounded-lg border mb-8">
                <table className="w-full">
                    <thead>
                        <tr className="border-b h-[4.4rem]  ">
                            <th className="th">Event Title & Host</th>
                            <th className="th">Ticket Type</th>
                            <th className="th">Tickets Sold</th>
                            <th className="th">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedTicketsArray.slice(indexOfFirstItem, indexOfLastItem).map((booking: any) => (
                            <tr key={booking.key} className="border-b h-[7.2rem]">
                                <td className="td">
                                    <div className="flex items-center gap-3">
                                        <img src={booking.event?.url && booking.event?.url[0].link} alt={booking?.event.name} className='h-12 w-[6.4rem]' />
                                        <div>
                                            <p className="xs-text-medium">{booking?.event?.name}</p>
                                            <p className="td !p-0">{booking?.creator?.businessName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="td">{booking.ticketType}</td>
                                <td className="td">{booking.totalTicketsSold}</td>
                                <td className="td">£{booking.totalRevenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            )}
        </div>
    )
}
