"use client"

import { Pagination } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { BrowseLatestTransactions } from '@/services/supportService';
import React, { useState } from 'react'
import useSWR from 'swr';

export default function RecentTransactions() {
    const { data: transactions = [] } = useSWR('latest-transactions', BrowseLatestTransactions, { 
        suspense: true, 
        refreshInterval: 30000,
        fallbackData:[]
       });

       console.log(transactions)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return (
        <div className='flex flex-col gap-4'>
            <p className='sm-text !font-semibold'>Recent Transactions </p>
            <div className="space-y-4">
                {/* {notification.map(notification => (
                    <div key={notification._id} className="p-4 bg-white rounded-lg border">
                        <SummaryInfoColum icon={true} description={notification.message} title={notification.type} other={'59s ago'} />
                    </div>
                ))} */}
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
