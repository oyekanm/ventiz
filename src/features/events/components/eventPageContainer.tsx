"use client"

import { FunctionalButton, Loader, Pagination } from '@/components/reuseable';
import MultiSelect from '@/components/reuseable/multiSelect';
import { useAppContext } from '@/context/appContext';
import { EventCard, EventCreateForm, EventListing } from '@/features/events/components';
import { BrowseAllEvents } from '@/services/eventService';
import { ArrowLeft, ArrowRight, Calendar, LayoutGrid, ListFilter, Search, Table } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

interface eventsProps {
    events: EventData[]
}

const EventPageContainer = () => {
    const {initialData} = useAppContext()
    const options = ["all","physical", "virtual"];

    const { data: events = [],isLoading } = useSWR('all-events', BrowseAllEvents, {
        fallbackData:initialData.events || [],
        refreshInterval: 5000,
        // Enable refetching on window focus
        revalidateOnFocus: true,
        // Enable refetching on network reconnection
        revalidateOnReconnect: true,
        // Dedupe requests within this time frame
        // dedupingInterval: 1000
    });

    // const [events, setEvents] = useState<EventData[]>(initialData.events);
    const [eventLoading, setEventLoading] = useState(false)
    console.log(events,initialData.events)
    const [activeTab, setActiveTab] = useState("view")
    const [searchTerm, setSearchTerm] = useState("");
    // const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [openSelect, setOpenSelect] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
    //     const fetchEvents = async () => {
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

    const filteredItems = useMemo(() => {
        // console.log(categoryFilter)
        setCurrentPage(1)
        return events?.filter((item) => {
            // const newFilter = item.eventType.toLowerCase().includes(categoryFilter.toLowerCase())
            // const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            // const newFilter = categoryFilter.includes(item.eventType)
            // const matchesCategory = categoryFilter === "all" || item.eventType. categoryFilter;
            // return matchesSearch && matchesCategory;
            // console.log(newFilter, matchesSearch)
            // return item.eventType.toLowerCase().includes(categoryFilter.toLowerCase())
            return item.name.toLowerCase().includes(searchTerm.toLowerCase())
            // return newFilter || matchesSearch;
        }).filter(item=> {
            if(categoryFilter.toLowerCase() === "all"){
                return item
            }
            return item.eventType.toLowerCase().includes(categoryFilter.toLowerCase())
        })
    // }, [searchTerm, categoryFilter])
    }, [events, searchTerm, categoryFilter])

    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

    const [open, setOpen] = useState(false)

    // console.log(filteredItems,[...filteredItems].reverse())

    const openModal = () => {
        setOpen(!open)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }

    const setTab = (type: string) => {
        setActiveTab(type)
    }

    const toggleSelect = () => {
        setOpenSelect(!openSelect)
    }
    const addOptions = (opt: any) => {
        setCategoryFilter(opt)
        console.log(opt)
    }
    return (
        <div className="relative grid gap-8">

            {open && <EventCreateForm close={() => openModal()} />}
            <div className="flex justify-between items-center">
                <div>
                    <p className="md-text">Event management overview</p>
                    <p className="sm-text">Create, edit, and oversee event listings</p>
                </div>
                <FunctionalButton click={openModal} />
            </div>

            <div className=" flex justify-between items-center">
                <div className="auth-input-container max-w-[34.3rem] !w-full">
                    <Search className="text-[#667085] w-[1.5rem] h-[1.5rem]" />
                    <input
                        type="text"
                        placeholder="Search for events..."
                        className="auth-input "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <FunctionalButton bgClr='#ffff' clx='border border-[#D0D5DD] p-2'>
                        <span onClick={() => setTab("view")} className={`${activeTab === "view" ? "bg-[#E4E7EC]" : ""} rounded-[.4rem]  p-3 px-4`}>
                            <LayoutGrid className="!size-6 text-[#344054]" />
                        </span>
                        <span onClick={() => setTab("list")} className={`${activeTab === "list" ? "bg-[#E4E7EC]" : ""} rounded-[.4rem]  p-3 px-4`}>
                            <Table className="!size-6 text-[#98A2B3]" />
                        </span>
                    </FunctionalButton>
                    <FunctionalButton Icon={Calendar} text='Jan 12, 2024 - Jan 18, 2024' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    <FunctionalButton click={toggleSelect} Icon={ListFilter} text='Filters' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                </div>
            </div>
            {/* {eventLoading && <Loader />} */}
            {!eventLoading && events.length > 0 && (
                <div className='grid gap-4'>
                    <div>
                        <p className="xs-text !font-medium !text-[#344054]">
                            Showing {filteredItems.length} of {events.length} active events
                        </p>
                    </div>
                    <MultiSelect small options={options} multi={false} open={openSelect} addOptions={addOptions} toggle={toggleSelect} singleValue={categoryFilter} />
                    {/* <MultiSelect small options={options} open={openSelect} addOptions={addOptions} toggle={toggleSelect} multiValue={categoryFilter} /> */}

                    {activeTab === "view" && <div>
                        <div className="grid grid-cols-3 gap-6">
                            {[...filteredItems].reverse().slice(indexOfFirstItem, indexOfLastItem).map(event => (
                                <EventCard key={event._id} {...event} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>}
                    {activeTab === "list" && (
                        <EventListing
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            events={[...filteredItems].reverse().slice(indexOfFirstItem, indexOfLastItem)} />)}
                </div>
            )}
        </div>
    );
};

export default EventPageContainer;