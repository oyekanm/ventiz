"use client"

import { FunctionalButton } from '@/components/reuseable';
import { ChevronDown } from 'lucide-react';
import React from 'react'

interface Props {
  activeTab: string;
  setActiveTab:any
}

// Integrations Tab Component
export default function IntegrationsTab({activeTab,setActiveTab}:Props) {
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
        <div>
          {/* Connected Apps */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Connected Apps</h3>
            <div className="border border-gray-200 rounded-md">
              <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="col-span-2 text-sm font-medium text-gray-500">Integration Name</div>
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className="text-sm font-medium text-gray-500">Last Sync</div>
                <div></div>
              </div>

              {/* Stripe */}
              <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200 items-center">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-8 w-8 bg-indigo-100 rounded flex items-center justify-center">
                    <span className="text-indigo-500 font-bold">S</span>
                  </div>
                  <span>Stripe</span>
                </div>
                <div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <div className="text-sm text-gray-500">Jan 13, 2024; 09:44AM</div>
                <div className="flex justify-end gap-2">
                  <button className="text-blue-600 text-sm">[Manage]</button>
                  <button className="text-red-600 text-sm">[Remove]</button>
                </div>
              </div>

              {/* Google Calendar */}
              <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200 items-center">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-8 w-8 rounded flex items-center justify-center">
                    <span className="text-blue-500">G</span>
                  </div>
                  <span>Google Calendar</span>
                </div>
                <div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <div className="text-sm text-gray-500">Jan 13, 2024; 09:44AM</div>
                <div className="flex justify-end gap-2">
                  <button className="text-blue-600 text-sm">[Manage]</button>
                  <button className="text-red-600 text-sm">[Remove]</button>
                </div>
              </div>

              {/* Zapier */}
              <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-200 items-center">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-8 w-8 rounded flex items-center justify-center">
                    <span className="text-orange-500">Z</span>
                  </div>
                  <span>Zapier</span>
                </div>
                <div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inactive</span>
                </div>
                <div className="text-sm text-gray-500">Jan 13, 2024; 09:44AM</div>
                <div className="flex justify-end">
                  <button className="text-blue-600 text-sm">[Connect]</button>
                </div>
              </div>

              {/* PayPal */}
              <div className="grid grid-cols-5 px-4 py-3 items-center">
                <div className="col-span-2 flex items-center gap-2">
                  <div className="h-8 w-8 rounded flex items-center justify-center">
                    <span className="text-blue-700">P</span>
                  </div>
                  <span>PayPal</span>
                </div>
                <div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inactive</span>
                </div>
                <div className="text-sm text-gray-500">Jan 13, 2024; 09:44AM</div>
                <div className="flex justify-end">
                  <button className="text-blue-600 text-sm">[Connect]</button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Gateway Integrations */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Payment Gateway Integrations</h3>
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium">Payment Processor</div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Default Payment Processor</div>
                  <div className="relative">
                    <select className="w-64 p-2 border border-gray-200 rounded pr-8 bg-white">
                      <option>Select One</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Enable automatic payouts</span>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CRM & Marketing Integrations */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">CRM & Marketing Integrations</h3>
            <div className="border border-gray-200 rounded-md p-4">
              <div className="font-medium mb-4">Enable Email Marketing Sync</div>

              <div className="flex items-center justify-between mb-3">
                <span>Mailchimp</span>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span>HubSpot</span>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span>ActiveCampaign</span>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>

              <div className="font-medium mb-4">Enable SMS Notifications</div>

              <div className="flex items-center justify-between mb-3">
                <span>Twilio</span>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span>MessageBird</span>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium">Sync Event Attendees to CRM</div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Default</div>
                  <div className="relative">
                    <select className="w-64 p-2 border border-gray-200 rounded pr-8 bg-white">
                      <option>HubSpot</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Access Control */}
          <div>
            <h3 className="text-lg font-medium mb-4">Security & Access Control</h3>
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium">OAuth Provider Configuration</div>
                <div className="flex gap-2">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Default</div>
                    <div className="relative">
                      <select className="p-2 border border-gray-200 rounded pr-8 bg-white">
                        <option>Google</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Rate Limits</div>
                    <input type="text" className="p-2 border border-gray-200 rounded w-full" value="30" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Enable IP Whitelisting for API Calls</span>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

