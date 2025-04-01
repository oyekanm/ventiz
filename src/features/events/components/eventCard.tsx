import { combineDateAndTime, formatDateWithGMT } from '@/utils/dateFormatter'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



export default function EventCard(event: EventData) {
  const newDate = combineDateAndTime(event.startDate, event.startTime)
  // console.log(formatDateWithGMT(event.startTime))
  console.log(event.eventType, event._id)

  return (
    <div className="">
      <Link href={`/events/${event._id}`} >
        <img
          src={event?.url[0]?.link}
          alt={event.name}
          className="w-full h-[32.2rem] aspect-video object-cover rounded-[1.2rem]"
        />
        {/* <Image
          src={event.url}
          alt={event.name}
          className="w-full h-[32.2rem] aspect-video object-cover rounded-[1.2rem]"
          width={200}
          height={200}
        /> */}
      </Link>
      <div className="p-4">
        <Link href={`/events/${event._id}`} >
          <p className="md-text !font-bold !text-black">{event.name}</p>
          <p className="xs-text">
            Hosted by <span className="text-[#221FCB] font-semibold">{event.creatorBusinessName || ""}</span>
          </p>
          <p className="xs-text">{event.location.slice(0,100)}</p>
          {/* <p className="xs-text">{event.startDate }</p>
          <p className="xs-text">{event.startTime }</p> */}
          <p className="xs-text">{formatDateWithGMT(newDate)}</p>
          {event.inviteOnly && (
            <span className="xs-text !text-[#221FCB] !font-medium">Free</span>
          )}
        </Link>
      </div>
    </div>
  )
}
