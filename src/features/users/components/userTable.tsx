"use client"

import { Pagination, UserInfoCard } from '@/components/reuseable';
import { formatDateWithAMPM } from '@/utils/dateFormatter';
import React, { useState } from 'react'
import UserDetailModal from './userDetailModal';

interface Props {
    filteredItems:User[],
    currentPage: number,
    setCurrentPage: any,
}

export default function UserTable({filteredItems,currentPage,setCurrentPage}:Props) {
    const [open, setOpen] = useState(false)
    const itemsPerPage = 10
    
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const [user, setUser] = useState<any>()
  
    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  
  
    const getStatusStyle = (status: any) => {
      switch (status) {
        case 'pending':
          return 'bg-gray-100 text-gray-700';
        case 'disabled':
          return 'bg-red-50 text-red-700';
        case 'approved':
          return 'bg-green-50 text-green-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    };
  
    const openModal = () => {
      setOpen(!open)
      if (document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "scroll";
      }
    }
  
    const setPayload = (noti: any) => {
      // setUser(noti)
      openModal()
    }

  return (
    <div className="bg-white rounded-lg border">
        {open && <UserDetailModal  close={() => openModal()} />}
    <table className="w-full">
      <thead>
        <tr className="border-b h-[4.4rem]  ">
          <th className="th">
            <input type="checkbox" className="rounded" />
          </th>
          <th className="th">Users</th>
          <th className="th">User role</th>
          <th className="th">Registration Date & Time</th>
          <th className="th">Status</th>
          <th className="th"></th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((user: User) => (
          <tr key={user._id} className="border-b h-[7.2rem]">
            <td className="td">
              <input type="checkbox" className="rounded" />
            </td>
            <td className="td">
              <UserInfoCard name={user.fullName} other={user.email} />
            </td>
            <td className="td capitalize">{user.role[0]}</td>
            <td className="td">{formatDateWithAMPM(user.createdAt)}</td>
            <td className="td">
              <span className={`px-4 py-2 font-medium rounded-full  ${getStatusStyle(user.status)}`}>
                {user.status}
              </span>
            </td>
            <td className="td">
              <button disabled={open} onClick={() => setPayload(user)} className="text-blue-600 font-medium hover:underline">View details</button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>

    {/* Pagination */}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </div>
  )
}
