"use client"

import { FunctionalButton } from "@/components/reuseable";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/appContext";
import useToast from "@/hooks/useToast";
import { UpdateAdminUserSecurity } from "@/services/adminService";
import { Eye } from "lucide-react";
import { useState } from "react";

interface Props {
  activeTab: string;
  setActiveTab: any
}

// /admin-security/{userId} PATCH {password: {oldPassword, newPassword}, mfa: boolean, recoveryMail: string, securityQuestions: {question: string, answer: string}[] }

export default function SecuritySettings({ activeTab, setActiveTab }: Props) {
  const tabs = ["My account", "Notification", "Billings", "Security", "Event & ticketing", "Integrations"]

  const {user} = useAppContext()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [securityInfo, setSecurityInfo] = useState(
    {
      password: {
        oldPassword: "",
        newPassword: ""
      },
      mfa: false,
      recoveryMail: "",
      securityQuestions: [{
        question: "",
        answer: ""
      }]
    }
  )

  const UpdateSecurity = async () => {

    try {
      setLoading(true)
      const response = await UpdateAdminUserSecurity(securityInfo, user._id)
      console.log(response)
      if (response?.error) {
        toast({
          status: 'error',
          text: response?.error,
          duration: 5000
        });
        setLoading(false)
        // close()
      }
      if (response?.message === "success") {
        toast({
          status: 'success',
          text: 'User Role Updated',
          duration: 3000
        });
        setLoading(false)
        close()
      }

    } catch (error) {
      console.log(error)
    }
  }

  console.log(securityInfo)

  const handleSQ = (index: number, field: string, value: any) => {
    const updatedSqa = [...securityInfo.securityQuestions];
    const update = {
      ...updatedSqa[index],
      [field]: value,
    }

    updatedSqa[index] = update;
    // console.log(value, field)

    setSecurityInfo(prev => {
      return {
        ...prev,
        securityQuestions: updatedSqa,
      }
    });
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
          {/* <FunctionalButton noIcn text='Save changes' /> */}
          <FunctionalButton disable={loading} click={UpdateSecurity} noIcn text={loading ? "Saving..." : "Save changes"} />

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
          <p className="settings-text-bold">Security & Privacy Settings</p>
          <div className="bg-white radius-md p-5 px-6 border flex flex-col gap-4 ">
            <div className='grid grid-cols-3 gap-4'>
              <p className="settings-text-medium">Change Password</p>
              <div className="col-span-2 flex flex-col gap-8">
                <div className="grid grid-cols-2 items-start">
                  <div>
                    <label className="auth-label">
                      Current Password
                    </label>
                    <input
                      type="text"
                      name="oldpassword"
                      className="auth-input-container !w-full auth-input"
                      placeholder="Enter your current password"
                      value={securityInfo.password.oldPassword}
                      onChange={(e) => setSecurityInfo(prev => ({ ...prev, password: { ...prev.password, oldPassword: e.target.value } }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="auth-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newpassword"
                      className="auth-input-container !w-full auth-input"
                      placeholder="Enter your password here"
                      value={securityInfo.password.newPassword}
                      onChange={(e) => setSecurityInfo(prev => ({ ...prev, password: { ...prev.password, newPassword: e.target.value } }))}
                    />
                  </div>
                  <div>
                    <label className="auth-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="country"
                      className="auth-input-container !w-full auth-input"
                      placeholder="Re-enter password here"
                    // value={info.fullName}
                    // onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className="settings-text-medium">Account Recovery Options</p>
              <div className="col-span-2 flex flex-col gap-8">
                <div className="grid grid-cols-2 items-start">
                  <div>
                    <label className="auth-label">
                      Recovery Email
                    </label>
                    <input
                      type="text"
                      name="recoverymail"
                      className="auth-input-container !w-full auth-input"
                      placeholder="Enter an email here"
                      value={securityInfo.recoveryMail}
                      onChange={(e) => setSecurityInfo(prev => ({ ...prev, recoveryMail: e.target.value }))}
                    />
                  </div>
                </div>
                {securityInfo?.securityQuestions?.map((sqa, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="auth-label">
                        Security Question
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="auth-input-container !w-full auth-input"
                        placeholder="Enter your Address"
                        value={sqa.question}
                        onChange={(e) => handleSQ(index, "question", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="auth-label">
                        Security Answer
                      </label>
                      <input
                        type="text"
                        name="securityanswer"
                        className="auth-input-container !w-full auth-input"
                        placeholder="Enter your answer"
                        value={sqa.answer}
                        onChange={(e) => handleSQ(index, "answer", e.target.value)}

                      />
                    </div>
                  </div>
                ))}

              </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='flex items-center justify-between '>
                <label htmlFor='tfa' className="auth-label">Two-Factor Authentication</label>
                <Switch
                  id='tfa'
                  checked={securityInfo.mfa}
                  onCheckedChange={() => setSecurityInfo(prev => ({ ...prev, mfa: !prev.mfa }))}
                // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};