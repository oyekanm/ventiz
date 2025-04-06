"use client"

import React, { useEffect, useState } from 'react';
import { Calendar, CalendarPlus2, ChevronDown, Clock, CloudUpload, Eye, Globe, LockKeyhole, Map, MapPin, Upload, X } from 'lucide-react';
import { FunctionalButton, MultiSelect, UserInfoCard } from '@/components/reuseable';
import useSWR, { mutate } from 'swr';
import { DisableUsers, GetUserBooking, UpdateAdminUserDetail } from '@/services/adminService';
import useToast from '@/hooks/useToast';
import { BrowseAllBooking } from '@/services/eventService';
import UserTicketHistory from './userTicketHistory';
import { formatDateWithAMPM } from '@/utils/dateFormatter';

interface EventsProps {
    close: any,
    user: User
}

const UserDetailModal = ({ close, user }: EventsProps) => {
    const roles = ['attendee', 'creator', 'admin', 'superAdmin']
   
    const { data: allBookings = [] } = useSWR('all-bookings', BrowseAllBooking, {
        // refreshInterval: 60000
    });
    const toast = useToast()
    const booking = allBookings.filter(bk => bk.userId === user._id)
   
    const [loading, setLoading] = useState(false)
    const [isDisable, setIsDisable] = useState(false)

  
    // console.log(booking)
    // const { data: booking = [], error } = useSWR('user-booking',()=>GetUserBooking(user._id),{suspense:true});
    //  const [bookings, setbookings] 

    const handleTags = (id:any) =>{}


    console.log(user)

    const disableAccount = async () => {
        try {
            setIsDisable(true)
            const response = await DisableUsers(user._id)
            console.log(response)
            if (response?.message === "account disabled") {
                // alert(response.message)
                mutate("all-users")
                toast({
                    status: 'success',
                    text: response.message,
                    duration: 3000
                });
                setIsDisable(false)
                close()
            }
            if (response?.error) {
                toast({
                    status: 'error',
                    text: response?.error,
                    duration: 5000
                });
                setIsDisable(false)
                setLoading(false)
                // close()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const initiator = async () => {
        toast({
            status: 'warning',
            text: "Are you sure you want to disable this account?",
            duration: 30000,
            clickText: "Yes, Disable the account",
            click: disableAccount
        });
    }

    const registerDate = formatDateWithAMPM(user.createdAt).split(", ")
    const loginDate = formatDateWithAMPM(user.lastLogin).split(", ")

    // console.log(registerDate,loginDate)

    // TODO:fix registration details
    return (
        <div className="fixed bg-[#ffff7] z-[10000] backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[62rem]  h-full w-full mx-auto   bg-white rounded-lg shadow">
                <div className="flex justify-between items-center border-b p-4">
                    <p className="xs-text-medium !text-[#101828]">USER DETAILS</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                {/* Content */}
                <div className='h-[85%] flex flex-col gap-6 overflow-auto p-[1.2rem] px-[1.6rem]'>
                    {/* Personal Information */}
                    <div className="">
                        <p className="xs-text-medium">PERSONAL INFORMATION</p>

                        <div className="flex items-center gap-4 mb-4">
                            <UserInfoCard name={user.fullName} other={user.email} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="auth-label">User Role</label>
                                <MultiSelect
                                    options={roles}
                                    open={true}
                                    multi={false}
                                    addOptions={handleTags}
                                    desc=''
                                    singleValue={user.role[0]}
                                />
                            </div>
                            <div>
                                <label className="auth-label">Contact number</label>
                                <div className="auth-input-container">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_769_14451)">
                                            <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#F0F0F0" />
                                            <path d="M2.06718 3.91089C1.28167 4.93288 0.689365 6.11081 0.344482 7.39046H5.54675L2.06718 3.91089Z" fill="#0052B4" />
                                            <path d="M19.6558 7.39042C19.3109 6.11081 18.7186 4.93288 17.9331 3.91089L14.4536 7.39042H19.6558Z" fill="#0052B4" />
                                            <path d="M0.344482 12.6086C0.689404 13.8883 1.28171 15.0662 2.06718 16.0881L5.54663 12.6086H0.344482Z" fill="#0052B4" />
                                            <path d="M16.0879 2.06649C15.0659 1.28098 13.888 0.688672 12.6084 0.34375V5.54598L16.0879 2.06649Z" fill="#0052B4" />
                                            <path d="M3.91162 17.9314C4.93361 18.7169 6.11155 19.3092 7.39116 19.6541V14.4519L3.91162 17.9314Z" fill="#0052B4" />
                                            <path d="M7.39111 0.34375C6.1115 0.688672 4.93357 1.28098 3.91162 2.06644L7.39111 5.54593V0.34375Z" fill="#0052B4" />
                                            <path d="M12.6084 19.6541C13.888 19.3092 15.0659 18.7169 16.0879 17.9314L12.6084 14.4519V19.6541Z" fill="#0052B4" />
                                            <path d="M14.4536 12.6086L17.9331 16.0882C18.7186 15.0662 19.3109 13.8882 19.6558 12.6086H14.4536Z" fill="#0052B4" />
                                            <path d="M19.9154 8.69566H11.3044H11.3044V0.0846484C10.8774 0.0290625 10.4421 0 10 0C9.55785 0 9.12262 0.0290625 8.69566 0.0846484V8.69559V8.69563H0.0846484C0.0290625 9.12262 0 9.55793 0 10C0 10.4421 0.0290625 10.8774 0.0846484 11.3043H8.69559H8.69563V19.9154C9.12262 19.9709 9.55785 20 10 20C10.4421 20 10.8774 19.971 11.3043 19.9154V11.3044V11.3044H19.9154C19.9709 10.8774 20 10.4421 20 10C20 9.55793 19.9709 9.12262 19.9154 8.69566Z" fill="#D80027" />
                                            <path d="M12.6086 12.6094L17.071 17.0718C17.2762 16.8666 17.472 16.6521 17.6588 16.4298L13.8384 12.6094H12.6086V12.6094Z" fill="#D80027" />
                                            <path d="M7.39122 12.6094H7.39114L2.92883 17.0717C3.13399 17.2769 3.34848 17.4727 3.57083 17.6595L7.39122 13.839V12.6094Z" fill="#D80027" />
                                            <path d="M7.3911 7.39093V7.39085L2.92876 2.92847C2.72352 3.13362 2.52774 3.34812 2.34094 3.57046L6.16137 7.39089H7.3911V7.39093Z" fill="#D80027" />
                                            <path d="M12.6086 7.39175L17.071 2.92933C16.8659 2.72409 16.6514 2.52831 16.429 2.34155L12.6086 6.16198V7.39175Z" fill="#D80027" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_769_14451">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <input
                                        type="text"
                                        className="auth-input"
                                        value={user.phone}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">Account Status</label>

                                <div className="relative">
                                    <select className="auth-input-container !w-full auth-input">
                                        <option>{user.status}</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Divider */}
                    <hr className="" />

                    {/* Registration Details */}
                    <div className="">
                        <p className="xs-text-medium">REGISTRATION AND ACTIVITY DETAILS</p>

                        {user.createdAt && <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div className='flex flex-col gap-2'>
                                <label className="xs-text-medium !font-normal">Registration Date</label>
                                <p className='xs-text !text-[#101828]' >{`${registerDate[0]}, ${registerDate[1]}`}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className="xs-text-medium !font-normal">Registration Time</label>
                                <p className='xs-text !text-[#101828]' >{registerDate[2]}</p>
                            </div>
                        </div>}

                        {user.lastLogin && <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className='flex flex-col gap-2'>
                                <label className="xs-text-medium !font-normal">Last Login Date</label>
                                <p className='xs-text !text-[#101828]' >{`${loginDate[0]}, ${loginDate[1]}`}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className="xs-text-medium !font-normal">Last Login Time</label>
                                <p className='xs-text !text-[#101828]' >{loginDate[1]}</p>
                            </div>
                            {/* <div className="flex flex-col gap-2">
                                <label className="xs-text-medium !font-normal">Device & Browser Used</label>
                                <p className='xs-text !text-[#101828]' >{userData.device}; {userData.browser}</p>
                            </div> */}
                        </div>}
                    </div>

                    {/* Divider */}
                    <hr className="" />

                    {/* Ticket History */}
                    <UserTicketHistory ticketHistory={booking} />

                    {/* Divider */}
                    <hr className="my-6" />

                    {/* TODO: IMplement sessions */}
                    {/* Login History */}
                    {/* <div>
                        <p className="xs-text-medium">LOGIN HISTORY AND ACTIVE SESSIONS</p>

                        <div className="space-y-4">
                            {userData.activeSessions.map((session, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-black rounded flex items-center justify-center">
                                            <img src="/api/placeholder/20/12" alt="Device icon" className="invert" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{session.device}</p>
                                            <p className="text-sm text-gray-600">
                                                Last seen: {session.status || session.lastSeen}
                                            </p>
                                        </div>
                                    </div>
                                    {session.isActive ? (
                                        <button className="text-blue-600">Log out</button>
                                    ) : (
                                        <span className="text-red-600">Signed out</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>

                <div className="flex justify-end space-x-4 p-4 border-t ">
                    <FunctionalButton disable={isDisable} click={initiator} noIcn text={isDisable ? 'In progress...' : 'Disable account'} txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    {/* <FunctionalButton noIcn text="Save changes" bgClr='#221FCB' clx='border border-[#98A2B3]' /> */}
                    {/* <FunctionalButton disable={loading} click={createAdmin} noIcn text={loading ? "Saving..." : "Save changes"} /> */}

                </div>
            </div>
        </div >
    );
};

export default UserDetailModal;