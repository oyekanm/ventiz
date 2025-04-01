"use client"

import { FunctionalButton } from "@/components/reuseable";
import { Eye } from "lucide-react";
import { useState } from "react";

interface Props {
    activeTab: string;
    setActiveTab:any
}

export default function SecuritySettings({activeTab,setActiveTab}:Props) {
  const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]

  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
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
            <h3 className="text-lg font-medium mb-6">Security & Privacy Settings</h3>

            <div className="space-y-10">
              <div>
                <h4 className="text-md font-medium mb-6">Change Password</h4>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md pr-10"
                        value="••••••••••"
                        readOnly
                      />
                      <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Eye className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter password here"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Re-enter password here"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium mb-6">Account Recovery Options</h4>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Recovery Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="elijah.ayodele@3ventiz.co.uk"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-2">Security Question</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue="What is the name of my first pet?"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-2">Security Answer</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue="Montoya"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h4 className="text-md font-medium">Two-Factor Authentication</h4>
                <div
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'}`}
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${twoFactorAuth ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Login History & Active Sessions</h3>
              <button className="text-blue-600 text-sm">Log out from all sessions</button>
            </div>

            <div className="space-y-4">
              {[
                { device: 'MacBook Pro M3', active: true, date: 'Active Now' },
                { device: 'ZenBook Ultra X5', active: false, date: 'Jan 08, 2025; 08:45AM' },
                { device: 'ThinkPad X1 Carbon', active: false, date: 'Jan 08, 2025; 08:45AM', signedOut: true },
                { device: 'Spectre x360', active: false, date: 'Jan 08, 2025; 08:45AM' },
                { device: 'Surface Laptop Studio', active: false, date: 'Jan 08, 2025; 08:45AM', signedOut: true }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-200 h-12 w-12 flex items-center justify-center rounded">
                      <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">{session.device}</p>
                      <p className="text-xs text-gray-500">Last seen: {session.date}</p>
                    </div>
                  </div>
                  {session.signedOut ? (
                    <span className="text-sm text-red-600">Signed out</span>
                  ) : (
                    <button className="text-sm text-blue-600">Log out</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};