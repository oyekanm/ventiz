"use client"

import { GoBack, Loader, SectionBlock } from '@/components/reuseable';
import { ChatTable } from '@/features/support/components';
import { BrowseAllSupport } from '@/services/supportService';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const ResolvedTicketsContainer = () => {
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
             
             const support:any = await BrowseAllSupport();
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
       const resolved = supports?.filter(item => item.status === "resolved")
    return (
        <div >
            {/* Back button */}
            <GoBack />
            <div className='grid gap-8'>
                <div>
                    <p className="md-text">Resolved tickets</p>
                    <p className="sm-text">Review and revisit tickets that have been successfully handled.</p>
                </div>

             
                { resolved.length > 0 && (
                    <SectionBlock title={`Showing ${resolved.length} results`} noXt>
                        <ChatTable supports={resolved} />
                    </SectionBlock> 
                )}
            </div>
        </div>
    );
};

export default ResolvedTicketsContainer;

