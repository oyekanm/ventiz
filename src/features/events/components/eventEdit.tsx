"use client"

import React, { useState } from 'react';
import { Calendar, CalendarPlus2, Clock, CloudUpload, Eye, LockKeyhole, Map, MapPin, Trash2, Upload, X } from 'lucide-react';
import UploadEventBanner from './uploadEventBanner';
import { FunctionalButton, MultiSelect } from '@/components/reuseable';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/appContext';
import { useRouter } from 'next/navigation';
import { EditEvent } from '@/services/eventService';
import useToast from '@/hooks/useToast';
import { mutate } from 'swr';
import { convert12to24 } from '@/utils/dateFormatter';

interface EventsProps {
    close: any,
    eventD: EventData
}

const EventEditForm = ({ close, eventD }: EventsProps) => {
    const [activeTab, setActiveTab] = useState('basic');
    const [sending, setSending] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [disableVisibility, setDisableVisibility] = useState(false)
    const [disableSchedule, setDisableSchedule] = useState(false)
    const [disablePrice, setDisablePrice] = useState(false)
    const { user } = useAppContext()
    const route = useRouter()
    const toast = useToast()

    // console.log(user)

    const eventType = ["physical", "virtual"]
    const eventTags = ["Farming", "Innovation", "Agriculture", "Tech", "business", "theatre arts"]
    const [eventData, setEventData] = useState<EventData>(eventD);

    const handleAddTicket = () => {
        setEventData((prev: any) => {
            return {
                ...prev,
                tickets: [
                    ...prev.tickets,
                    {
                        type: "",
                        quantity: 0,
                        price: 0,
                        free: false,
                        salesStartDate: "",
                        salesStartTime: "15:00",
                        salesEndDate: "",
                        salesEndTime: "15:00",
                        description: "",
                    },
                ]
            }
        });
    };
    const handleTicketChange = (index: number, field: string, value: any) => {
        const updatedTickets = [...eventData.tickets];
        if (field === "free") {
            const update = {
                ...updatedTickets[index],
                [field]: value,
                price: 0
            }
            setDisablePrice(!disablePrice)
            updatedTickets[index] = update;
        }

        const update = {
            ...updatedTickets[index],
            [field]: value,
        }


        updatedTickets[index] = update;
        console.log(updatedTickets)

        setEventData(prev => {
            return {
                ...prev,
                tickets: updatedTickets,
                // giftLink: "https://www.aws.com/"

            }
        });
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        console.log(value)
        setEventData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    function saveImage(url: string) {
        let count = 1
        console.log(url)
        const image = {
            id: eventData?.url?.length + count ,
            link: url
        }
        count ++
        setEventData((prev: any) => {
            return {
                ...prev,
                url: [...prev.url, url]
            }
        })
    }

    console.log(eventData.url)

    const createEvent = async () => {
        if (activeTab !== "publish") {
            setActiveTab(activeTab === "basic" ? "ticket" : "publish")
            return;
        }
        setSending(true)
        try {
            const response = await EditEvent(eventD._id, eventD.creatorId, eventData);
            console.log(response)
            if (response.message === "success") {
                setSending(false)
                toast({
                    status: 'success',
                    text: "Event edited successfully",
                    duration: 3000
                });
                // mutate("single-event")
                route.refresh()
                close()
            }
        } catch (error: any) {
            // console.log(error)
            toast({
                status: 'error',
                text: error.response.data.error,
                duration: 3000
            });
        }
    }
    const sameday = () => {
        if (eventData.startDate === eventData.endDate && eventData.startTime === eventData.endTime) {
            setEventData(prev => {
                return {
                    ...prev,
                    endDate: '',
                    endTime: '05:00',
                }
            })
        } else {
            setEventData(prev => {
                return {
                    ...prev,
                    endDate: prev.startDate,
                    endTime: prev.startTime
                }
            })
        }
    }
    const pickEventVisibility = (visibility: string) => {
        setEventData(prevData => {
            if (visibility === "private") {
                // If visibility is private, ensure privateVisibilityOptions exists
                // If it doesn't exist, add it with default values
                setDisableVisibility(false)
                return {
                    ...prevData,
                    visibility,
                    privateVisibilityOptions: prevData.privateVisibilityOptions || {
                        linkAccess: false,
                        passwordProtected: true,
                        password: ""
                    }
                };
            } else {
                // If visibility is not private, remove privateVisibilityOptions
                setDisableVisibility(true)
                const newData = {
                    ...prevData,
                    visibility,
                    privateVisibilityOptions: {
                        linkAccess: true,
                        passwordProtected: false,
                        password: ""
                    }
                };
                return newData;
            }
        });
    }
    const pickEventSchedule = (visibility: string) => {
        setEventData(prevData => {
            if (visibility === "scheduled") {
                // If visibility is private, ensure privateVisibilityOptions exists
                // If it doesn't exist, add it with default values
                setDisableSchedule(false)
                return {
                    ...prevData,
                    publish: visibility,
                    publishSchedule: prevData.publishSchedule || {
                        startDate: "",
                        startTime: ""
                    }
                };
            } else {
                // If visibility is not private, remove privateVisibilityOptions
                setDisableSchedule(true)
                return {
                    ...prevData,
                    publish: visibility,
                    publishSchedule: {
                        startDate: "",
                        startTime: ""
                    }
                };
            }
        });
    }
    const setShedule = (type: string, value: string) => {
        setEventData((prevData: any) => {
            if (type === "time") {
                return {
                    ...prevData,
                    publishSchedule: {
                        startDate: prevData.publishSchedule.startDate,
                        startTime: value
                    }
                };
            } else {
                return {
                    ...prevData,
                    publishSchedule: {
                        startDate: value,
                        startTime: prevData.publishSchedule.startTime
                    }
                };
            }
        });
    }

    const handleType = (value: string) => {
        setEventData(prev => ({
            ...prev,
            eventType: value
        }));
    }
    const handleTags = (value: string[]) => {
        setEventData(prev => ({
            ...prev,
            eventTag: value
        }));
    }

    const removeImage = (indexToRemove: string) => {
        const updatedImages = eventData.url.filter((url: any) => url.id !== indexToRemove);
        setEventData(prev => {
            return {
                ...prev,
                url: updatedImages
            }
        })

    };

    console.log(eventData)
    const inputCon = "grid gap-2"

    return (
        <div className="fixed bg-[#ffff7] z-[10000] backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[62rem] flex flex-col gap-4 h-full w-full mx-auto  bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">
                    <p className="xs-text-medium">CREATE EVENT DETAILS</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>
                <div className='h-[85%] overflow-auto p-[1.2rem] px-[1.6rem]'>
                    <div>
                        <div>
                            <p className="md-text">Event management overview</p>
                            <p className="sm-text">Create, edit, and oversee event listings</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex border-b">
                                <button
                                    className={`sm-text px-4 py-2 ${activeTab === 'basic' ? '!text-[#221FCB] border-b-2 border-[#221FCB]' : ' !text-[#667085]'}`}
                                    onClick={() => setActiveTab('basic')}
                                >
                                    Basic information
                                </button>
                                <button
                                    className={`sm-text px-4 py-2 ${activeTab === 'ticket' ? '!text-[#221FCB] border-b-2 border-[#221FCB]' : ' !text-[#667085]'}`}
                                    onClick={() => setActiveTab('ticket')}
                                >
                                    Ticket details
                                </button>
                                <button
                                    className={`sm-text px-4 py-2 ${activeTab === 'publish' ? '!text-[#221FCB] border-b-2 border-[#221FCB]' : ' !text-[#667085]'}`}
                                    onClick={() => setActiveTab('publish')}
                                >
                                    Publish settings
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=''>

                        {activeTab === 'basic' && (
                            <div className="space-y-6 ">
                                <div className={inputCon}>
                                    <label className="auth-label">
                                        Upload event images <span className="text-red-500">*</span>
                                    </label>
                                    <div className='flex flex-col gap-4'>
                                        {eventData.url.map((url: any) => {
                                            const spl = url.link.split("/")
                                            return (
                                                <div key={url.id} className='flex items-center justify-between h-[7.2rem] border rounded-[1.2rem] p-6' >
                                                    <div className='flex items-center gap-4'>
                                                        <img src={url.link} alt={url.id} className='size-16 rounded-[.6rem]' />
                                                        <p className='xs-text-medium'>{spl[spl.length - 1]}</p>
                                                    </div>
                                                    <Trash2 onClick={() => removeImage(url.id)} className='cursor-pointer' size={20} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <UploadEventBanner image={eventData.url} onUploadSuccess={saveImage} />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="auth-label">
                                            Event Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="auth-input-container !w-full auth-input"
                                            placeholder="Enter event name here"
                                            value={eventData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="auth-label">
                                            Event Location <span className="text-red-500">*</span>
                                        </label>
                                        <div className="auth-input-container !w-full">
                                            <MapPin className="auth-input-icon" />
                                            <input
                                                type="text"
                                                name="location"
                                                className="auth-input"
                                                placeholder="Enter event location here"
                                                value={eventData.location}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="auth-label">
                                            Event description <span className="text-red-500">*</span>
                                        </label>
                                        {/* <div className="auth-input-container !w-full !h-[12rem]">
                                
                                </div> */}
                                        <textarea
                                            name="description"
                                            id="description"
                                            placeholder="Enter short details about this ticket"
                                            value={eventData.description}
                                            onChange={handleInputChange}
                                            className="auth-input w-full p-[.8rem] pl-[1.2rem] border border-[#D0D5DD] rounded-[.8rem]"
                                            rows={6}
                                            cols={30}
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={inputCon}>
                                            <label className="auth-label">
                                                Start Date <span className="text-red-500">*</span>
                                            </label>
                                            <div className="auth-input-container !w-full">
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    className="auth-input"
                                                    placeholder="DD-MM-YYY"
                                                    value={eventData.startDate?.split("T")[0]}
                                                    onChange={handleInputChange}
                                                />
                                                {/* <CalendarPlus2 className="auth-input-icon" /> */}
                                            </div>
                                        </div>
                                        <div className={inputCon}>
                                            <label className="auth-label">
                                                Start time <span className="text-red-500">*</span>
                                            </label>
                                            <div className="auth-input-container !w-full">
                                                <input
                                                    type="time"
                                                    name="startTime"
                                                    className="auth-input"
                                                    value={convert12to24(eventData.startTime)}
                                                    onChange={handleInputChange}
                                                    placeholder="10:00 am"
                                                />
                                                {/* <Clock className="auth-input-icon" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className='flex items-center justify-between '>
                                            <label htmlFor='free-ticket' className="auth-label">Same day event</label>
                                            <Switch
                                                id='free-ticket'
                                                checked={eventData.startDate === eventData.endDate && eventData.startTime === eventData.endTime}
                                                onCheckedChange={sameday}
                                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={inputCon}>
                                            <label className="auth-label">
                                                End Date <span className="text-red-500">*</span>
                                            </label>
                                            <div className="auth-input-container !w-full">
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    className="auth-input"
                                                    placeholder="select date"
                                                    value={eventData.endDate?.split("T")[0]}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className={inputCon}>
                                            <label className="auth-label">
                                                End time <span className="text-red-500">*</span>
                                            </label>
                                            <div className="auth-input-container !w-full">
                                                <input
                                                    type="time"
                                                    name="endTime"
                                                    className="auth-input"
                                                    onChange={handleInputChange}
                                                    value={convert12to24(eventData.endTime)}
                                                    placeholder="select time"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={inputCon}>
                                        <label className="auth-label">
                                            Event Type <span className="text-red-500">*</span>
                                        </label>
                                        <MultiSelect options={eventType} multi={false} open={true} addOptions={handleType} desc='Select event type' singleValue={eventData.eventType} />


                                    </div>
                                    <div className={inputCon}>
                                        <label className="auth-label">
                                            Event Tags <span className="text-red-500">*</span>
                                        </label>

                                        <MultiSelect options={eventTags} open={true} addOptions={handleTags} desc='Tech, business, theatre arts, etc...' multiValue={eventData.eventTag} />

                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === 'ticket' && (
                            <div className="space-y-6">
                                {eventData.tickets.map((ticket, index) => (
                                    <div key={index} className="space-y-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="auth-label">
                                                    Ticket type <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="ticketType"
                                                    className="auth-input-container !w-full auth-input"
                                                    value={ticket.type}
                                                    onChange={(e) => handleTicketChange(index, "type", e.target.value)}
                                                />
                                                {/* <select
                                                    name="ticketType"
                                                    className="auth-input-container !w-full auth-input"
                                                    value={ticket.type}
                                                    onChange={(e) => handleTicketChange(index, "type", e.target.value)}
                                                >
                                                    <option value="">Select ticket type</option>
                                                    <option value="Early Bird Ticket">Early Bird Ticket</option>
                                                    <option value="General Admission">General Admission</option>
                                                    <option value="vip">Vip</option>
                                                </select> */}
                                                {/* <MultiSelect options={ticketType} multi={false} open={true} addOptions={handleType} desc='Select a ticket type' singleValue={ticket.type} /> */}
                                            </div>
                                            <div>
                                                <label className="auth-label">
                                                    Available Quantity <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="ticketQuantity"
                                                    className="auth-input-container !w-full auth-input"
                                                    value={ticket.quantity}
                                                    onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                                                />
                                            </div>
                                            <div>
                                                <label className="auth-label">
                                                    Price <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="ticketPrice"
                                                    className="auth-input-container !w-full auth-input"
                                                    value={ticket.price}
                                                    onChange={(e) => handleTicketChange(index, "price", parseFloat(e.target.value || "0"))}
                                                    disabled={ticket.free}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between '>
                                            <label htmlFor='free-ticket' className="auth-label">Free</label>
                                            <Switch
                                                id='free-ticket'
                                                checked={ticket.free}
                                                onCheckedChange={(e) => handleTicketChange(index, "free", e)}
                                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={inputCon}>
                                                <label className="auth-label">
                                                    Start Date <span className="text-red-500">*</span>
                                                </label>
                                                <div className="auth-input-container !w-full">
                                                    <input
                                                        type="date"
                                                        name="startDate"
                                                        className="auth-input"
                                                        placeholder="DD-MM-YYY"
                                                        value={ticket.salesStartDate?.split("T")[0]}
                                                        onChange={(e) => handleTicketChange(index, "salesStartDate", `${e.target.value}T00:00:00Z`)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={inputCon}>
                                                <label className="auth-label">
                                                    Start time <span className="text-red-500">*</span>
                                                </label>
                                                <div className="auth-input-container !w-full">
                                                    <input
                                                        type="time"
                                                        name="startTime"
                                                        className="auth-input"
                                                        value={convert12to24(ticket.salesStartTime)}
                                                        onChange={(e) => handleTicketChange(index, "salesStartTime", e.target.value)}
                                                        placeholder="10:000 am"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={inputCon}>
                                                <label className="auth-label">
                                                    Sales end date <span className="text-red-500">*</span>
                                                </label>
                                                <div className="auth-input-container !w-full">
                                                    <input
                                                        type="date"
                                                        name="startDate"
                                                        className="auth-input"
                                                        placeholder="DD-MM-YYY"
                                                        value={ticket.salesEndDate.split("T")[0]}
                                                        onChange={(e) => handleTicketChange(index, "salesEndDate", `${e.target.value}T23:59:59Z`)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={inputCon}>
                                                <label className="auth-label">
                                                    End time <span className="text-red-500">*</span>
                                                </label>
                                                <div className="auth-input-container !w-full">
                                                    <input
                                                        type="time"
                                                        name="startTime"
                                                        className="auth-input"
                                                        value={convert12to24(ticket.salesEndTime)}
                                                        onChange={(e) => handleTicketChange(index, "salesEndTime", e.target.value)}
                                                        placeholder="10:000 am"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="auth-label">
                                                Ticket description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                placeholder="Enter short details about this ticket"
                                                value={ticket.description}
                                                onChange={(e) => handleTicketChange(index, "description", e.target.value)}
                                                className="auth-input w-full p-[.8rem] pl-[1.2rem] border border-[#D0D5DD] rounded-[.8rem]"
                                                rows={6}
                                                cols={30}
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}
                                <FunctionalButton click={handleAddTicket} text='Add another ticket category' txtClr='text-[#667085]' bgClr='#ffff' clx='border border-[#E4E7EC] w-full' />
                            </div>
                        )}

                        {activeTab === 'publish' && (
                            <div className="space-y-6">
                                <div className={inputCon}>
                                    <p className="xs-text-medium">Is your event public or private?</p>
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={eventData.visibility === "public" ? true : false}
                                                onCheckedChange={(e) => pickEventVisibility("public")}
                                            />
                                            <div>
                                                <p className="xs-text">Public</p>
                                                <p className="xs-text-normal">Shared on 3ventix and search engines</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={eventData.visibility === "private" ? true : false}
                                                onCheckedChange={(e) => pickEventVisibility("private")}
                                            />
                                            <div>
                                                <p className="xs-text">Private</p>
                                                <p className="xs-text-normal">Shared only with a selected audience</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className={inputCon}>
                                    <label className="auth-label">
                                        Select your audience <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="ticketType"
                                        className="auth-input-container !w-full auth-input"
                                        // value={eventData.ticketType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Tech, business, theatre arts, etc...</option>
                                        <option value="standard">Standard</option>
                                        <option value="vip">VIP</option>
                                    </select>
                                </div>
                                {eventData.visibility === "private" && <div className={inputCon}>
                                    <label className="auth-label">Password</label>
                                    <div className="auth-input-container !w-full">
                                        <LockKeyhole className="auth-input-icon" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a password"
                                            className="auth-input"
                                            value={eventData?.privateVisibilityOptions?.password}
                                            onChange={(e) =>
                                                setEventData(prev => ({
                                                    ...prev, privateVisibilityOptions: {
                                                        linkAccess: false,
                                                        passwordProtected: true,
                                                        password: e.target.value
                                                    }
                                                }))}
                                            disabled={disableVisibility}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className=""
                                        >
                                            <Eye className="auth-input-icon" />
                                        </button>
                                    </div>
                                </div>}
                                <div className={inputCon}>
                                    <p className="xs-text-medium">When do you want your event to be published?</p>
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={eventData.publish === "now" ? true : false}
                                                onCheckedChange={(e) => pickEventSchedule("now")}
                                            />
                                            <div>
                                                <p className="xs-text">Now</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={eventData.publish === "scheduled" ? true : false}
                                                onCheckedChange={(e) => pickEventSchedule("scheduled")}
                                            />
                                            <div>
                                                <p className="xs-text">Schedule for later</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                {eventData.publish === "scheduled" && <div className="grid grid-cols-2 gap-4">
                                    <div className={inputCon}>
                                        <label className="auth-label">
                                            Date <span className="text-red-500">*</span>
                                        </label>
                                        <div className="auth-input-container !w-full">
                                            <input
                                                type="date"
                                                name="publishSheduletime"
                                                className="auth-input"
                                                placeholder="DD-MM-YYY"
                                                value={eventData.publishSchedule.startDate?.split("T")[0]}
                                                onChange={(e) => setShedule("date", e.target.value)}
                                                disabled={disableSchedule}
                                            />
                                        </div>
                                    </div>
                                    <div className={inputCon}>
                                        <label className="auth-label">
                                            Time <span className="text-red-500">*</span>
                                        </label>
                                        <div className="auth-input-container !w-full">
                                            <input
                                                type="time"
                                                name="publishSheduletime"
                                                className="auth-input"
                                                value={convert12to24(eventData.publishSchedule.startTime)}
                                                onChange={(e) => setShedule("time", e.target.value)}
                                                placeholder="10:000"
                                            />
                                        </div>
                                    </div>
                                </div>}
                                <p className="xs-text-medium">Add discount code (Optional)</p>
                                <div>
                                    <label className="auth-label">
                                        Add Coupon code
                                    </label>
                                    <input
                                        type="text"
                                        name="coupon"
                                        className="auth-input-container !w-full auth-input"
                                        placeholder="Enter event name here"
                                        value={eventData.coupon}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="auth-label">
                                        Discount percentage
                                    </label>
                                    <input
                                        type="text"
                                        name="discount"
                                        className="auth-input-container !w-full auth-input"
                                        placeholder="Enter event name here"
                                        value={eventData.discount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className={inputCon}>
                                        <label className="auth-label">
                                            Expiry date <span className="text-red-500">*</span>
                                        </label>
                                        <div className="auth-input-container !w-full">
                                            <input
                                                type="date"
                                                name="expiryDate"
                                                className="auth-input"
                                                placeholder="DD-MM-YYY"
                                                value={eventData.expiryDate?.split("T")[0]}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={inputCon}>
                                        <label className="auth-label">
                                            Time <span className="text-red-500">*</span>
                                        </label>
                                        <div className="auth-input-container !w-full">
                                            <input
                                                type="time"
                                                name="expiryTime"
                                                className="auth-input"
                                                value={convert12to24(eventData.expiryTime)}
                                                onChange={handleInputChange}
                                                placeholder="10:00"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="auth-label">
                                        Maximum redemptions
                                    </label>
                                    <input
                                        type="number"
                                        name="maxRedemptions"
                                        className="auth-input-container !w-full auth-input"
                                        placeholder="Enter event name here"
                                        value={eventData.maxRedemptions}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4 p-4 border-b ">
                    <FunctionalButton click={close} noIcn text='Discard changes' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    {!sending && <FunctionalButton disable={sending} click={createEvent} noIcn text={activeTab === 'publish' ? 'Update event' : 'Save and Continue'}
                    // bgClr='#98A2B3' clx='border border-[#98A2B3]' 
                    />}
                    {sending && <FunctionalButton disable={sending} noIcn text={"Updating Event..."} />}
                </div>
            </div>
        </div >
    );
};

export default EventEditForm;