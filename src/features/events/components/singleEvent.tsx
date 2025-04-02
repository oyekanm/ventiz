"use client"

import React, { useEffect, useState } from 'react'
import { ArrowLeft, Bell, MapPin, Calendar, DollarSign, ChevronRight, X, ArrowRight } from 'lucide-react';
import { BrowseAllEvents, GetSingleEvent, GetSingleEventAttendies } from '@/services/eventService';
import Image from 'next/image';
import EventEditForm from './eventEdit';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Carousel, FunctionalButton, GoBack, Loader, SectionBlock } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { combineDateAndTime, convert12to24, formatDateWithAMPM, formatDateWithGMT, formatRelativeTime } from '@/utils/dateFormatter';
import EventCard from './eventCard';
import ViewAttendees from './viewAttendees';
import useSWR from 'swr';
import useToast from '@/hooks/useToast';

type Props = {
    eventDetail: string,
    // eventD: any,
    // attendee: any
}

export default function SingleEventDetail({ eventDetail }: Props) {
    const { initialData } = useAppContext()
    const route = useRouter()
    const toast = useToast()
    // const [events, setEvents] = useState<EventData[]>(initialData.events);
    // const [event, setEvent] = useState<EventData>(eventD);
    // const [attend, setAttend] = useState<Attendees[]>(attendee)
    const [eventLoading, setEventLoading] = useState(false)
    const { data: events = [] } = useSWR('all-events', BrowseAllEvents,
        {
            fallbackData: initialData.events
        });

    const { data: event, error, isLoading } = useSWR('single-event', () => GetSingleEvent(eventDetail),
        {
            refreshInterval: 5000,
            fallbackData: {}
        });
    const { data: attend } = useSWR('single-event-attendee', () => GetSingleEventAttendies(eventDetail), {
        fallbackData: [],
        refreshInterval: 30000,
    });
    console.log(isLoading, event)

    const [open, setOpen] = useState(false)
    const [viewAttendees, setViewAttendees] = useState(false)

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         console.log("first one")
    //         try {
    //             setEventLoading(true)
    //             const data = await BrowseAllEvents();
    //             setEvents(data);
    //             setEventLoading(false)
    //         } catch (error) {
    //             console.error("Error fetching events:", error);
    //             setEventLoading(false)
    //         }
    //     };

    //     fetchEvents();
    // }, []);
    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         console.log("first")
    //         try {
    //             const data = await GetSingleEvent(eventDetail);
    //             setEvent(data);
    //         } catch (error) {
    //             console.error("Error fetching events:", error);
    //             setEventLoading(false)
    //         }
    //     };

    //     fetchEvents();
    // }, []);
    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         try {
    //             const data = await GetSingleEventAttendies(eventDetail);
    //             setAttend(data);
    //         } catch (error) {
    //             console.error("Error fetching events:", error);
    //             setEventLoading(false)
    //         }
    //     };

    //     fetchEvents();
    // }, []);

    const openModal = () => {
        setOpen(!open)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }
    const viewModal = () => {
        setViewAttendees(!viewAttendees)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }
    // console.log(events.filter(evt => evt.eventType === event?.eventType), events)
    const activateDelete = async () => {
        try {
            const response = await axios.get(`/api/events?type=delete-event?eventId=${eventDetail}&creatorId=${event?.creatorId}`)
            console.log(response)
            if (response.data.message === "success") {
                toast({
                    status: 'success',
                    text: response.data.data.message,
                    duration: 3000,
                });
                route.push("/events")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteEvent = async () => {
        toast({
            status: 'warning',
            text: "Are you sure you want to delete this event listing?",
            duration: 30000,
            clickText: "Yes, delete",
            click: activateDelete
        });
    }

    // console.log(event === undefined)

    if (!event) {
        return (
            <div>
                <p>event is empty</p>
            </div>
        )
    };


    const newDate = event ? combineDateAndTime(event?.startDate, event?.startTime) : ""
    const format = event ? formatDateWithGMT(event?.startdate ? newDate : "2025-03-26T13:24:54.596Z").split(",") : ""
    // console.log(newDate,format,event.startTime,)

    // console.log(convert12to24(event.startTime), event.startTime)
    return (
        <div className="">

            {open && <EventEditForm close={() => openModal()} eventD={event!} />}
            {viewAttendees && <ViewAttendees close={viewModal} attendees={attend!} />}


            <GoBack />
            <div className='py-8'>
                {isLoading && <Loader />}
                {!isLoading && event && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Event poster */}
                        <div className='flex flex-col gap-4'>


                            <div className='w-full h-[32.2rem] overflow-hidden rounded-[1.2rem]'>
                                {event?.url && <Carousel slides={event?.url} />}
                            </div>
                            <div className="flex items-center gap-4">
                                <FunctionalButton click={deleteEvent} noIcn text='Delete event' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                                <FunctionalButton click={openModal} noIcn text='Edit event details' />
                            </div>

                        </div>

                        {/* Event details */}
                        <div className="md:col-span-2 flex flex-col gap-4">
                            <p className="md-text !font-bold">{event.name}</p>

                            {/* Info items */}
                            <div className="space-y-4 ">
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center radius-md bg-white size-[3.2rem] border border-[#E4E7EC] ">
                                        {/* <Calendar size={20} className="text-blue-500" /> */}
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_770_32584)">
                                                <path d="M3.92362 10.6522V12.2922L1.06274 10.6418V9L3.92362 10.6522Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.9791 13.8697C15.8782 13.1827 15.7008 12.4906 15.4452 11.7897C15.2121 11.1497 14.9147 10.5045 14.5512 9.85231C14.5043 9.76709 14.4556 9.68188 14.4069 9.59666C14.0087 8.9097 13.5808 8.28709 13.1217 7.72883C12.2991 6.72535 11.3773 5.92881 10.3582 5.34099C9.70604 4.9636 9.09385 4.71838 8.52168 4.6036C7.78081 4.45229 7.10778 4.52014 6.50431 4.81057L6.40691 4.85927C6.37039 4.87666 6.33559 4.89579 6.30081 4.91666C6.27994 4.92883 6.25735 4.94273 6.23648 4.95664C5.81039 5.21577 5.46777 5.56709 5.21385 6.00883C5.05733 6.27492 4.93387 6.57577 4.84517 6.90795C4.8017 7.05751 4.7669 7.21231 4.73907 7.37579C4.67124 7.7497 4.63818 8.15838 4.63818 8.6036C4.63818 8.61925 4.63818 8.63664 4.63818 8.65229C4.63818 8.7549 4.63994 8.85927 4.64342 8.96361C4.66081 9.38101 4.70603 9.80014 4.78081 10.2227C4.86429 10.7062 4.98604 11.1914 5.14604 11.6801C5.41909 12.5201 5.80516 13.3653 6.29907 14.2192C7.4069 16.1306 8.75994 17.548 10.3565 18.4696C11.8591 19.3357 13.1495 19.5096 14.2278 18.9914L14.2678 18.9723C14.3147 18.9496 14.36 18.9253 14.4052 18.8992C14.9739 18.5792 15.3965 18.1027 15.6747 17.468C15.9426 16.861 16.0764 16.1062 16.0764 15.2088C16.0764 14.7654 16.0434 14.3184 15.9773 13.8697H15.9791ZM12.3669 15.6836L11.986 15.901L11.1391 14.4314L9.64342 11.8419V8.21055L11.073 9.03664V11.9897L13.0052 15.3201L12.3669 15.6836Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.0731 9.03654V11.127L9.64355 11.8418V8.21045L11.0731 9.03654Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13.0053 15.32L12.3671 15.6835L11.9862 15.9009L11.1392 14.4313L9.64355 11.8417L11.0731 11.127V11.9896L13.0053 15.32Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.40185 2.34766V3.98941L5.88011 4.75115L4.35489 5.51289L3.92358 5.72854V4.08679L7.40185 2.34766Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.40188 2.34769L3.92362 4.08682L3.82623 4.03119L3.39319 3.78074L1.06274 2.4364L4.54103 0.697266L7.40188 2.34769Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3.92362 4.08694V5.7287L1.86971 4.54259L1.06274 4.07652V2.43652L3.39319 3.78085L3.82623 4.03131L3.92362 4.08694Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6.23661 4.95639C5.81053 5.21552 5.4679 5.56685 5.21399 6.00859C5.05747 6.27467 4.934 6.57552 4.84531 6.9077L3.92357 7.36857L0.3479 5.30422L1.86964 4.54248L3.92357 5.72859L4.35486 5.51293L5.88009 4.75119L6.23661 4.95639Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M4.73902 7.37556C4.6712 7.74947 4.63814 8.15815 4.63814 8.60337C4.63814 8.61902 4.63814 8.63641 4.63814 8.65206L4.53904 8.70251L3.92163 9.01034V7.36858L4.84339 6.90771C4.79991 7.05728 4.76509 7.21208 4.73727 7.37556H4.73902Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M4.78275 10.2226L3.92362 10.6522L1.06274 9.00002L2.58625 8.23828L3.92362 9.01047L4.54103 8.70265L4.64013 8.65219C4.64013 8.7548 4.64187 8.85917 4.64534 8.96352C4.66274 9.38091 4.70797 9.80004 4.78275 10.2226Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3.92357 7.36855V9.0103L2.58618 8.23811L0.3479 6.94596V5.3042L3.92357 7.36855Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5.14795 11.68L3.92358 12.2922V10.6522L4.78271 10.2227C4.86619 10.7061 4.98795 11.1914 5.14795 11.68Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M19.5565 13.4695C19.5565 15.3008 19 16.5321 17.8852 17.1599C17.8504 17.179 17.8156 17.1981 17.7826 17.2155L17.713 17.2503L14.2696 18.972C14.3166 18.9494 14.3618 18.9251 14.407 18.899C14.9757 18.579 15.3983 18.1024 15.6766 17.4677C15.9444 16.8608 16.0783 16.106 16.0783 15.2086C16.0783 14.7651 16.0453 14.3181 15.9792 13.8695C15.8783 13.1825 15.7009 12.4903 15.4452 11.7895C15.2122 11.1495 14.9148 10.5042 14.5513 9.85206C14.5044 9.76684 14.4557 9.68164 14.407 9.59643C14.0087 8.90947 13.5809 8.28686 13.1218 7.7286C12.2991 6.72512 11.3774 5.92858 10.3583 5.34076C9.70612 4.96336 9.09392 4.71815 8.52175 4.60336C7.78088 4.45206 7.10787 4.51989 6.50439 4.81032L9.92699 3.09903L9.97744 3.07293C11.047 2.55815 12.3339 2.7338 13.8366 3.60163C15.4226 4.51641 16.7722 5.93556 17.8852 7.8573C19 9.77903 19.5565 11.6503 19.5565 13.4695Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_770_32584">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                    <div>
                                        <p className="xs-text">{format[0]} {format[1]}</p>
                                        <p className="xs-text-medium">{format[2]}</p>
                                        {/* <p className="xs-text-medium">{event.startTime}</p> */}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center radius-md bg-white size-[3.2rem] border border-[#E4E7EC] ">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.7392 18.1566V19.5902L4 14.5438V13.1118L12.7392 18.1566Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.9393 16.5566V17.9902L12.7393 19.5902V18.1566L14.6081 17.2222L15.9393 16.5566Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.3008 7.73743C12.1072 7.15503 11.848 6.57583 11.5216 6.00303C11.248 5.52303 10.9488 5.08143 10.6224 4.67823C9.976 3.88143 9.2256 3.23663 8.3696 2.74223C8.0192 2.54063 7.6864 2.38383 7.3712 2.27343C6.656 2.01903 6.0304 2.00303 5.4976 2.22223C5.4752 2.23183 5.4528 2.24143 5.4304 2.25103C5.408 2.26223 5.3872 2.27183 5.3648 2.28303C5.3152 2.30703 5.2656 2.33423 5.2176 2.36303C4.4064 2.85583 4 3.84783 4 5.34063C4 6.46223 4.3616 7.81743 5.0848 9.40463C5.4368 10.179 5.8784 11.0126 6.408 11.907C6.9648 12.8446 7.6176 13.8478 8.3696 14.9182C8.8848 14.779 9.3568 14.619 9.7808 14.4334C9.9728 14.3534 10.1536 14.2654 10.3264 14.1726L10.3312 14.1694C10.5888 14.0334 10.824 13.8878 11.04 13.7294C11.2272 13.5934 11.4 13.4494 11.5552 13.2974C11.5888 13.2654 11.6224 13.2318 11.6544 13.1982C12.3776 12.4446 12.7392 11.5086 12.7392 10.3854C12.7392 9.49103 12.5936 8.60943 12.3008 7.73743ZM9.2512 9.27663C9.192 9.31023 9.128 9.33423 9.0624 9.34703C8.8608 9.39183 8.6288 9.33903 8.3696 9.18863C8.0256 8.99023 7.7328 8.67983 7.488 8.25903C7.2432 7.83663 7.1216 7.42863 7.1216 7.03503C7.1216 6.64143 7.2432 6.37423 7.488 6.23503C7.5376 6.20783 7.5888 6.18543 7.6416 6.17103C7.8528 6.11343 8.0944 6.16463 8.3696 6.32303C8.7136 6.52143 9.0064 6.83183 9.2512 7.25263C9.496 7.67503 9.6176 8.08303 9.6176 8.47663C9.6176 8.87023 9.496 9.13743 9.2512 9.27663Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.61758 8.47645C9.61758 8.87005 9.49598 9.13725 9.25118 9.27645C9.19198 9.31005 9.12798 9.33405 9.06238 9.34685C8.86078 9.39165 8.62878 9.33885 8.36958 9.18845C8.02558 8.99005 7.73278 8.67965 7.48798 8.25885C7.24318 7.83645 7.12158 7.42845 7.12158 7.03485C7.12158 6.64125 7.24318 6.37405 7.48798 6.23485C7.53758 6.20765 7.58878 6.18525 7.64158 6.17085C7.85278 6.11325 8.09438 6.16445 8.36958 6.32285C8.71358 6.52125 9.00638 6.83165 9.25118 7.25245C9.49598 7.67485 9.61758 8.08285 9.61758 8.47645Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.9392 16.5563L14.608 17.2219L12.7392 18.1563L4 13.1115L6.408 11.9067C6.9648 12.8443 7.6176 13.8475 8.3696 14.9179C8.8848 14.7787 9.3568 14.6187 9.7808 14.4331C9.9728 14.3531 10.1536 14.2651 10.3264 14.1723L10.3312 14.1691L11.1216 13.7755L15.9392 16.5563Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.9392 8.78535C15.9392 9.90855 15.5776 10.8446 14.8544 11.5982C14.4528 12.0157 13.9344 12.3806 13.3024 12.6878L13.2816 12.6974L11.1216 13.7758L10.3312 14.1694C10.5888 14.0333 10.824 13.8878 11.04 13.7294C11.2272 13.5934 11.4 13.4494 11.5552 13.2974C11.5888 13.2654 11.6224 13.2318 11.6544 13.1982C12.3776 12.4446 12.7392 11.5086 12.7392 10.3854C12.7392 9.49095 12.5936 8.60935 12.3008 7.73735C12.1072 7.15495 11.848 6.57575 11.5216 6.00295C11.248 5.52295 10.9488 5.08135 10.6224 4.67815C9.97602 3.88135 9.22562 3.23655 8.36962 2.74215C8.01922 2.54055 7.68642 2.38375 7.37122 2.27335C6.65602 2.01895 6.03042 2.00295 5.49762 2.22215C5.47522 2.23175 5.45282 2.24135 5.43042 2.25095L8.57122 0.679752C8.59362 0.668552 8.61602 0.658952 8.63842 0.647752C9.41602 0.298952 10.3936 0.462152 11.5696 1.14215C12.8592 1.88615 13.9104 2.97415 14.7216 4.40295C15.5328 5.83335 15.9392 7.29415 15.9392 8.78535Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <div>
                                        <p className="xs-text">Location</p>
                                        <p className="xs-text-medium">{event?.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center radius-md bg-white size-[3.2rem] border border-[#E4E7EC] ">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.4725 11.4309C14.138 10.3395 13.6897 9.29124 13.1242 8.28779C13.0915 8.22745 13.0553 8.16538 13.0208 8.10503C12.9966 8.06193 12.9708 8.02055 12.9449 7.97917C12.5466 7.30331 12.1018 6.66366 11.6104 6.05676C11.4604 5.86883 11.3035 5.68262 11.1432 5.50159C11.0484 5.39297 10.9518 5.28607 10.8535 5.1809C10.8466 5.174 10.8397 5.1671 10.8328 5.16021C10.7191 5.03779 10.6018 4.9171 10.4846 4.80159C9.76043 4.08779 8.99836 3.49986 8.19491 3.03607C7.83629 2.82745 7.48457 2.65503 7.14146 2.5171C6.58974 2.29297 6.0587 2.15848 5.54836 2.11366C5.54491 2.11193 5.53974 2.11193 5.53629 2.11193C4.84146 2.05676 4.22595 2.14641 3.68457 2.38434L3.67422 2.38779L3.37595 2.53779C2.76388 2.88779 2.2725 3.43262 1.91733 4.18262C1.55698 4.92055 1.37939 5.83435 1.37939 6.92228C1.37939 8.01021 1.55698 9.12055 1.91733 10.2826C2.2725 11.4343 2.76388 12.5464 3.37595 13.605C3.98974 14.6619 4.70526 15.6309 5.53629 16.5257C6.36905 17.4118 7.25526 18.1343 8.19491 18.6774C9.13629 19.2205 10.0225 19.5205 10.8535 19.5946C11.5949 19.6532 12.2501 19.5498 12.819 19.2774L12.9225 19.2256C12.9553 19.2084 12.988 19.1912 13.0208 19.1722C13.5363 18.8774 13.9604 18.4412 14.2932 17.8687C14.357 17.7618 14.4156 17.6481 14.4725 17.5308C14.6397 17.1878 14.7673 16.8068 14.8553 16.3912C14.9587 15.9068 15.0104 15.3723 15.0104 14.7912C15.0104 13.705 14.8346 12.5861 14.4725 11.4309ZM13.4742 16.3895C13.4656 16.4068 13.4587 16.424 13.4501 16.4412C13.2484 16.8619 13.0001 17.205 12.7001 17.4722C12.5553 17.6032 12.3984 17.7136 12.2294 17.8084C11.7191 18.1084 11.1122 18.2187 10.4173 18.1705C9.7225 18.1049 8.97939 17.8549 8.19491 17.4032C7.41215 16.9499 6.66905 16.3412 5.9725 15.6033C5.27767 14.8516 4.67767 14.043 4.16733 13.1533C3.65008 12.2688 3.23974 11.343 2.93974 10.3723C2.63974 9.40159 2.48974 8.46366 2.48974 7.56366C2.48974 6.66366 2.63974 5.88952 2.93974 5.274C3.23974 4.64814 3.65008 4.18952 4.16733 3.90159C4.41733 3.75503 4.68802 3.65331 4.98284 3.59469C5.28802 3.5309 5.61733 3.51538 5.9725 3.54469C6.10181 3.55503 6.23284 3.574 6.3656 3.59814C6.94664 3.70331 7.55698 3.94297 8.19491 4.31021C8.66043 4.57917 9.11043 4.89986 9.54491 5.27228C9.62077 5.33607 9.69664 5.40331 9.77077 5.47228C9.8087 5.50503 9.84664 5.53952 9.88457 5.574C10.0104 5.69297 10.1346 5.81538 10.257 5.94297C10.3122 5.99814 10.3639 6.05331 10.4173 6.11021C10.5311 6.2309 10.6415 6.35503 10.7501 6.4809C10.7518 6.4809 10.7518 6.48262 10.7535 6.48435C11.3087 7.124 11.8035 7.81366 12.2294 8.55676C12.257 8.60331 12.2828 8.64986 12.3087 8.69641C12.4535 8.94986 12.5897 9.20676 12.7139 9.4671C13.007 10.074 13.2518 10.6981 13.4501 11.3412C13.569 11.724 13.6639 12.1033 13.7363 12.4774C13.8449 13.0464 13.9001 13.6033 13.9001 14.1499C13.9001 15.0257 13.7587 15.774 13.4742 16.3895Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.94655 10.976L7.48793 11.2036L6.96207 11.4674L6.56552 11.4157L6.05518 11.3502L6.43276 11.1622L7.24656 10.7553L7.56897 10.5933C7.65518 10.6846 7.74483 10.7777 7.84138 10.8708L7.94655 10.976Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.3345 13.6964C10.3345 14.0878 10.269 14.3826 10.1379 14.5758C10.0879 14.6499 10.0293 14.7085 9.96035 14.7533L9.84483 14.812C9.60518 14.8982 9.33621 14.9137 9.03449 14.8533C8.9138 14.8309 8.78793 14.7947 8.65862 14.7464V15.5361L7.70518 14.9844V14.1637C7.27587 13.7982 6.92069 13.3826 6.65518 12.9154C6.38276 12.4464 6.17759 11.9292 6.05518 11.3499L6.56552 11.4154L6.96207 11.4671C7.07069 11.9602 7.24138 12.3792 7.47931 12.7275C7.70518 13.0844 7.97759 13.343 8.27759 13.5171C8.57759 13.6895 8.83621 13.7602 9.05345 13.7223C9.11724 13.712 9.16897 13.6878 9.2138 13.6499C9.32242 13.562 9.37414 13.3913 9.37414 13.1413C9.37414 12.8361 9.26552 12.5223 9.03966 12.2051C8.82931 11.9085 8.4638 11.4999 7.94656 10.9758L7.84138 10.8706C7.74483 10.7775 7.65518 10.6844 7.56897 10.593C7.16552 10.1671 6.86207 9.76885 6.65518 9.40506C6.64483 9.38782 6.63621 9.36885 6.62759 9.35161C6.62759 9.34989 6.62759 9.34816 6.62759 9.34644C6.45173 9.01368 6.33966 8.67403 6.29656 8.3292V8.32575C6.29656 8.32575 6.29655 8.32403 6.29483 8.3223C6.28104 8.21023 6.27414 8.09989 6.27414 7.98782C6.27414 7.54989 6.40518 7.24127 6.6638 7.04644C6.69828 7.01885 6.73276 6.99299 6.77069 6.97403L6.85173 6.93265C7.08449 6.83782 7.38104 6.84816 7.73276 6.96885V6.1792L8.02414 6.34644L8.68793 6.7292V7.51885C9.02242 7.74299 9.32069 8.06541 9.59483 8.49644C9.84656 8.89989 10.0224 9.30334 10.1276 9.70679C10.1345 9.73092 10.1414 9.75334 10.1466 9.77747L9.52414 9.70506L9.37931 9.68954L9.26724 9.67575C9.19828 9.39472 9.07587 9.12058 8.91207 8.86196C8.74828 8.61023 8.51724 8.39816 8.22414 8.2292C7.90345 8.04472 7.65862 7.9723 7.48793 8.03954C7.32414 8.10161 7.23621 8.26023 7.23621 8.54299C7.23621 8.80851 7.33793 9.0861 7.5569 9.36885C7.71207 9.57748 7.96897 9.85851 8.32414 10.2154C8.43449 10.3292 8.5569 10.4482 8.68793 10.5775L8.7069 10.5964C9.3569 11.2378 9.79311 11.8068 10.0103 12.2947C10.2276 12.7878 10.3362 13.2585 10.3362 13.6964H10.3345Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.37423 13.1416C9.37423 13.3916 9.3225 13.5623 9.21388 13.6502C9.16905 13.6881 9.11733 13.7123 9.05354 13.7226C8.8363 13.7605 8.57767 13.6899 8.27768 13.5174C7.97767 13.3433 7.70526 13.0847 7.4794 12.7278C7.24147 12.3795 7.07078 11.9605 6.96216 11.4674L7.48802 11.2036L7.94664 10.9761C8.46388 11.5002 8.8294 11.9088 9.03974 12.2054C9.26561 12.5226 9.37423 12.8364 9.37423 13.1416Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.4742 16.3898C13.4656 16.4071 13.4587 16.4243 13.4501 16.4416C13.2484 16.8623 13.0001 17.2054 12.7001 17.4726C12.5553 17.6036 12.3984 17.7139 12.2294 17.8088C11.719 18.1088 11.1122 18.2191 10.4173 18.1708C9.7225 18.1053 8.97939 17.8553 8.19491 17.4036C7.41215 16.9502 6.66905 16.3416 5.9725 15.6036C5.27767 14.8519 4.67767 14.0433 4.16733 13.1536C3.65008 12.2692 3.23974 11.3433 2.93974 10.3726C2.63975 9.40191 2.48975 8.46398 2.48975 7.56398C2.48975 6.66398 2.63975 5.88984 2.93974 5.27433C3.23974 4.64847 3.65008 4.18984 4.16733 3.90191C4.41733 3.75536 4.68801 3.65364 4.98284 3.59502C5.28802 3.53122 5.61733 3.51571 5.9725 3.54502C6.10181 3.55536 6.23284 3.57433 6.3656 3.59846C6.08112 4.20536 5.93801 4.95709 5.93801 5.83984C5.93801 6.63984 6.05698 7.46571 6.29319 8.3226C6.29319 8.3226 6.29377 8.32376 6.29491 8.32605V8.3295C6.33801 8.67433 6.45008 9.01398 6.62595 9.34674C6.62595 9.34847 6.62595 9.35019 6.62595 9.35191C6.80526 9.83122 7.01043 10.2985 7.24491 10.7554L6.43112 11.1623L6.05353 11.3502C6.17595 11.9295 6.38112 12.4467 6.65353 12.9157C6.91905 13.3829 7.27422 13.7985 7.70353 14.164V14.9847L8.65698 15.5364L9.3587 15.1864L10.2966 14.7157C10.7294 15.0881 11.1794 15.4105 11.6415 15.6795C12.2794 16.0467 12.8915 16.2812 13.4725 16.3898H13.4742Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.7501 6.48129C10.7501 6.48129 10.7466 6.48646 10.7449 6.48991L9.81042 6.95715L8.68628 7.51922V6.72957L9.72249 6.21233L10.257 5.94336C10.3121 5.99853 10.3639 6.0537 10.4173 6.1106C10.5311 6.23129 10.6415 6.35543 10.7501 6.48129Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.2568 5.94315L9.72234 6.21039L8.68613 6.72936L8.02234 6.3466L7.73096 6.17936L9.54475 5.27246C9.62061 5.33625 9.69647 5.4035 9.77061 5.47246C9.80854 5.50522 9.84647 5.5397 9.8844 5.57419C10.0103 5.69315 10.1344 5.81556 10.2568 5.94315Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.107 13.6792V13.812L10.2983 14.7154L9.36042 15.1861L8.65869 15.5361V14.7464C8.788 14.7947 8.91386 14.8309 9.03455 14.8533C9.33628 14.9137 9.60524 14.8982 9.8449 14.812L9.96042 14.7533L10.2018 14.6326L11.9828 13.7413L12.107 13.6792Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.3983 13.0327C13.3638 13.0551 13.3311 13.0741 13.2931 13.0879C13.2879 13.0896 13.2828 13.0913 13.2759 13.0931L13.3983 13.0327Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M18.4587 13.0674C18.4587 14.1467 18.2828 15.0623 17.9208 15.8071C17.5656 16.5485 17.0828 17.0985 16.4691 17.4484C16.3966 17.4898 16.3225 17.5277 16.2466 17.5639L12.9225 19.226C12.9553 19.2087 12.988 19.1915 13.0208 19.1725C13.5363 18.8777 13.9604 18.4415 14.2932 17.8691C14.357 17.7622 14.4156 17.6484 14.4725 17.5312C14.6397 17.1881 14.7673 16.8071 14.8553 16.3916C14.9587 15.9071 15.0104 15.3726 15.0104 14.7916C15.0104 13.7054 14.8346 12.5864 14.4725 11.4312C14.138 10.3398 13.6897 9.29157 13.1242 8.28812C13.0915 8.22777 13.0553 8.1657 13.0208 8.10536C12.9966 8.06225 12.9708 8.02088 12.9449 7.9795C12.5466 7.30363 12.1018 6.66398 11.6104 6.05708C11.4604 5.86915 11.3035 5.68294 11.1432 5.50191C11.0484 5.39329 10.9518 5.28639 10.8535 5.18122C10.8466 5.17432 10.8397 5.16743 10.8328 5.16053C10.7191 5.03812 10.6018 4.91743 10.4846 4.80191C9.76043 4.08812 8.99836 3.50019 8.19492 3.03639C7.83629 2.82777 7.48457 2.65536 7.14147 2.51743C6.58974 2.29329 6.05871 2.15881 5.54836 2.11398C5.54492 2.11226 5.53974 2.11226 5.53629 2.11226C4.84147 2.05708 4.22595 2.14674 3.68457 2.38467L6.82423 0.813974C7.43802 0.463974 8.15354 0.322595 8.98457 0.388112C9.81733 0.460526 10.7035 0.769147 11.6432 1.31225C12.5846 1.85536 13.4708 2.57088 14.3018 3.45708C15.1328 4.35191 15.8553 5.32432 16.4691 6.38122C17.0828 7.43984 17.5656 8.54846 17.9208 9.70708C18.2828 10.8623 18.4587 11.9812 18.4587 13.0674Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.7361 12.4777C13.6792 12.7346 13.574 12.9157 13.4206 13.0209L13.3982 13.0329L13.2758 13.0933L12.1068 13.6795L11.9827 13.7415L10.2016 14.6329L9.96024 14.7536C10.0292 14.7088 10.0878 14.6502 10.1378 14.576C10.2689 14.3829 10.3344 14.0881 10.3344 13.6967C10.3344 13.2588 10.2258 12.7881 10.0085 12.295C9.79127 11.807 9.35507 11.2381 8.70507 10.5967L8.6861 10.5778C8.55507 10.4484 8.43265 10.3295 8.32231 10.2157C7.96713 9.85879 7.71024 9.57773 7.55506 9.36911C7.3361 9.08635 7.23438 8.80879 7.23438 8.54327C7.23438 8.26051 7.32231 8.10189 7.4861 8.03982C7.65679 7.97258 7.90162 8.04498 8.22231 8.22946C8.51541 8.39842 8.74644 8.61049 8.91024 8.86222C9.07403 9.12084 9.19644 9.39498 9.26541 9.67601L9.37748 9.6898L9.52231 9.70532L10.1447 9.77775L10.2533 9.72256L11.3292 9.18635L12.0861 8.80706C12.1016 8.82085 12.1171 8.8381 12.1344 8.85361C12.3499 9.06568 12.543 9.27085 12.7137 9.46741C13.0068 10.0743 13.2516 10.6984 13.4499 11.3415C13.5689 11.7243 13.6637 12.1036 13.7361 12.4777Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.3087 8.69644L12.0863 8.80679L11.3294 9.18608L10.2535 9.72231L10.1449 9.77748C10.1397 9.75334 10.1328 9.73093 10.1259 9.70679C10.0208 9.30334 9.8449 8.89988 9.59318 8.49643C9.31904 8.06539 9.02076 7.743 8.68628 7.51886L9.81042 6.95679L10.7449 6.48955L10.7535 6.48438C11.3087 7.12403 11.8035 7.81369 12.2294 8.55679C12.257 8.60334 12.2828 8.64989 12.3087 8.69644Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.73113 6.49316V6.96903C7.37941 6.84834 7.08286 6.83799 6.8501 6.93282L7.73113 6.49316Z" fill="#EDEDF2" stroke="#221FCB" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <div>
                                        {/* <p>{event.price}</p> */}
                                        <p className="xs-text">Price</p>
                                        <p className="!text-[#221FCB] flex items-center xs-text-medium !font-semibold">free</p>
                                    </div>
                                </div>
                            </div>

                            {/* Attendees */}
                            <div className="bg-gray-50 p-4 rounded-lg ">
                                <div className="flex flex-col">
                                    <p className='xs-text'><span className="font-semibold">{attend!?.length || 0}</span> persons registered</p>
                                    <button onClick={viewModal} className="!text-[#221FCB] flex items-center xs-text-medium !font-semibold">
                                        Manage attendees
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* About this event */}
                            <div className=" flex flex-col gap-4">
                                <p className="xs-text-medium !text-[#101828]">About this event</p>
                                <p className="xs-text !text-[#344054]">{event?.description}</p>
                            </div>

                            {/* Map location */}
                            <div className=" flex flex-col gap-4">
                                <p className="xs-text-medium !text-[#101828]">Map Location</p>
                                <p className="xs-text !text-[#344054]">{event?.location}</p>
                                {/* <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                                <img
                                    src="/api/placeholder/800/400"
                                    alt="Map location"
                                    className="w-full h-full object-cover"
                                />
                            </div> */}
                            </div>

                            {/* Tags */}
                            <div className=" flex flex-col gap-4">
                                <p className="xs-text-medium !text-[#101828]">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {event?.eventTag?.map((tag: string, index: number) => (
                                        <span key={index} className="px-3 p-2 border bg-[#CECDE9] text-[#3130A2] text-[1.2rem] leading-[1.8rem] font-medium rounded-[.6rem]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Similar events */}
            {events.filter(evt => evt.eventType === event?.eventType).filter(evt => evt._id !== event._id).length > 0 && (
                <SectionBlock xt='see all events' link='/events' title="Explore other events">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {events.filter(evt => evt.eventType === event?.eventType).filter(evt => evt._id !== event._id).slice(0, 3).map(event => (
                            <EventCard key={event._id} {...event} />
                        ))}
                    </div>
                </SectionBlock>
            )}
        </div>
    )
}






