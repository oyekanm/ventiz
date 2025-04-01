"use client"

import { GoBack, Loader, SectionBlock } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import { ChatTable } from '@/features/support/components';
import { BrowseAllSupport } from '@/services/supportService';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const OpenTicketsContainer = () => {
    // const { data: supports = [] } = useSWR('all-supports', BrowseAllSupport, { 
    //     suspense: true, 
    //     // refreshInterval: 60000,
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

    const open = supports?.filter(item => item.status === "open")
    return (
        <div >
            {/* Back button */}
            <GoBack />
            <div className="grid gap-8">
                <div>
                    <p className="md-text">Total open tickets</p>
                    <p className="sm-text">Track and manage unresolved tickets requiring attention</p>
                </div>


                {open.length > 0 && (
                    <SectionBlock title={`Showing ${open.length} results`} noXt>
                        <ChatTable supports={open} />
                    </SectionBlock>
                )}
            </div>
        </div>
    );
};

export default OpenTicketsContainer;

