import { FunctionalButton, MultiSelect } from '@/components/reuseable'
import { Switch } from '@/components/ui/switch'
import { useAppContext } from '@/context/appContext'
import useToast from '@/hooks/useToast'
import { UpdateAdminUserDetail } from '@/services/adminService'
import axios from 'axios'
import { Mail, X } from 'lucide-react'
import React, { useState } from 'react'
import { mutate } from 'swr'


interface NotificationProps {
    close: any,
    admin: User
}


export default function EditRoleForm({ close, admin }: NotificationProps) {
    const toast = useToast()
    const roles = ['admin', 'superAdmin']

    const [adminData, setAdminData] = useState({
        role: admin.role,
    })
    const [loading, setLoading] = useState(false)

    const createAdmin = async () => {
        try {
            setLoading(true)
            const response = await UpdateAdminUserDetail(adminData, admin._id)
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
                mutate("all-users")
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

    const handleTags = (value: string) => {
        console.log(value)
        setAdminData(prev => ({
            ...prev,
            role:[value]
        }));
    }

    console.log(adminData, admin)

    return (
        <div className="fixed bg-[rgb(255, 255, 255)7] z-[10000] flex justify-center items-center backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[46rem]  h-[43rem] w-full mx-auto bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">
                    <p className="xs-text-medium">Edit Permissions for {admin.fullName}</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X className='!size-8' />
                    </button>
                </div>
                <div className='h-[75%] overflow-auto mt-4 p-[1.2rem] px-[1.6rem]'>
                    <div className='grid gap-4'>

                        <div>
                            <label className="auth-label">
                                Role Selection
                            </label>
                            <MultiSelect
                                options={roles}
                                open={true}
                                multi={false}
                                addOptions={handleTags}
                                desc=''
                                singleValue={adminData.role[0]}
                            />
                        </div>
                        <div>
                            <label className="auth-label">
                                Permissions
                            </label>
                        </div>
                        <div className='flex items-center justify-between '>
                            <label htmlFor='free-ticket' className="auth-label">View and manage users</label>
                            <Switch
                                id='free-ticket'
                                checked={true}
                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                            />
                        </div>
                        <div className='flex items-center justify-between '>
                            <label htmlFor='free-ticket' className="auth-label">Edit and publish events</label>
                            <Switch
                                id='free-ticket'
                                checked={true}
                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                            />
                        </div>
                        <div className='flex items-center justify-between '>
                            <label htmlFor='free-ticket' className="auth-label">Manage ticket sales</label>
                            <Switch
                                id='free-ticket'
                                checked={true}
                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                            />
                        </div>
                        <div className='flex items-center justify-between '>
                            <label htmlFor='free-ticket' className="auth-label">Modify system settings</label>
                            <Switch
                                id='free-ticket'
                                checked={true}
                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                            />
                        </div>
                        <div className='flex items-center justify-between '>
                            <label htmlFor='free-ticket' className="auth-label">Approve user registration</label>
                            <Switch
                                id='free-ticket'
                                checked={true}
                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                            />
                        </div>
                        <div className='flex items-center justify-between '>
                            <label htmlFor='free-ticket' className="auth-label">Manage ticket sales</label>
                            <Switch
                                id='free-ticket'
                                checked={true}
                            // onChange={(e) => handleTicketChange(index, "quantity", parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 p-4 border-t">
                    <FunctionalButton click={close} noIcn text='Cancel' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    <FunctionalButton disable={loading} click={createAdmin} noIcn text={loading? "Saving...":"Save changes"} />
                </div>
            </div>
        </div >
    )
}
