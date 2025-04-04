import { FunctionalButton, MultiSelect } from '@/components/reuseable'
import { Switch } from '@/components/ui/switch'
import useToast from '@/hooks/useToast'
import { CreateAdmin } from '@/services/adminService'
import { Mail, X } from 'lucide-react'
import { useState } from 'react'
import { mutate } from 'swr'



export default function AdminCreateForm({ close }: ModalProps) {
    const toast = useToast()
    const roles = ['attendee', 'creator', 'admin', 'superAdmin', 'eventManager', 'ticketManager', 'systemAdmin']
    const [adminData, setAdminData] = useState({
        email: "",
        phone: "",
        role:  [],
        fullName: ""
    })
    const [loading, setLoading] = useState(false)
    const createAdmin = async () => {
        // console.log(adminData)
        try {
            setLoading(true)
            const response = await CreateAdmin(adminData)
            console.log(response)
             if (response?.error) {
                toast({
                    status: 'warning',
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
                    text: 'New roles assigned',
                    duration: 3000
                });
                setLoading(false)
                close()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        console.log(value)
        setAdminData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleTags = (value: string) => {
        console.log(value)
        setAdminData((prev:any) => ({
            ...prev,
            role:[value]
        }));
    }
// const ar = [ 'attendee', "hshs","jshsh" ] 
//     console.log(ar.toString(),ar.join(","))
    // console.log(adminData)


    return (
        <div className="fixed bg-[rgb(255, 255, 255)7] z-[10000] flex justify-center items-center backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[46rem]  h-[60rem] w-full mx-auto bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">
                    <p className="xs-text-medium">Add new admin member</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X className='!size-8' />
                    </button>
                </div>
                <div className='h-[80%] overflow-auto mt-4 p-[1.2rem] px-[1.6rem]'>
                    <div className='grid gap-4'>
                        <div>
                            <label className="auth-label">
                                Email Address
                            </label>
                            <div className="auth-input-container !w-full">
                                <Mail className="auth-input-icon" />
                                <input
                                    type="text"
                                    name="email"
                                    className="auth-input"
                                    placeholder="Enter email address"
                                    value={adminData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="auth-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                className="auth-input-container !w-full auth-input"
                                placeholder="Enter full name"
                                value={adminData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="auth-label">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                className="auth-input-container !w-full auth-input"
                                placeholder="Enter phone number"
                                value={adminData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="auth-label">
                                Assign user role
                            </label>
                            <MultiSelect
                                options={roles}
                                open={true}
                                addOptions={handleTags}
                                desc=''
                                multi={false}
                                singleValue={adminData?.role[0]}
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

                <div className="flex justify-end space-x-4 mt-4 p-4 border-t">
                    <FunctionalButton click={close} noIcn text='Cancel' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    <FunctionalButton disable={loading} click={createAdmin} noIcn text={loading?"Adding member...":"Add member"} />
                </div>
            </div>
        </div >
    )
}
