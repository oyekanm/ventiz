"use client"

import React, { useMemo, useState } from 'react'
import { Search, Bell, MoreVertical, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { FunctionalButton, GoBack, Loader, Pagination, SectionBlock, SummaryInfoColum } from '@/components/reuseable';
import { BrowseAllSupport } from '@/services/supportService';
import { LiveChat } from '@/features/support/components';

interface Props {
    supports: dispute[]
}

export default function ChatTable({ supports }: Props) {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = useMemo(() => {
        setCurrentPage(1)
        return supports.filter((item) => {
            const matchesSearch = item.message?.toLowerCase().includes(searchTerm?.toLowerCase());

            return matchesSearch;
        })
    }, [supports, searchTerm]);

    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const openModal = () => {
        setOpen(!open)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }
    if(supports.length === 0){
        return (
            <div className="grid gap-4">
                <div>
                    <p className="md-text">Total tickets</p>
                    <p className="sm-text">No support data available for this page</p>
                </div>
            </div>
        )
    }
    return (
        <div className="grid gap-4">
            <div className="auth-input-container !mt-0 max-w-[32rem] !w-full">
                <Search className="text-[#667085] w-[1.5rem] h-[1.5rem]" />
                <input
                    type="text"
                    placeholder="To quickly find tickets by ID, user name, or issue type"
                    className="auth-input "
                />
            </div>

            <div className="bg-white rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b h-[4.4rem]  ">
                            <th className="th">
                                <input type="checkbox" className="rounded" />
                            </th>
                            <th className="th">Ticket</th>
                            <th className="th">Date Submitted</th>
                            <th className="th">Status</th>
                            <th className="th">Assigned Admin</th>
                            <th className="th"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {supports.slice(indexOfFirstItem, indexOfLastItem).map((ticket: any) => (
                            <tr key={ticket._id} className="border-b h-[7.2rem]">
                                <td className="td">
                                    <input type="checkbox" className="rounded" />
                                </td>
                                <td className="td !font-medium">{ticket.message}</td>
                                <td className="td">{ticket.timestamp}</td>
                                <td className={`td`}
                                >
                                    <span className={`rounded-full px-4 py-2   ${ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>

                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="td">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                        {ticket.adminDetails.fullName}
                                    </div>
                                </td>
                                <td className="td">
                                    <button onClick={openModal}>
                                        <MoreVertical className="!w-6 !h-8 text-gray-400" />
                                    </button>
                                </td>
                                {open && <LiveChat ticket={ticket} close={() => openModal()} />}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}
