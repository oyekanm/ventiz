"use client"

import { FunctionalButton } from "@/components/reuseable";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/appContext";
import useToast from "@/hooks/useToast";
import { UpdateUserNotification } from "@/services/adminService";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
// USER_SERVICE /update-user-notification/{userId} PATCH {
//   "general": {
//     "email": true,
//     "sms": false,
//     "push": true
//   },
//   "ticketAndEvent": {
//     "ticketPurchase": true,
//     "eventCreation": false,
//     "eventReminder": true,
//     "refundDispute": false
//   },
//   "adminAndVendor": {
//     "newEventCreation": true,
//     "ticketSalesUpdate": true,
//     "lowTicketWarning": false,
//     "refundRequestAlert": true,
//     "newVendorApplicationApproval": false,
//     "paymentProcessing": true
//   }
// }
interface Props {
  activeTab: string;
  setActiveTab:any
}

export default function NotificationTab({activeTab,setActiveTab}:Props) {
  const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]

  const toast = useToast()
  const { user } = useAppContext()
  const [userNoti, setUserNoti] = useState({
    general: {
      email: user.adminNotificationPreferences.general.types.email,
      sms: user.adminNotificationPreferences.general.types.sms,
      push: user.adminNotificationPreferences.general.types.push,
      enableNotifications: user.adminNotificationPreferences.general.enableNotifications
    },
    ticketAndEvent: {
      ticketPurchase: user.adminNotificationPreferences.ticketAndEvent.ticketPurchase,
      eventCreation: user.adminNotificationPreferences.ticketAndEvent.eventCreation,
      eventReminder: user.adminNotificationPreferences.ticketAndEvent.eventReminder,
      refundDispute: user.adminNotificationPreferences.ticketAndEvent.refundDispute
    },
    adminAndVendor: {
      newEventCreation: user.adminNotificationPreferences.adminAndVendor.newEventCreation,
      ticketSalesUpdate: user.adminNotificationPreferences.adminAndVendor.ticketSalesUpdate,
      lowTicketWarning: user.adminNotificationPreferences.adminAndVendor.lowTicketWarning,
      refundRequestAlert: user.adminNotificationPreferences.adminAndVendor.refundRequestAlert,
      newVendorApplicationApproval: user.adminNotificationPreferences.adminAndVendor.newVendorApplicationApproval,
      paymentProcessing: user.adminNotificationPreferences.adminAndVendor.paymentProcessing
    }
  })
  const handleTicketChange = (field: string, name: string, value: any) => {
    if (field === "general") {
      setUserNoti(prev => {
        return {
          ...prev,
          general: {
            ...prev.general,
            [name]: value
          },
          // general:{
          //   ...prev.general,
          //   email:value
          // }
        }
      });
    }
    if (field === "adminAndVendor") {
      setUserNoti(prev => {
        return {
          ...prev,
          adminAndVendor: {
            ...prev.adminAndVendor,
            [name]: value
          },
        }
      });
    }
    if (field === "ticketAndEvent") {
      setUserNoti(prev => {
        return {
          ...prev,
          ticketAndEvent: {
            ...prev.ticketAndEvent,
            [name]: value
          },
        }
      });
    }
  };

  const updateNotification = async () => {
    try {
      const response = await UpdateUserNotification(userNoti, user._id)
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

  console.log(userNoti)
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="md-text">Settings</p>
          <p className="sm-text">Manage your account, preferences, and platform configurations</p>
        </div>
        <div className="flex items-center gap-4">
          <FunctionalButton noIcn text='Discard' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
          <FunctionalButton click={updateNotification} noIcn text='Save changes' />
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
          {/* General Notifications */}
          <div className="flex flex-col gap-4">
            <p className="settings-text-bold">Notification preferences</p>
            <div className="border border-gray-200 radius-md p-5 px-6 flex flex-col gap-8 ">
              <p className="settings-text-medium">General Notifications (For all users)</p>

              <div className="flex flex-col gap-4" >
                <div className="flex-basics">
                  <span className="settings-text-light">Enable/Disable all notifications</span>
                  <Switch
                    id='free-ticket'
                    checked={userNoti.general.enableNotifications}
                    onCheckedChange={(e) => handleTicketChange("general", "enableNotifications", e)}
                  // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Email notifications</span>
                  <Switch
                    checked={userNoti.general.email}
                    onCheckedChange={(e) => handleTicketChange("general", "email", e)}
                  // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">SMS notifications</span>
                  <Switch
                    checked={userNoti.general.sms}
                    onCheckedChange={(e) => handleTicketChange("general", "sms", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Push notifications</span>
                  <Switch
                    checked={userNoti.general.push}
                    onCheckedChange={(e) => handleTicketChange("general", "push", e)}
                  />
                </div>
              </div>
            </div>

            {/* Ticket and Event Notifications */}
            <div className="border border-gray-200 radius-md p-5 px-6 flex flex-col gap-8">
              <p className="settings-text-medium">Ticket and event notifications (For attendees)</p>

              <div className="flex flex-col gap-8">
                <div className="flex-basics">
                  <span className="settings-text-light">Ticket purchase confirmation</span>
                  <Switch
                    checked={userNoti.ticketAndEvent.ticketPurchase}
                    onCheckedChange={(e) => handleTicketChange("ticketAndEvent", "ticketPurchase", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Event registration confirmation</span>
                  <Switch
                    checked={userNoti.ticketAndEvent.eventCreation}
                    onCheckedChange={(e) => handleTicketChange("ticketAndEvent", "eventCreation", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Event reminder</span>
                  <Switch
                    checked={userNoti.ticketAndEvent.eventReminder}
                    onCheckedChange={(e) => handleTicketChange("ticketAndEvent", "eventReminder", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Refund and dispute updates</span>
                  <Switch
                    checked={userNoti.ticketAndEvent.refundDispute}
                    onCheckedChange={(e) => handleTicketChange("ticketAndEvent", "refundDispute", e)}
                  />
                </div>
              </div>
            </div>

            {/* Admin Notifications */}
            <div className="border border-gray-200 radius-md p-5 px-6 flex flex-col gap-8 ">
              <p className="settings-text-medium">Admin and vendor notifications</p>

              <div className="flex flex-col gap-4" >
                <div className="flex-basics">
                  <span className="settings-text-light">New event registration alerts</span>
                  <Switch
                    id='free-ticket'
                    checked={userNoti.adminAndVendor.newEventCreation}
                    onCheckedChange={(e) => handleTicketChange("adminAndVendor", "newEventCreation", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Ticket sales updates</span>
                  <Switch
                    checked={userNoti.adminAndVendor.ticketSalesUpdate}
                    onCheckedChange={(e) => handleTicketChange("adminAndVendor", "ticketSalesUpdate", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Low ticket stock warning</span>
                  <Switch
                    checked={userNoti.adminAndVendor.lowTicketWarning}
                    onCheckedChange={(e) => handleTicketChange("adminAndVendor", "lowTicketWarning", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Refund request alerts</span>
                  <Switch
                    checked={userNoti.adminAndVendor.refundRequestAlert}
                    onCheckedChange={(e) => handleTicketChange("adminAndVendor", "refundRequestAlert", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">New vendor application approval required</span>
                  <Switch
                    checked={userNoti.adminAndVendor.newVendorApplicationApproval}
                    onCheckedChange={(e) => handleTicketChange("adminAndVendor", "newVendorApplicationApproval", e)}
                  />
                </div>

                <div className="flex-basics">
                  <span className="settings-text-light">Payment processing and payout alerts</span>
                  <Switch
                    checked={userNoti.adminAndVendor.paymentProcessing}
                    onCheckedChange={(e) => handleTicketChange("adminAndVendor", "paymentProcessing", e)}
                  />
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            {/* <div className="border border-gray-200 rounded-md p-4">
          <h4 className="font-medium mb-4">Advanced settings and customization</h4>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Notification frequency</label>
            <div className="relative">
              <select className="w-full p-2 border border-gray-200 rounded pr-8 bg-white">
                <option>Daily</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

