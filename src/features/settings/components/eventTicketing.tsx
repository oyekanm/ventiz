"use client"

import React, { useState } from 'react';
import { Bell, Eye } from 'lucide-react';
import { FunctionalButton } from '@/components/reuseable';

interface Props {
    activeTab: string;
    setActiveTab:any
}

export default function EventTicketingSettings({activeTab, setActiveTab}:Props) {
    const [autoApproveEvents, setAutoApproveEvents] = useState(true);
    const [allowTicketTransfer, setAllowTicketTransfer] = useState(true);
    const [enableQRCode, setEnableQRCode] = useState(true);
    const [requireIDVerification, setRequireIDVerification] = useState(false);
    const [onSiteCheckIn, setOnSiteCheckIn] = useState(true);
    const [limitCheckIn, setLimitCheckIn] = useState(true);

    const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <p className="md-text">Settings</p>
                    <p className="sm-text">Manage your account, preferences, and platform configurations</p>
                </div>
                <div className="flex items-center gap-4">
                    <FunctionalButton noIcn text='Discard' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    <FunctionalButton noIcn text='Save changes' />
                </div>
            </div>
            <div className='flex flex-col gap-8'>

                <div >
                    <div className="flex border-b">
                        {tabs.map(tab => {
                            return <button
                                key={tab}
                                className={`sm-text px-4 py-2 ${activeTab === tab ? '!text-[#221FCB] border-b-2 border-[#221FCB]' : ' !text-[#667085]'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        })}
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="rounded-md border border-gray-200 p-6">
                        <h3 className="text-lg font-medium mb-4">General Preferences</h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-md font-medium mb-4">General Event Settings</h4>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">Default Event Visibility</label>
                                        <div className="relative">
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10"
                                                defaultValue="public"
                                            >
                                                <option value="public">Public</option>
                                                <option value="private">Private</option>
                                                <option value="unlisted">Unlisted</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Auto-approve events</span>
                                        <div
                                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${autoApproveEvents ? 'bg-green-500' : 'bg-gray-300'}`}
                                            onClick={() => setAutoApproveEvents(!autoApproveEvents)}
                                        >
                                            <div
                                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${autoApproveEvents ? 'translate-x-6' : 'translate-x-0'}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-md mb-2">Event Cancellation Policy</h4>
                                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                                    <p className="text-sm">
                                        <span className="font-medium">1. Cancellation by Organizer:</span> If the event is canceled by the organizer, all registered participants will receive a full refund. Notification of cancellation will be sent via email at least 48 hours prior to the event.
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">2. Cancellation by Participant:</span> Participants who wish to cancel their registration must do so at least 72 hours before the event to receive a full refund. Cancellations made less than 72 hours before the event will not be eligible for a refund.
                                    </p>
                                    <p className="text-sm">...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-gray-200 p-6">
                        <h3 className="text-lg font-medium mb-4">Ticketing Preferences</h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-md font-medium mb-4">Default Ticket Types & Pricing</h4>

                                <div className="space-y-4">
                                    {['Early Bird', 'General Admission', 'VIP'].map((category, index) => (
                                        <div key={index} className="flex space-x-4">
                                            <div className="flex-1">
                                                <label className="block text-sm text-gray-600 mb-2">Ticket Category</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                    defaultValue={category}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm text-gray-600 mb-2">Ticket Price</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10"
                                                        defaultValue="custom"
                                                    >
                                                        <option value="custom">Custom</option>
                                                        <option value="free">Free</option>
                                                        <option value="donation">Donation</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button className="text-blue-600 flex items-center mt-2">
                                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add category
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-md font-medium mb-2">Ticket Transferrability</h4>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Allow users to transfer tickets</span>
                                    <div
                                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${allowTicketTransfer ? 'bg-green-500' : 'bg-gray-300'}`}
                                        onClick={() => setAllowTicketTransfer(!allowTicketTransfer)}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${allowTicketTransfer ? 'translate-x-6' : 'translate-x-0'}`}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 bg-gray-50 p-4 rounded-md space-y-4">
                                    <p className="text-sm">
                                        <span className="font-medium">1. Cancellation by Organizer:</span> If the event is canceled by the organizer, all registered participants will receive a full refund. Notification of cancellation will be sent via email at least 48 hours prior to the event.
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">2. Cancellation by Participant:</span> Participants who wish to cancel their registration must do so at least 72 hours before the event to receive a full refund. Cancellations made less than 72 hours before the event will not be eligible for a refund.
                                    </p>
                                    <p className="text-sm">...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-gray-200 p-6">
                        <h3 className="text-lg font-medium mb-4">Payment & Checkout</h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-md font-medium mb-4">Supported Payment Methods</h4>

                                <div className="space-y-2">
                                    {[
                                        { id: 'credit', label: 'Credit/Debit Card', checked: true },
                                        { id: 'paypal', label: 'PayPal', checked: true },
                                        { id: 'crypto', label: 'Crypto', checked: false },
                                        { id: 'bank', label: 'Bank Transfer', checked: true },
                                    ].map((method) => (
                                        <div key={method.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={method.id}
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                                defaultChecked={method.checked}
                                            />
                                            <label htmlFor={method.id} className="ml-2 text-sm text-gray-700">
                                                {method.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-md font-medium mb-4">Service Fees</h4>

                                <div className="space-y-4">
                                    <div className="flex space-x-4">
                                        <div className="flex-1">
                                            <label className="block text-sm text-gray-600 mb-2">Service Fee Percentage</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                defaultValue="2.5%"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm text-gray-600 mb-2">Option</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10"
                                                    defaultValue="per_ticket"
                                                >
                                                    <option value="per_ticket">Per ticket sales</option>
                                                    <option value="flat_fee">Flat fee</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">Maximum Service Fee Charge</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            defaultValue="$75.00"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-gray-200 p-6">
                        <h3 className="text-lg font-medium mb-4">Ticket Scanning & Verification</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Enable QR code ticketing</span>
                                <div
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${enableQRCode ? 'bg-green-500' : 'bg-gray-300'}`}
                                    onClick={() => setEnableQRCode(!enableQRCode)}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${enableQRCode ? 'translate-x-6' : 'translate-x-0'}`}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Require ID verification</span>
                                <div
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${requireIDVerification ? 'bg-green-500' : 'bg-gray-300'}`}
                                    onClick={() => setRequireIDVerification(!requireIDVerification)}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${requireIDVerification ? 'translate-x-6' : 'translate-x-0'}`}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">On-site check-in method</span>
                                <div
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${onSiteCheckIn ? 'bg-green-500' : 'bg-gray-300'}`}
                                    onClick={() => setOnSiteCheckIn(!onSiteCheckIn)}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${onSiteCheckIn ? 'translate-x-6' : 'translate-x-0'}`}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Limit check-in to one device per ticket</span>
                                <div
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${limitCheckIn ? 'bg-green-500' : 'bg-gray-300'}`}
                                    onClick={() => setLimitCheckIn(!limitCheckIn)}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${limitCheckIn ? 'translate-x-6' : 'translate-x-0'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

