"use client"

import { EmptyContainer, FunctionalButton } from '@/components/reuseable';
import { X } from 'lucide-react';

interface EventsProps {
    close: any,
    attendees: Attendees[]
}

const ViewAttendees = ({ close, attendees }: EventsProps) => {


    return (
        <div className="fixed bg-[#ffff7] z-[10000] backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[37.5rem]  h-[90%] w-full mx-auto  bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">
                    <p className="xs-text-medium">Attendee list</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className='h-[80%] overflow-auto p-[1.2rem] px-[1.6rem]'>
                    {attendees.length === 0 && <EmptyContainer text='There are no attendees fro this event yet' />}
                    {attendees.length > 0 && <div>
                        {
                            attendees.map(atd => {
                                const nameSplit = atd.fullName?.split(" ");
                                const first = nameSplit[0]?.slice(0, 1)
                                const second = nameSplit[1]?.slice(0, 1)
                                return (
                                    <div className='border-b py-2 flex flex-col gap-2' >
                                        <div className="flex items-center gap-[1.6rem]">
                                            <div className="size-[4rem] uppercase bg-[#F2F4F7] !text-[#667085] sm-text !font-semibold flex justify-center items-center rounded-full border-[.075rem] border-[#E4E7EC]">
                                                {atd.fullName ? `${first}${second ? second : ""}` : "JD"}
                                            </div>
                                            <div >
                                                <p className="xs-text !font-medium capitalize">{atd.fullName ? atd.fullName : "John Doe"}</p>
                                                <p className="xs-text">{atd.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[1.6rem]">
                                            <div className="size-[4rem] opacity-0 uppercase bg-[#F2F4F7] !text-[#667085] sm-text !font-semibold flex justify-center items-center rounded-full border-[.075rem] border-[#E4E7EC]">
                                            </div>
                                            <p className='xs-text'>Ticket: {atd.bookings[0].ticketType}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>}
                </div>

                <div className="flex justify-end space-x-4 p-4 border-t">
                    <FunctionalButton click={close} noIcn text='Close' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                </div>
            </div>
        </div >
    );
};

export default ViewAttendees;