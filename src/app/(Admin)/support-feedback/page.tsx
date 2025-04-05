"use client"

import { EmptyContainer, Loader, SectionBlock, SummaryInfoColum } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { ChatTable } from '@/features/support/components';
import { BrowseAllSupport } from '@/services/supportService';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const Support = () => {
  const {initialData} = useAppContext()
  const { data: supports = [] } = useSWR('all-supports', BrowseAllSupport, { 
    suspense: true, 
    // refreshInterval: 60000
    fallbackData:[]
   });
  const [eventLoading, setEventLoading] = useState(false)

  console.log(initialData.supports)
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

  const chatMessages = [
    {
      id: 1,
      user: 'John Doe',
      message: "Hi Admin, I'm having trouble accessing my account. Could you please assist? Thanks!",
      timestamp: '2 mins ago'
    },
    {
      id: 2,
      user: 'John Doe',
      message: "Hi Admin, I'm having trouble accessing my account. Could you please assist? Thanks!",
      timestamp: '2 mins ago'
    },
    {
      id: 13,
      user: 'John Doe',
      message: "Hi Admin, I'm having trouble accessing my account. Could you please assist? Thanks!",
      timestamp: '2 mins ago'
    },
    {
      id: 41,
      user: 'John Doe',
      message: "Hi Admin, I'm having trouble accessing my account. Could you please assist? Thanks!",
      timestamp: '2 mins ago'
    },
    {
      id: 61,
      user: 'John Doe',
      message: "Hi Admin, I'm having trouble accessing my account. Could you please assist? Thanks!",
      timestamp: '2 mins ago'
    },
    // Add more messages as needed
  ];

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