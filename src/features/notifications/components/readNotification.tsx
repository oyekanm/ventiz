"use client"
import { FunctionalButton } from '@/components/reuseable'
import useToast from '@/hooks/useToast'
import { MarkNotificationRead } from '@/services/notificationService'
import { formatDateWithAMPM, formatDateWithGMT, formatRelativeTime } from '@/utils/dateFormatter'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { mutate } from 'swr'

interface NotificationProps {
    close: any,
    notification: notifications
}



export default function ReadNotification({ close, notification }: NotificationProps) {
    const toast = useToast();
    const [marking, setMarking] = useState(false)

    const markRead = async () => {
        setMarking(true)
        try {
            const response = await MarkNotificationRead(notification?._id)
            // console.log(response)
            if (response.message === "success") {
                mutate('all-notification')
                close()
                setMarking(false)
                toast({
                    status: 'success',
                    text: 'Marked as Read',
                    duration: 3000
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed bg-[rgb(255, 255, 255)7] z-[10000] flex justify-center items-center backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[46rem] flex flex-col h-[30rem] w-full mx-auto  bg-white rounded-lg shadow">
                <div className="flex justify-between items-center border-b p-4">
                    <p className="xs-text-medium">NOTIFICATION DETAILS</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X className='!size-8' />
                    </button>
                </div>
                <div className='h-[85%] overflow-auto p-[1.2rem] px-[1.6rem]'>
                    <div className='flex flex-col gap-4'>
                        <p className='support-showing' >{notification?.message?.push.title}</p>
                        {/* <p className='xs-text'>{notification.message?.push?.body?notification.message.push?.body: notification?.message as any}</p> */}
                        <p className='xs-text'>{notification?.message?.push.body}</p>
                        <p className='xs-text'>{formatDateWithGMT(notification.createdAt)}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 border-t p-4 ">
                    <FunctionalButton click={close} noIcn text='Cancel' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    <FunctionalButton disable={notification.read || marking} click={markRead} noIcn text={marking? "Sending..." : "Mark as read"} />
                    {/* {marking && <FunctionalButton disable={true}  noIcn text={ "Sending..."} />} */}
                </div>
            </div>
        </div >
    )
}
