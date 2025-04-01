"use client"

import { GoBack, Loader, SectionBlock } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { ChatTable } from '@/features/support/components';
import { BrowseAllSupport } from '@/services/supportService';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const PendingRefundContainer = () => {
    // const { data: supports = [] } = useSWR('all-supports', BrowseAllSupport, { 
    //     suspense: true, 
    //     // refreshInterval: 60000
    //     fallbackData:[]
    //    });
    const [eventLoading, setEventLoading] = useState(false)
    const [supports, setSupports] = useState<dispute[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setEventLoading(true)

                const support: any = await BrowseAllSupport();
                //   console.log(data)
                setSupports(support)
                setEventLoading(false)
            } catch (error) {
                console.error("Error fetching events:", error);
                setEventLoading(false)
            }
        };

        fetchEvents();
    }, []);
    const pending = supports?.filter(item => item.status === "pending")
    return (
        <div >
            {/* Back button */}
            <GoBack />
            <div className='grid gap-8'>
                <div>
                    <p className="md-text">Pending refunds</p>
                    <p className="sm-text">Monitor and process refund requests awaiting approval</p>
                </div>


                {pending.length > 0 && (
                    <SectionBlock title="Showing 52 results" noXt>
                        <ChatTable supports={pending} />
                    </SectionBlock>
                )}
            </div>
        </div>
    );
};

export default PendingRefundContainer;

