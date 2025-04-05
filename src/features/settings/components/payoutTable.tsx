"use client"

import useToast from '@/hooks/useToast'
import { DeleteUserCard } from '@/services/supportService'
import { Edit, Eye, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { mutate } from 'swr'
import PayoutEdit from './editPayout'

interface Props {
    cards:Payout,
    user:User
}

export default function PayoutTable({cards,user}:Props) {
    const toast = useToast()
    const [payout, setPayout] = useState()
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(!open)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }
    
    const activateDelete = async () => {
        try {
            const response = await DeleteUserCard(user._id)
            console.log(response)
            if (response.data.message === "success") {
                toast({
                    status: 'success',
                    text: response.data.data.message,
                    duration: 3000,
                });
                mutate("user-card")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletePayout = async () => {
        toast({
            status: 'warning',
            text: "Are you sure you want to delete this payout detail?",
            duration: 30000,
            clickText: "Yes, delete",
            click: activateDelete
        });
    }
  return (
    <div className="bg-white rounded-lg border">
    <table className="w-full">
    <thead>
        <tr className="border-b h-[4.4rem]">
            <th className="th">Country</th>
            <th className="th">Bank Name</th>
            <th className="th">Bank Account</th>
            <th className="th">Fullname</th>
            <th className="th"></th>
        </tr>
    </thead>
    <tbody>
            <tr  className="border-b h-[7.2rem]">
                <td className="td">{cards?.country}</td>
                <td className="td">
                   {cards.bankName}
                </td>
                <td className="td">{cards?.accountNumber?.toString().slice(0,6)}</td>
                <td className="td">{`${cards?.firstName} ${cards?.lastName}`}</td>
                <td className="td">
                    <div className="flex items-center gap-4">
                        <button><Eye className=" text-gray-500" size={20} /></button>
                        <button onClick={deletePayout}><Trash2 className=" text-gray-500" size={20} /></button>
                        <button onClick={openModal}><Edit className=" text-gray-500" size={20} /></button>
                    </div>
                </td>
                {open && <PayoutEdit payouts={cards} close={() => openModal()} />}
            </tr>
        {/* {['VISA', 'Stripe', 'UnionPay', 'Mastercard'].map((cardType, index) => (
            <tr key={index} className="border-b h-[7.2rem]">
                <td className="td">
                   
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
        ))} */}
    </tbody>
</table>
</div>
  )
}
