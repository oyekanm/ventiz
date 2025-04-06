"use client"

import { FunctionalButton, MultiSelect } from "@/components/reuseable";
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
  setActiveTab: any
}

export default function NotificationTab({ activeTab, setActiveTab }: Props) {
  const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]
  const frequencies = ['daily', 'weekly']

  const toast = useToast()
  const { user } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [userNoti, setUserNoti] = useState({
    general: {
      email: user?.preference?.general.types.email,
      sms: user?.preference?.general.types.sms,
      push: user?.preference?.general.types.push,
      enableNotifications: user?.preference?.general.enableNotifications
    },
    ticketAndEvent: {
      ticketPurchase: user?.preference?.ticketAndEvent.ticketPurchase,
      eventCreation: user?.preference?.ticketAndEvent.eventCreation,
      eventReminder: user?.preference?.ticketAndEvent.eventReminder,
      refundDispute: user?.preference?.ticketAndEvent.refundDispute
    },
    adminAndVendor: {
      newEventCreation: user?.preference?.adminAndVendor.newEventCreation,
      ticketSalesUpdate: user?.preference?.adminAndVendor.ticketSalesUpdate,
      lowTicketWarning: user?.preference?.adminAndVendor.lowTicketWarning,
      refundRequestAlert: user?.preference?.adminAndVendor.refundRequestAlert,
      newVendorApplicationApproval: user?.preference?.adminAndVendor.newVendorApplicationApproval,
      paymentProcessing: user?.preference?.adminAndVendor.paymentProcessing
    },
    frequency: user?.preference?.frequency
  })
  const staleInfo = {
    general: {
      email: user?.preference?.general.types.email,
      sms: user?.preference?.general.types.sms,
      push: user?.preference?.general.types.push,
      enableNotifications: user?.preference?.general.enableNotifications
    },
    ticketAndEvent: {
      ticketPurchase: user?.preference?.ticketAndEvent.ticketPurchase,
      eventCreation: user?.preference?.ticketAndEvent.eventCreation,
      eventReminder: user?.preference?.ticketAndEvent.eventReminder,
      refundDispute: user?.preference?.ticketAndEvent.refundDispute
    },
    adminAndVendor: {
      newEventCreation: user?.preference?.adminAndVendor.newEventCreation,
      ticketSalesUpdate: user?.preference?.adminAndVendor.ticketSalesUpdate,
      lowTicketWarning: user?.preference?.adminAndVendor.lowTicketWarning,
      refundRequestAlert: user?.preference?.adminAndVendor.refundRequestAlert,
      newVendorApplicationApproval: user?.preference?.adminAndVendor.newVendorApplicationApproval,
      paymentProcessing: user?.preference?.adminAndVendor.paymentProcessing
    },
    frequency: user?.preference?.frequency
  }
  console.log(userNoti,user)
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
      setLoading(true)
      const response = await UpdateUserNotification(userNoti, user._id)
      console.log(response)
      if (response.message === "success") {
        mutate("single-user")
        toast({
          status: 'success',
          text: 'User Notification settings Updated',
          duration: 3000
        });
        setLoading(false)
        // close()
      }
      if (response?.error) {
        toast({
          status: 'error',
          text: response?.error,
          duration: 5000
        });
        setLoading(false)
        // close()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleTags = (value: string) => {
    console.log(value)
    setUserNoti((prev: any) => ({
      ...prev,
      frequency: value
    }));
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
          {/* <FunctionalButton click={updateNotification} noIcn text='Save changes' /> */}
          <FunctionalButton disable={loading || JSON.stringify(userNoti) === JSON.stringify(staleInfo)} click={updateNotification} noIcn text={loading ? "Saving..." : "Save changes"} />

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
            <div className="border border-gray-200 radius-md p-5 px-6 flex flex-col gap-8">
              <p className="settings-text-medium">Advanced settings and customization</p>

              <div className="w-full max-w-[32rem]">
                <label className="auth-label">
                  Notification frequency
                </label>
                <MultiSelect
                  options={frequencies}
                  open={true}
                  addOptions={handleTags}
                  desc=''
                  multi={false}
                  singleValue={userNoti?.frequency}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

