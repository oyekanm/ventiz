"use client"

import { FunctionalButton } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import useToast from '@/hooks/useToast';
import { UpdateAdminUserDetail } from '@/services/adminService';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { mutate } from 'swr';

interface Props {
  activeTab: string;
  setActiveTab:any
}

export default function MyAccount({activeTab,setActiveTab}:Props) {
  const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]

  const { user } = useAppContext()
  const toast = useToast()
  const [info, setInfo] = useState({
    fullName: user?.fullName,
    role: user?.role,
    email: user?.email
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log(value)
    setInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const updateDetail = async () => {
    try {
      const response = await UpdateAdminUserDetail(info, user._id)
      console.log(response)
      if (response.message === "success") {
        mutate("single-user")
        toast({
          status: 'success',
          text: 'User Info Updated',
          duration: 3000
        });
        close()
      }
    } catch (error) {
      console.log(error)
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
          <FunctionalButton noIcn text='Discard' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
          <FunctionalButton click={updateDetail} noIcn text='Save changes' />
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
          <section className="flex flex-col gap-4 ">
            <p className="settings-text-bold">Account settings</p>
            <div className="bg-white radius-md p-5 px-6 border flex flex-col gap-4 ">
              <div className='grid grid-cols-3 gap-4'>
                <p className="settings-text-medium">Profile Information</p>
                <div>
                  <label className="auth-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="auth-input-container !w-full auth-input"
                    placeholder="Enter your name"
                    value={info.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="auth-label">
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="auth-input-container !w-full auth-input"
                    placeholder="Enter your email"
                    value={info.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className=" grid grid-cols-3 gap-4 ">
                <p className="settings-text-medium">User Role</p>
                <div>
                  <label className="auth-label">
                    Role
                  </label>
                  <select defaultValue={info.role} className="auth-input-container !w-full auth-input">
                    <option>{info.role}</option>
                  </select>
                </div>

              </div>
            </div>
          </section>

        

          <section className="flex flex-col gap-4 ">
            <div className='flex justify-between items-center'>
              <p className="settings-text-bold">Login History & Active Sessions</p>
              <button className="xs-text !font-semibold !text-[#19499E]">Log out from all sessions</button>
            </div>
            <div className="space-y-4 bg-white radius-md p-5 px-6 border">
              {[
                { device: 'MacBook Pro M3', status: 'Active Now', action: 'Log out' },
                { device: 'ZenBook Ultra X5', lastSeen: 'Jan 08, 2025; 08:45AM', action: 'Log out' },
                { device: 'ThinkPad X1 Carbon', lastSeen: 'Jan 08, 2025; 08:45AM', status: 'Signed out' },
                { device: 'Spectre x360', lastSeen: 'Jan 08, 2025; 08:45AM', action: 'Log out' },
                { device: 'Surface Laptop Studio', lastSeen: 'Jan 08, 2025; 08:45AM', status: 'Signed out' }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-200 rounded" />
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-gray-600">
                        Last seen: {session.status || session.lastSeen}
                      </p>
                    </div>
                  </div>
                  {session.action && (
                    <button className="text-indigo-600">{session.action}</button>
                  )}
                  {session.status === 'Signed out' && (
                    <span className="text-red-600">Signed out</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
