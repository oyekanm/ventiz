import { EmptyContainer, Pagination } from '@/components/reuseable';
import React, { useState } from 'react'

interface Props {
    ticketHistory: Bookings[]
}

export default function UserTicketHistory({ ticketHistory }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5
    const totalPages = Math.ceil(ticketHistory.length / itemsPerPage);

    // // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div className="">
            <p className="xs-text-medium">EVENT AND TICKET PURCHASE HISTORY</p>

           {/* {ticketHistory.length===0 && <p className='xs-text' >This user do not have a booking history</p>} */}
           {ticketHistory.length===0 && <EmptyContainer text='This user do not have a booking history' />}

            {ticketHistory.length > 0 && <>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b h-[4.4rem]  ">
                                <th className="th">Event Name</th>
                                <th className="th">Ticket Type</th>
                                <th className="th">Price</th>
                                <th className="th">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketHistory.slice(indexOfFirstItem, indexOfLastItem).map(tkh => (
                                <tr key={tkh._id} className="border-b h-[7.2rem]">
                                    <td className="td">
                                        {tkh.event.name}
                                    </td>
                                    <td className="td">{tkh.ticketType}</td>
                                    <td className="td  ">£{tkh.price}</td>
                                    <td className="td  "> <span className='h-[2.2rem] px-4 !font-medium !text-[#06764] border border-[#ABEFC6] bg-[#ECFDF3] '>completed</span> </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </>}
        </div>
    )
}
