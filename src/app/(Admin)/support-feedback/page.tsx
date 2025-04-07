"use client"

import { EmptyContainer, Loader, SectionBlock, SummaryInfoColum } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { ChatTable } from '@/features/support/components';
import { useWebSocket } from '@/hooks/useWebsocket';
import { BrowseAllSupport } from '@/services/supportService';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface messages {
  sender: string,
  message: string,

}

type socket = {
  messages: messages[],
  sendMessage: (message: any) => void
}

const Support = () => {
  const {initialData} = useAppContext()
  const { data: supports = [] } = useSWR('all-supports', BrowseAllSupport, { 
    refreshInterval: 2000,
    fallbackData:[]
   });
   const { messages, sendMessage }: socket = useWebSocket(
    `wss://vw8hufljm4.execute-api.eu-north-1.amazonaws.com/dev`,
    // user.token
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VmZjg2NjE5NzkxMjEwNmVhODc1NTAiLCJlbWFpbCI6ImVuaXRhbmJvbHV3YXRpZmU1QGdtYWlsLmNvbSIsInN1YnNjcmliZSI6dHJ1ZSwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNPbmJvYXJkIjp0cnVlLCJtZmEiOmZhbHNlLCJmdWxsTmFtZSI6ImVuaXRhbiBib2x1d2F0aWZlIiwidXJsIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD9kPW1wIiwicGhvbmUiOiIrNDQ1OTg2NTk0MzQ1Iiwic3RhdHVzIjoiYXBwcm92ZWQiLCJyb2xlIjpbInN1cGVyQWRtaW4iXSwiY3JlYXRlZEF0IjoiMjAyNS0wNC0wNFQxNToxOTowMi4wMjdaIiwidXBkYXRlZEF0IjoiMjAyNS0wNC0wNFQxNTozMjowOS4xMzVaIiwiYnVzaW5lc3NOYW1lIjoiM3ZlbnRpeiBBZG1pbiIsIl9fdiI6MCwibGFzdExvZ2luIjoiMjAyNS0wNC0wNFQxNTozMjowOS4xMzBaIiwiaWF0IjoxNzQzNzgwNzI5fQ.xoN2cN29OlEDyXBPxnLqbnxhZXfVUY2DtBSbU0Jo39o`
);
  const [eventLoading, setEventLoading] = useState(false)

  // console.log(initialData.supports)
  // const [supports, setSupports] = useState<dispute[]>([])

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       setEventLoading(true)

  //       const support: any = await BrowseAllSupport();
  //       //   console.log(data)
  //       setSupports(support)
  //       setEventLoading(false)
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //       setEventLoading(false)
  //     }
  //   };

  //   fetchEvents();
  // }, []);
  const pending = supports?.filter(item => item.status === "pending")
  const resolved = supports?.filter(item => item.status === "resolved")
  const open = supports?.filter(item => item.status === "open")

 

  const overview = [
    { title: 'Total open tickets', value: open.length, url: "/open-tickets" },
    { title: 'Resolved tickets', value: resolved.length, url: "/resolved-tickets" },
    { title: 'Pending refunds', value: pending.length, url: "/pending-refunds" },
  ];


  return (
    <div className="grid gap-8">
      <div>
        <p className="md-text">Support & Feedback</p>
        <p className="sm-text">Resolve disputes, process refunds, and assist users efficiently</p>
      </div>

      <SectionBlock title="Ticket Overview" noXt>
        <div className="flex items-center gap-4">
          {overview.map((info, index) => {
            return <OverviewCard key={index} {...info} />
          })}
        </div>
      </SectionBlock>
      {eventLoading && <Loader />}
      <SectionBlock title="Tickets list" noXt>
        {!eventLoading && supports.length > 0 && (
          <ChatTable supports={supports} />
        )}
        {supports.length === 0 && <EmptyContainer text='There are no requests from users yet.' />}
      </SectionBlock>

      {/* <SectionBlock title="Support Chat" noXt>
        <div className="bg-white rounded-[1.2rem] border border-[#E4E7EC]">
          {chatMessages.map(message => (
            <SummaryInfoColum key={message.id} description={message.message} title={message.user} btn={() => console.log("clicked")} other="Reply" />
          ))}
        </div>
      </SectionBlock> */}

      {/* Pagination */}
      {/* <div className="flex justify-between items-center mt-6">
        <FunctionalButton Icon={ArrowLeft} text='Previous' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <span
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded ${page === 1 ? 'bg-gray-100' : ''
                }`}
            >
              {page}
            </span>
          ))}
        </div>
        <FunctionalButton Icon={ArrowRight} order={2} text='Next' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
      </div> */}
    </div>
  );
};

export default Support;

const OverviewCard = ({ title, value, url }: {
  title: string,
  value: number,
  url: string
}) => {
  return (
    <div className="border border-[#E4E7EC] w-full max-w-[22rem] flex flex-col justify-between  h-[12rem] radius-md p-5 px-6" >
      <div className="flex justify-between items-center mb-2">
        <h3 className="xs-text-medium">{title}</h3>
        <Link href={`/support-feedback${url}`} ><ArrowRight className="w-5 h-5 text-[#667085]" /></Link>
      </div>
      <p className="text-[3rem] leading-[3.8rem] font-semibold text-[#101828]">{value}</p>
    </div>
  )
}