"use client"
import { SummaryInfoColum } from '@/components/reuseable'
import { formatRelativeTime } from '@/utils/dateFormatter'
import React, { useState } from 'react'
import ReadNotification from './readNotification'
import { File, FileArchive, FileBox, FileCheck, FileCheck2, FileCheckIcon, FileCog, Notebook, Ticket, UserCheck, UserCheck2, UserCog, UserPen } from 'lucide-react'

interface Props {
  item: notifications[]
}

export default function NotificationCardContainer({ item }: Props) {
  const [open, setOpen] = useState(false)
  const [noti, setNoti] = useState<any>()

  const openModal = () => {
    // console.log(noti)
    setOpen(!open)
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  const setPayload = (noti: any) => {
    setNoti(noti)
    openModal()
  }


  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'user registration':
        return <UserCheck2 size={20} />;
      case 'user verification':
        return <UserPen size={20} />;
      //   case 'password reset':
      //     return 'bg-green-50 text-green-700';
      //   case 'Reset Password':
      //     return 'bg-green-50 text-green-700';
      case 'user onboard':
        return <UserCog size={20} />;
      case 'profile update':
        return <UserCog size={20} />;
      case 'event creation':
        return <Ticket size={20} />;
      case 'ticket update':
        return <FileCheck2 size={20} />;
      case 'book ticket':
        return <File size={20} />;
      case 'transfer ticket':
        return <FileCog size={20} />;
      // case 'event update':
      //   return 'bg-green-50 text-green-700';
      // case 'payout creation':
      //   return 'bg-green-50 text-green-700';
      // case 'payout update':
      //   return 'bg-green-50 text-green-700';
      default:
        return <Notebook />;
    }
  };

  return (
    <div className="space-y-4">
      {open && <ReadNotification close={() => openModal()} notification={noti} />}
      {item.map(notification => {
        const date = formatRelativeTime(notification.createdAt).split(" ").filter(i => i !== "about").join(" ")
        // console.log(date,formatRelativeTime(notification.createdAt).split(" ") )
        return (
          <div key={notification._id} className="bg-white cursor-pointer rounded-lg border">
            <SummaryInfoColum active={notification.read} popUp={()=>setPayload(notification)} description={notification?.message?.push?.body || ""} title={notification?.message?.push?.title}
              other={date} >
              <div className="w-16 h-16 bg-[#CECDE966] rounded-full flex items-center justify-center text-xl">
                {/* {'📝'} */}
                {getNotificationIcon(notification.type)}
              </div>
            </SummaryInfoColum>
          </div>
        )
      })}
    </div>
  )
}
