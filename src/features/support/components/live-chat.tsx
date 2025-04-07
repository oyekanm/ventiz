"use client"

import { FunctionalButton } from '@/components/reuseable'
import { useAppContext } from '@/context/appContext';
import useToast from '@/hooks/useToast';
import { useWebSocket } from '@/hooks/useWebsocket';
import { UpdateRefundRequest } from '@/services/supportService';
import { formatDateWithAMPM } from '@/utils/dateFormatter';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArrowUp, ChevronUp, Download, Paperclip, Send, X } from 'lucide-react'
import React, { useState } from 'react'
import { mutate } from 'swr';

interface Props {
    close: any;
    ticket: dispute
}

interface messages {
    sender: string,
    message: string,

}

type socket = {
    messages: messages[],
    sendMessage: (message: any) => void
}

export default function LiveChat({ close, ticket }: Props) {
    const { user } = useAppContext()
    const toast = useToast()
    const [marking, setMarking] = useState(false)
    const [message, setMessage] = useState('');
    const { messages, sendMessage }: socket = useWebSocket(
        `wss://vw8hufljm4.execute-api.eu-north-1.amazonaws.com/dev`,
        // user.token
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VmZjg2NjE5NzkxMjEwNmVhODc1NTAiLCJlbWFpbCI6ImVuaXRhbmJvbHV3YXRpZmU1QGdtYWlsLmNvbSIsInN1YnNjcmliZSI6dHJ1ZSwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNPbmJvYXJkIjp0cnVlLCJtZmEiOmZhbHNlLCJmdWxsTmFtZSI6ImVuaXRhbiBib2x1d2F0aWZlIiwidXJsIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD9kPW1wIiwicGhvbmUiOiIrNDQ1OTg2NTk0MzQ1Iiwic3RhdHVzIjoiYXBwcm92ZWQiLCJyb2xlIjpbInN1cGVyQWRtaW4iXSwiY3JlYXRlZEF0IjoiMjAyNS0wNC0wNFQxNToxOTowMi4wMjdaIiwidXBkYXRlZEF0IjoiMjAyNS0wNC0wNFQxNTozMjowOS4xMzVaIiwiYnVzaW5lc3NOYW1lIjoiM3ZlbnRpeiBBZG1pbiIsIl9fdiI6MCwibGFzdExvZ2luIjoiMjAyNS0wNC0wNFQxNTozMjowOS4xMzBaIiwiaWF0IjoxNzQzNzgwNzI5fQ.xoN2cN29OlEDyXBPxnLqbnxhZXfVUY2DtBSbU0Jo39o`
    );

    console.log(messages)

    const pushMessage = () => {
        if (message === "") return;
        setMessage("")
        sendMessage(
            {
                "userId": ticket.userId,
                "action": "sendMessage",
                "message": `${message}`,
                "title": "refund request"
            }
        )
    }
    const editStatus = async (status: string) => {
        const detail = {
            adminId: user._id,
            requestId: ticket._id,
            status
        }
        try {
            setMarking(true)
            const response = await UpdateRefundRequest(detail)
            console.log(response)
            if (response?.error) {
                toast({
                    status: 'error',
                    text: response?.error,
                    duration: 5000
                });
                setMarking(false)
            }
            if (response?.message === "success") {
                mutate("all-supports")
                toast({
                    status: 'success',
                    text: 'Ticket Status updated',
                    duration: 3000
                });
                setMarking(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
  

    const markResolved = async () => {
        toast({
            status: 'warning',
            text: "Are you sure you want to mark this as resolved?",
            duration: 30000,
            clickText: "Yes, Mark",
            click: ()=>editStatus("resolved")
        });
    }
    // DropdownComponent
    // update status
    // /update-refund-request PATCH {adminId, requestId, status - “resolved”  | “open”}
    // /update-refund-request PATCH {adminId, requestId, status - “resolved”  | “open”}
    return (
        <div className="fixed bg-[rgb(255, 255, 255)7] z-[10000] flex justify-center items-center backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[62rem] flex flex-col gap-2  h-full w-full mx-auto p-[1.2rem] px-[1.6rem] bg-white rounded-lg shadow">
                <div className="flex justify-between items-center border-b ">
                    <p className="xs-text-medium">REFUND DISPUTE #11</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X className='!size-8' />
                    </button>
                </div>

                <div className='h-[85%] flex flex-col gap-4 items-start overflow-auto'>
                    {/* Ticket Details */}
                    <div className="">
                        <div className="grid gap-2">
                            <p className='sm-text !font-medium'>Ticket Details</p>
                            <div className="grid grid-cols-4">
                                <p className="xs-text-medium !font-normal">Issue Type:</p>
                                <p className="xs-text !text-[#3d4658]">Refund Dispute</p>
                            </div>
                            <div className="grid grid-cols-4 ">
                                <p className="xs-text-medium !font-normal">User Name & Email:</p>
                                <p className="xs-text !text-[#101828] col-span-2 ">{ticket.userDetails.fullName} - <span className='text-blue-500'> {ticket.userDetails.email}</span></p>
                            </div>
                            <div className="grid grid-cols-4">
                                <p className="xs-text-medium !font-normal">Date Submitted:</p>
                                <p className="xs-text !text-[#101828] col-span-2 ">{ticket.timestamp}</p>
                            </div>
                            <div className="grid grid-cols-4">
                                <p className="xs-text-medium !font-normal">Current Status:</p>
                                <div className="flex items-center">
                                    <span className="xs-text-normal !font-medium px-2 py-1 bg-yellow-100 !text-yellow-800 rounded-full mr-2">
                                        {ticket.status}
                                    </span>
                                    <DropdownMenu >
                                        <DropdownMenuTrigger disabled={marking}>
                                            <span className="!text-[#221FCB] xs-text-normal !font-medium">Change status</span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='radius-md bg-white'>
                                            <DropdownMenuItem className='flex items-center gap-4 p-4' onClick={()=>editStatus("pending")}>
                                                <span className='xs-text'>pending</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='flex items-center gap-4 p-4'  onClick={()=>editStatus("resolved")}>
                                                <span className='xs-text'>resolved</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <p className="xs-text-medium !font-normal">Assigned Admin:</p>
                                <div className="flex items-center">
                                    <p className="xs-text !text-[#101828]">{ticket.adminDetails.fullName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conversation History */}
                    <p className='sm-text !font-medium mb-[-1rem]'>Ticket Conversation History</p>
                    <div className="flex-grow overflow-y-auto flex flex-col justify-between w-full bg-[#F2F4F7] p-[1.6rem] px-[1.2rem] rounded-[1.2rem]">
                        <div className="space-y-4 flex flex-col">
                            <div
                                className={`flex items-start gap-3 flex-col `}
                            >
                                <p className="xs-text !text-[#101828]">{ticket.userDetails.fullName}</p>
                                <div
                                    className={`p-3 px-[1.2rem] rounded-[.4rem] max-w-[70%] bg-white`}
                                >
                                    <p className='xs-text !text-[#344054]'>{ticket.message.split(":")[1]}</p>
                                </div>
                                <p className="xs-text">{formatDateWithAMPM(ticket.timestamp)}</p>
                                {/* <p className="xs-text">{formatDateWithAMPM(Date.now())}</p> */}
                            </div>

                            {messages.length > 0 && messages.map((conversation, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-start gap-3 ${conversation.message === "Internal server error" ? "hidden" : "block"} ${conversation.sender === "3ventiz" ? 'flex-row-reverse' : 'flex-row'
                                        }`}
                                >
                                    <p className="xs-text !text-[#101828]">{conversation.sender === "3ventiz" ?ticket.adminDetails.fullName: ticket.userDetails.fullName  }</p>
                                    <div
                                        className={`p-3 px-[1.2rem] rounded-[.4rem] max-w-[70%] bg-white`}
                                    >
                                        <p className='xs-text !text-[#344054]'>{conversation.message}</p>
                                    </div>
                                    <p className="xs-text">{formatDateWithAMPM(Date.now())}</p>
                                </div>
                            ))}
                        </div>
                        {/* Message Input */}
                        <div className="">
                            <div className="flex flex-col bg-white radius-md p-4 px-6">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a reply here..."
                                    className="w-full xs-text flex-grow resize-none focus-visible:!outline-none"
                                    rows={4}
                                />
                                <div className='flex justify-between items-center'>
                                    <Paperclip size={20} className="text-gray-600 cursor-pointer" />
                                    <button
                                        className=" bg-[#221FCB26] text-white p-2 rounded-full size-16 flex items-center justify-center"
                                        onClick={pushMessage}
                                    >
                                        <ArrowUp size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Attached Files */}
                    {/* <div className="border-t w-full">
                        <h3 className="text-lg font-semibold mb-4">Attached files</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="flex justify-between items-center p-3 border rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded">

                                        <Paperclip size={20} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">File Name.jpeg</p>
                                        <p className="text-sm text-gray-500">1.5 MB</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Download size={20} />
                                </button>
                            </div>
                            <div
                                className="flex justify-between items-center p-3 border rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded">

                                        <Paperclip size={20} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">File Name.pdf</p>
                                        <p className="text-sm text-gray-500">230 KB</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                    <FunctionalButton click={close} noIcn text='Reassign ticket' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    <FunctionalButton disable={marking}  noIcn text={"Mark as resolved"} click={markResolved} />
                </div>
            </div>
        </div >
    )
}
