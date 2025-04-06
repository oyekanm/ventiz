"use client"

import { useAppContext } from "@/context/appContext";
import { ChevronDown, Download, Edit, Eye, Plus, RotateCcw, Trash2 } from "lucide-react"
import { useState } from "react";
import PayoutCreateForm from "./payoutCreateForm";
import { EmptyContainer, FunctionalButton, Loader } from "@/components/reuseable";
import useSWR, { mutate } from "swr";
import { DeleteUserCard, GetUserCard } from "@/services/supportService";
import useToast from "@/hooks/useToast";
import PayoutTable from "./payoutTable";

interface Props {
    activeTab: string;
    setActiveTab:any
}

// Billings Tab Component
export default function BillingsTab({activeTab,setActiveTab}:Props) {
    const { user } = useAppContext()
    const toast = useToast()
// cards
    const { data: cards,isLoading } = useSWR("user-card",()=> GetUserCard(user._id), {
        fallbackData: [],
        // refreshInterval: 5000
      });
    const [open, setOpen] = useState(false)

    const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]

  
    
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

                        {isLoading && <Loader />}
                        {!isLoading && !cards && <EmptyContainer text="You don't have any Payout detail create at the moment" />}

                       {!isLoading && cards && <PayoutTable cards={cards} user={user} />}

                    </div>
                </div>
            </div>
        </div>
    )
}