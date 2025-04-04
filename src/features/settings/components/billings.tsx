"use client"

import { useAppContext } from "@/context/appContext";
import { ChevronDown, Download, Edit, Eye, Plus, RotateCcw, Trash2 } from "lucide-react"
import { useState } from "react";
import PayoutCreateForm from "./payoutCreateForm";
import { FunctionalButton } from "@/components/reuseable";
import useSWR from "swr";
import { GetUserCard } from "@/services/supportService";
import useToast from "@/hooks/useToast";

interface Props {
    activeTab: string;
    setActiveTab:any
}

// Billings Tab Component
export default function BillingsTab({activeTab,setActiveTab}:Props) {
    const { user } = useAppContext()
    const toast = useToast()

    const { data: cards, mutate } = useSWR("user-card",()=> GetUserCard(user._id), {
        fallbackData: [],
        refreshInterval: 10000
      });
    const [open, setOpen] = useState(false)

    const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]

    const [billingInfo, setBillingInfo] = useState({
        name: user.fullName,
        address: user.role,
        country: user.email
    })

    // const createAdmin = async () => {
    //     // console.log(adminData)
    //     try {
    //         setLoading(true)
    //         const response = await CreateAdmin(adminData)
    //         console.log(response)
    //          if (response?.error) {
    //             toast({
    //                 status: 'warning',
    //                 text: response?.error,
    //                 duration: 5000
    //             });
    //             setLoading(false)
    //             // close()
    //         }
    //         if (response?.message === "success") {
    //             mutate("all-users")
    //             toast({
    //                 status: 'success',
    //                 text: 'New roles assigned',
    //                 duration: 3000
    //             });
    //             setLoading(false)
    //             close()
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    console.log(cards)
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        console.log(value)
        setBillingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const openModal = () => {
        setOpen(!open)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <p className="md-text">Settings</p>
                    <p className="sm-text">Manage your account, preferences, and platform configurations</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* <FunctionalButton noIcn text='Discard' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    <FunctionalButton noIcn text='Save changes' /> */}
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
                <div className="flex flex-col gap-4 ">
                    {/* Billing Information */}
                    {/* <p className="settings-text-bold">Billings & Subscription Management</p>
                    <div className="bg-white radius-md p-5 px-6 border flex flex-col gap-4 ">
                        <div className='grid grid-cols-3 gap-4'>
                            <p className="settings-text-medium">Billing information</p>
                            <div className="col-span-2 flex flex-col gap-8">
                                <div className="grid grid-cols-2 items-start">
                                    <div>
                                        <label className="auth-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="auth-input-container !w-full auth-input"
                                            placeholder="Enter your name"
                                        // value={info.fullName}
                                        // onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="auth-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="auth-input-container !w-full auth-input"
                                            placeholder="Enter your Address"
                                        // value={info.fullName}
                                        // onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="auth-label">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            className="auth-input-container !w-full auth-input"
                                            placeholder="Enter your Country"
                                        // value={info.fullName}
                                        // onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */}

                    {/* Payment Methods */}
                    {/* <div className="bg-white radius-md p-5 px-6 border flex flex-col gap-4 ">
                <div className="flex justify-between items-center">
                    <p className="settings-text-medium">Payment methods</p>
                    <button className="flex items-center gap-1 settings-text-medium !text-[#221FCB]">
                        <Plus size={20} />
                        Add new card
                    </button>
                </div>

                <div className="bg-white rounded-lg border">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b h-[4.4rem]">
                                <th className="th">Card Information</th>
                                <th className="th">Card Number</th>
                                <th className="th">Expiry Date</th>
                                <th className="th">CVV/CVC</th>
                                <th className="th"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {['VISA', 'Stripe', 'UnionPay', 'Mastercard'].map((cardType, index) => (
                                <tr key={index} className="border-b h-[7.2rem]">
                                    <td className="td">
                                        <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-xs">
                                            {cardType === 'VISA' && <span className="text-blue-700">VISA</span>}
                                            {cardType === 'Stripe' && <span className="text-indigo-500">Stripe</span>}
                                            {cardType === 'UnionPay' && <span className="text-blue-500">UP</span>}
                                            {cardType === 'Mastercard' && <span className="text-red-500">MC</span>}
                                        </div>
                                        <div>
                                            <p className="text-sm">Seyi Adegbite</p>
                                            <p className="text-xs text-gray-500">{cardType}</p>
                                        </div>
                                    </td>
                                    <td className="td">•••• •••• •••• 1243</td>
                                    <td className="td">12/**</td>
                                    <td className="td">•••</td>
                                    <td className="td">
                                        <div className="flex items-center gap-1">
                                            <button><Eye className="h-4 w-4 text-gray-500" /></button>
                                            <button><Trash2 className="h-4 w-4 text-gray-500" /></button>
                                            <button><Edit className="h-4 w-4 text-gray-500" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

               
                </div>

            </div> */}

                    {/* Payment Methods */}
                    <div className="bg-white radius-md p-5 px-6 border flex flex-col gap-4 ">
                        <div className="flex justify-between items-center">
                            <p className="settings-text-medium">Payouts and revenue split</p>
                            <button onClick={openModal} className="flex items-center gap-1 settings-text-medium !text-[#221FCB]">
                                <Plus size={20} />
                                Add new payout details
                            </button>
                            {open && <PayoutCreateForm close={openModal} />}
                        </div>

                        <div className="bg-white rounded-lg border">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b h-[4.4rem]">
                                        <th className="th">Card Information</th>
                                        <th className="th">Card Number</th>
                                        <th className="th">Expiry Date</th>
                                        <th className="th">CVV/CVC</th>
                                        <th className="th"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['VISA', 'Stripe', 'UnionPay', 'Mastercard'].map((cardType, index) => (
                                        <tr key={index} className="border-b h-[7.2rem]">
                                            <td className="td">
                                                <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-xs">
                                                    {cardType === 'VISA' && <span className="text-blue-700">VISA</span>}
                                                    {cardType === 'Stripe' && <span className="text-indigo-500">Stripe</span>}
                                                    {cardType === 'UnionPay' && <span className="text-blue-500">UP</span>}
                                                    {cardType === 'Mastercard' && <span className="text-red-500">MC</span>}
                                                </div>
                                                <div>
                                                    <p className="text-sm">Seyi Adegbite</p>
                                                    <p className="text-xs text-gray-500">{cardType}</p>
                                                </div>
                                            </td>
                                            <td className="td">•••• •••• •••• 1243</td>
                                            <td className="td">12/**</td>
                                            <td className="td">•••</td>
                                            <td className="td">
                                                <div className="flex items-center gap-1">
                                                    <button><Eye className="h-4 w-4 text-gray-500" /></button>
                                                    <button><Trash2 className="h-4 w-4 text-gray-500" /></button>
                                                    <button><Edit className="h-4 w-4 text-gray-500" /></button>
                                                </div>
                                            </td>
                                            {/* {open && <UserDetailModal user={user} close={() => openModal()} />} */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {/* <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    /> */}
                        </div>

                    </div>

                    {/* Billing History */}
                    {/* <div className="mb-6">
                <h4 className="font-medium mb-4">Billing history and invoices</h4>

                <div className="border border-gray-200 rounded-md">
                    <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <div className="text-sm font-medium text-gray-500">Ticket ID</div>
                        <div className="text-sm font-medium text-gray-500">Date</div>
                        <div className="text-sm font-medium text-gray-500">Amount</div>
                        <div className="text-sm font-medium text-gray-500">Payment Method</div>
                        <div className="text-sm font-medium text-gray-500">Status</div>
                    </div>

                    <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200">
                        <div className="text-sm">INV-202501</div>
                        <div className="text-sm">Jan 13, 2024; 09:44AM</div>
                        <div className="text-sm">$49.99</div>
                        <div className="text-sm">Visa •••• 1234</div>
                        <div className="flex justify-between">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span>
                            <button className="text-blue-600 text-xs flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                [Download]
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200">
                        <div className="text-sm">INV-202501</div>
                        <div className="text-sm">Jan 13, 2024; 09:44AM</div>
                        <div className="text-sm">$49.99</div>
                        <div className="text-sm">Mastercard •••• 5678</div>
                        <div className="flex justify-between">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span>
                            <button className="text-blue-600 text-xs flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                [Download]
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200">
                        <div className="text-sm">INV-202501</div>
                        <div className="text-sm">Jan 13, 2024; 09:44AM</div>
                        <div className="text-sm">$49.99</div>
                        <div className="text-sm">PayPal - johndoe@email.com</div>
                        <div className="flex justify-between">
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Pending</span>
                            <button className="text-blue-600 text-xs flex items-center gap-1">
                                <RotateCcw className="h-3 w-3" />
                                [Retry]
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
                </div>
            </div>
        </div>
    )
}