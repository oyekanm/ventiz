"use client"
import { FunctionalButton, Loader, Pagination, SummaryInfoColum } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { formatRelativeTime } from '@/utils/dateFormatter';
import { CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import NotificationCardContainer from './notificationCardContainer';
import useSWR, { mutate } from 'swr';
import { BrowseAllNotifications, MarkAllNotificationRead } from '@/services/notificationService';
import useToast from '@/hooks/useToast';

export default function NotificationContainer() {
    const toast = useToast()
    const {initialData} = useAppContext()
    const { data: notification = [] } = useSWR('all-notification', BrowseAllNotifications, {
        // suspense: true,
        fallbackData:initialData.notifications,
        refreshInterval: 5000,
    });
    // const [notification, setNotification] = useState<notifications[]>(initialData.notifications)
    const [marking, setMarking] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10
    const totalPages = Math.ceil(notification.length / itemsPerPage);

    const [eventLoading, setEventLoading] = useState(false)
  
//     useEffect(() => {
//       const fetchEvents = async () => {
//           try {
//               setEventLoading(true)
//               const notif = await BrowseAllNotifications();
//               //   console.log(data)
//               setNotification(notif)
//               setEventLoading(false)
//           } catch (error) {
//               console.error("Error fetching events:", error);
//               setEventLoading(false)
//           }
//       };
  
//       fetchEvents();
//   }, []);
  console.log(notification)
    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const markAllRead = async () => {
        setMarking(true)
        try {
            const response = await MarkAllNotificationRead()
            console.log(response)
            if (response.message === "success") {
                mutate('all-notification')
                setMarking(false)
                toast({
                    status: 'success',
                    text: 'Marked all as Read',
                    duration: 3000
                });
            }
        } catch (error) {
            setMarking(false)
            console.log(error)
        }
    }

    const initiator = async () => {
        toast({
            status: 'warning',
            text: "Are you sure you want to mark all notifications as read?",
            duration: 30000,
            clickText: "Yes, mark all",
            click: markAllRead
        });
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-8" >
                <div>
                    <p className="md-text">Recent notifications and activity</p>
                    <p className="sm-text">Stay updated with real-time events and user actions</p>
                </div>
                <div className="flex items-center justify-between mt-8">

                    <div className="flex items-center gap-4">
                        <FunctionalButton click={initiator} disable={marking || notification.filter((nt: any) => !nt.read).length === 0} Icon={CheckCheck} text={marking ? "Sending..." : ' Mark all as read'} txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    </div>
                </div>
            </div>
            {/* {eventLoading && <Loader/>} */}
            {
            // !eventLoading &&  
            notification.length > 0 && (
                <>
                    <NotificationCardContainer item={[...notification].reverse().slice(indexOfFirstItem, indexOfLastItem)} />
                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}
