import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Pagination } from '@/components/reuseable';

interface Props {
  events: EventData[],
  currentPage: number,
  totalPages: number,
  onPageChange: any,
}

const EventListing = ({ events, currentPage, onPageChange, totalPages }: Props) => {
  return (
    <div className=" bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b h-[4.4rem]  ">
            <th className="th w-1/2">Event Title & Host</th>
            <th className="th w-[22rem]">Event date & Time</th>
            <th className="th w-[20.9rem]">Event location</th>
            <th className="th"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="border-b h-[7.2rem]">
              <td className="td">
                <div className="flex items-center gap-3">
                  <img src={event.url[0].link} alt={event.name} className='h-12 w-[6.4rem]' />
                  <div>
                    <p className="xs-text-medium">{event.name}</p>
                    <p className="td !p-0">{event.creatorBusinessName}</p>
                  </div>
                </div>
              </td>
              <td className="td">{event.startTime}</td>
              <td className="td">{event.location.slice(0,100)}</td>
              <td className="td">
                <Link href={`/events/${event._id}`} className="text-blue-600 font-medium hover:underline">view</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

    </div>
  );
};

export default EventListing;