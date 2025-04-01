import { FunctionalButton } from '@/components/reuseable'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { CreateAdmin } from '@/services/adminService'
import axios from 'axios'
import { Mail, MapPinIcon, UserRound, X } from 'lucide-react'
import React, { useState } from 'react'



export default function PayoutCreateForm({ close }: ModalProps) {
    const user = JSON.parse(localStorage.getItem("user") as string)
    const [payout, setPayout] = useState<Payout>({
        country: "",
        countryCurrency: "",
        owner: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        countryAddress: "",
        accountType: "",
        bankName: "",
        sortCode: 0,
        accountNumber: 0,
        isDefault: false
    })
    
    const createPayout = async () => {
        // console.log(adminData)
        // try {
        //     const response = await CreateAdmin(adminData)
        //     console.log(response)
        //     if (response.message === "success") {
        //         close()
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        console.log(value)
        setPayout(prev => ({
            ...prev,
            [name]: value
        }));
    };

    console.log(payout)


    return (
        <div className="fixed bg-[rgb(255, 255, 255)7] z-[10000] flex justify-center items-center backdrop-blur-[5px] bottom-0 left-0 right-0 top-0 h-full">
            <div className="max-w-[46rem]  h-[60rem] w-full mx-auto bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">
                    <p className="xs-text-medium">Add new admin member</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X className='!size-8' />
                    </button>
                </div>
                <div className='h-[85%] overflow-auto mt-4 p-[1.2rem] px-[1.6rem]'>
                    <div>
                        <p className='xs-text-semi'>In which country and currency will you be paid?</p>
                    </div>
                    <div>
                        <p className='xs-text-semi'>Account holder information</p>

                        <div className='grid gap-4'>
                            <div>
                                <label className="auth-label">
                                    Business name  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <UserRound className="auth-input-icon" />
                                    <input
                                        type="text"
                                        name="owner"
                                        className="auth-input"
                                        placeholder="Enter Business name"
                                        value={payout.owner}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">
                                    Address  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <MapPinIcon className="auth-input-icon" />
                                    <input
                                        type="text"
                                        name="address"
                                        className="auth-input"
                                        placeholder="Enter Address"
                                        value={payout.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">
                                    City  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <MapPinIcon className="auth-input-icon" />
                                    <input
                                        type="text"
                                        name="city"
                                        className="auth-input"
                                        placeholder="Enter City"
                                        value={payout.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className="auth-label">
                                        Postal code  <span className="text-red-500">*</span>
                                    </label>
                                    <div className="auth-input-container !w-full">
                                        <UserRound className="auth-input-icon" />
                                        <input
                                            type="number"
                                            name="postalCode"
                                            className="auth-input"
                                            placeholder="Enter Postal code"
                                            value={payout.postalCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="auth-label">
                                        County  <span className="text-red-500">*</span>
                                    </label>
                                    <div className="auth-input-container !w-full">
                                        <MapPinIcon className="auth-input-icon" />
                                        <input
                                            type="text"
                                            name="city"
                                            className="auth-input"
                                            placeholder="Enter County"
                                            // value={payout.}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-8' >
                                <label className="flex items-center space-x-3">
                                    <Checkbox
                                    // checked={eventData.visibility === "private" ? true : false}
                                    // onCheckedChange={(e) => pickEventVisibility("private")}
                                    />
                                    <p className="xs-text-normal">Checkings</p>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <Checkbox
                                    // checked={eventData.visibility === "private" ? true : false}
                                    // onCheckedChange={(e) => pickEventVisibility("private")}
                                    />
                                    <p className="xs-text-normal">Savings</p>

                                </label>
                            </div>
                            <div>
                                <label className="auth-label">
                                    Bank name  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <svg width="29" className="auth-input-icon" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16667 7.4992V14.1659M7.91667 7.4992V14.1659M12.0833 7.4992V14.1659M15.8333 7.4992V14.1659M2.5 15.4992L2.5 16.1659C2.5 16.6326 2.5 16.8659 2.59083 17.0442C2.67072 17.201 2.79821 17.3285 2.95501 17.4084C3.13327 17.4992 3.36662 17.4992 3.83333 17.4992H16.1667C16.6334 17.4992 16.8667 17.4992 17.045 17.4084C17.2018 17.3285 17.3293 17.201 17.4092 17.0442C17.5 16.8659 17.5 16.6326 17.5 16.1659V15.4992C17.5 15.0325 17.5 14.7991 17.4092 14.6209C17.3293 14.4641 17.2018 14.3366 17.045 14.2567C16.8667 14.1659 16.6334 14.1659 16.1667 14.1659H3.83333C3.36662 14.1659 3.13327 14.1659 2.95501 14.2567C2.79821 14.3366 2.67072 14.4641 2.59083 14.6209C2.5 14.7991 2.5 15.0325 2.5 15.4992ZM9.71076 2.56348L3.54409 3.93385C3.17154 4.01664 2.98527 4.05803 2.84622 4.15821C2.72358 4.24656 2.62727 4.36662 2.56762 4.50551C2.5 4.66297 2.5 4.85379 2.5 5.23543L2.5 6.16587C2.5 6.63258 2.5 6.86593 2.59083 7.04419C2.67072 7.201 2.79821 7.32848 2.95501 7.40837C3.13327 7.4992 3.36662 7.4992 3.83333 7.4992H16.1667C16.6334 7.4992 16.8667 7.4992 17.045 7.40837C17.2018 7.32848 17.3293 7.201 17.4092 7.0442C17.5 6.86594 17.5 6.63258 17.5 6.16587V5.23543C17.5 4.85379 17.5 4.66297 17.4324 4.50551C17.3727 4.36662 17.2764 4.24656 17.1538 4.15821C17.0147 4.05803 16.8285 4.01664 16.4559 3.93385L10.2892 2.56348C10.1813 2.53949 10.1273 2.5275 10.0728 2.52272C10.0244 2.51847 9.97564 2.51847 9.9272 2.52272C9.87267 2.5275 9.8187 2.53949 9.71076 2.56348Z" stroke="#667085" stroke-linecap="round" stroke-linejoin="round" />
                                        <line x1="28.5" y1="5" x2="28.5" y2="15" stroke="#667085" />
                                    </svg>

                                    <input
                                        type="text"
                                        name="bankName"
                                        className="auth-input"
                                        placeholder="Barclays"
                                        value={payout.bankName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">
                                    Sort code  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <svg width="29" className="auth-input-icon" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16667 7.4992V14.1659M7.91667 7.4992V14.1659M12.0833 7.4992V14.1659M15.8333 7.4992V14.1659M2.5 15.4992L2.5 16.1659C2.5 16.6326 2.5 16.8659 2.59083 17.0442C2.67072 17.201 2.79821 17.3285 2.95501 17.4084C3.13327 17.4992 3.36662 17.4992 3.83333 17.4992H16.1667C16.6334 17.4992 16.8667 17.4992 17.045 17.4084C17.2018 17.3285 17.3293 17.201 17.4092 17.0442C17.5 16.8659 17.5 16.6326 17.5 16.1659V15.4992C17.5 15.0325 17.5 14.7991 17.4092 14.6209C17.3293 14.4641 17.2018 14.3366 17.045 14.2567C16.8667 14.1659 16.6334 14.1659 16.1667 14.1659H3.83333C3.36662 14.1659 3.13327 14.1659 2.95501 14.2567C2.79821 14.3366 2.67072 14.4641 2.59083 14.6209C2.5 14.7991 2.5 15.0325 2.5 15.4992ZM9.71076 2.56348L3.54409 3.93385C3.17154 4.01664 2.98527 4.05803 2.84622 4.15821C2.72358 4.24656 2.62727 4.36662 2.56762 4.50551C2.5 4.66297 2.5 4.85379 2.5 5.23543L2.5 6.16587C2.5 6.63258 2.5 6.86593 2.59083 7.04419C2.67072 7.201 2.79821 7.32848 2.95501 7.40837C3.13327 7.4992 3.36662 7.4992 3.83333 7.4992H16.1667C16.6334 7.4992 16.8667 7.4992 17.045 7.40837C17.2018 7.32848 17.3293 7.201 17.4092 7.0442C17.5 6.86594 17.5 6.63258 17.5 6.16587V5.23543C17.5 4.85379 17.5 4.66297 17.4324 4.50551C17.3727 4.36662 17.2764 4.24656 17.1538 4.15821C17.0147 4.05803 16.8285 4.01664 16.4559 3.93385L10.2892 2.56348C10.1813 2.53949 10.1273 2.5275 10.0728 2.52272C10.0244 2.51847 9.97564 2.51847 9.9272 2.52272C9.87267 2.5275 9.8187 2.53949 9.71076 2.56348Z" stroke="#667085" stroke-linecap="round" stroke-linejoin="round" />
                                        <line x1="28.5" y1="5" x2="28.5" y2="15" stroke="#667085" />
                                    </svg>

                                    <input
                                        type="number"
                                        name="sortCode"
                                        className="auth-input"
                                        placeholder="1234-5678-91011"
                                        value={payout.sortCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">
                                    Re-enter sort code <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <svg width="29" className="auth-input-icon" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16667 7.4992V14.1659M7.91667 7.4992V14.1659M12.0833 7.4992V14.1659M15.8333 7.4992V14.1659M2.5 15.4992L2.5 16.1659C2.5 16.6326 2.5 16.8659 2.59083 17.0442C2.67072 17.201 2.79821 17.3285 2.95501 17.4084C3.13327 17.4992 3.36662 17.4992 3.83333 17.4992H16.1667C16.6334 17.4992 16.8667 17.4992 17.045 17.4084C17.2018 17.3285 17.3293 17.201 17.4092 17.0442C17.5 16.8659 17.5 16.6326 17.5 16.1659V15.4992C17.5 15.0325 17.5 14.7991 17.4092 14.6209C17.3293 14.4641 17.2018 14.3366 17.045 14.2567C16.8667 14.1659 16.6334 14.1659 16.1667 14.1659H3.83333C3.36662 14.1659 3.13327 14.1659 2.95501 14.2567C2.79821 14.3366 2.67072 14.4641 2.59083 14.6209C2.5 14.7991 2.5 15.0325 2.5 15.4992ZM9.71076 2.56348L3.54409 3.93385C3.17154 4.01664 2.98527 4.05803 2.84622 4.15821C2.72358 4.24656 2.62727 4.36662 2.56762 4.50551C2.5 4.66297 2.5 4.85379 2.5 5.23543L2.5 6.16587C2.5 6.63258 2.5 6.86593 2.59083 7.04419C2.67072 7.201 2.79821 7.32848 2.95501 7.40837C3.13327 7.4992 3.36662 7.4992 3.83333 7.4992H16.1667C16.6334 7.4992 16.8667 7.4992 17.045 7.40837C17.2018 7.32848 17.3293 7.201 17.4092 7.0442C17.5 6.86594 17.5 6.63258 17.5 6.16587V5.23543C17.5 4.85379 17.5 4.66297 17.4324 4.50551C17.3727 4.36662 17.2764 4.24656 17.1538 4.15821C17.0147 4.05803 16.8285 4.01664 16.4559 3.93385L10.2892 2.56348C10.1813 2.53949 10.1273 2.5275 10.0728 2.52272C10.0244 2.51847 9.97564 2.51847 9.9272 2.52272C9.87267 2.5275 9.8187 2.53949 9.71076 2.56348Z" stroke="#667085" stroke-linecap="round" stroke-linejoin="round" />
                                        <line x1="28.5" y1="5" x2="28.5" y2="15" stroke="#667085" />
                                    </svg>

                                    <input
                                        type="number"
                                        name="sortCode"
                                        className="auth-input"
                                        placeholder="1234-5678-91011"
                                        value={payout.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">
                                    Account number  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <svg width="29" className="auth-input-icon" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16667 7.4992V14.1659M7.91667 7.4992V14.1659M12.0833 7.4992V14.1659M15.8333 7.4992V14.1659M2.5 15.4992L2.5 16.1659C2.5 16.6326 2.5 16.8659 2.59083 17.0442C2.67072 17.201 2.79821 17.3285 2.95501 17.4084C3.13327 17.4992 3.36662 17.4992 3.83333 17.4992H16.1667C16.6334 17.4992 16.8667 17.4992 17.045 17.4084C17.2018 17.3285 17.3293 17.201 17.4092 17.0442C17.5 16.8659 17.5 16.6326 17.5 16.1659V15.4992C17.5 15.0325 17.5 14.7991 17.4092 14.6209C17.3293 14.4641 17.2018 14.3366 17.045 14.2567C16.8667 14.1659 16.6334 14.1659 16.1667 14.1659H3.83333C3.36662 14.1659 3.13327 14.1659 2.95501 14.2567C2.79821 14.3366 2.67072 14.4641 2.59083 14.6209C2.5 14.7991 2.5 15.0325 2.5 15.4992ZM9.71076 2.56348L3.54409 3.93385C3.17154 4.01664 2.98527 4.05803 2.84622 4.15821C2.72358 4.24656 2.62727 4.36662 2.56762 4.50551C2.5 4.66297 2.5 4.85379 2.5 5.23543L2.5 6.16587C2.5 6.63258 2.5 6.86593 2.59083 7.04419C2.67072 7.201 2.79821 7.32848 2.95501 7.40837C3.13327 7.4992 3.36662 7.4992 3.83333 7.4992H16.1667C16.6334 7.4992 16.8667 7.4992 17.045 7.40837C17.2018 7.32848 17.3293 7.201 17.4092 7.0442C17.5 6.86594 17.5 6.63258 17.5 6.16587V5.23543C17.5 4.85379 17.5 4.66297 17.4324 4.50551C17.3727 4.36662 17.2764 4.24656 17.1538 4.15821C17.0147 4.05803 16.8285 4.01664 16.4559 3.93385L10.2892 2.56348C10.1813 2.53949 10.1273 2.5275 10.0728 2.52272C10.0244 2.51847 9.97564 2.51847 9.9272 2.52272C9.87267 2.5275 9.8187 2.53949 9.71076 2.56348Z" stroke="#667085" stroke-linecap="round" stroke-linejoin="round" />
                                        <line x1="28.5" y1="5" x2="28.5" y2="15" stroke="#667085" />
                                    </svg>

                                    <input
                                        type="number"
                                        name="accountNumber"
                                        className="auth-input"
                                        placeholder="892100192"
                                        value={payout.accountNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">
                                    Re-enter sort code  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <svg width="29" className="auth-input-icon" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16667 7.4992V14.1659M7.91667 7.4992V14.1659M12.0833 7.4992V14.1659M15.8333 7.4992V14.1659M2.5 15.4992L2.5 16.1659C2.5 16.6326 2.5 16.8659 2.59083 17.0442C2.67072 17.201 2.79821 17.3285 2.95501 17.4084C3.13327 17.4992 3.36662 17.4992 3.83333 17.4992H16.1667C16.6334 17.4992 16.8667 17.4992 17.045 17.4084C17.2018 17.3285 17.3293 17.201 17.4092 17.0442C17.5 16.8659 17.5 16.6326 17.5 16.1659V15.4992C17.5 15.0325 17.5 14.7991 17.4092 14.6209C17.3293 14.4641 17.2018 14.3366 17.045 14.2567C16.8667 14.1659 16.6334 14.1659 16.1667 14.1659H3.83333C3.36662 14.1659 3.13327 14.1659 2.95501 14.2567C2.79821 14.3366 2.67072 14.4641 2.59083 14.6209C2.5 14.7991 2.5 15.0325 2.5 15.4992ZM9.71076 2.56348L3.54409 3.93385C3.17154 4.01664 2.98527 4.05803 2.84622 4.15821C2.72358 4.24656 2.62727 4.36662 2.56762 4.50551C2.5 4.66297 2.5 4.85379 2.5 5.23543L2.5 6.16587C2.5 6.63258 2.5 6.86593 2.59083 7.04419C2.67072 7.201 2.79821 7.32848 2.95501 7.40837C3.13327 7.4992 3.36662 7.4992 3.83333 7.4992H16.1667C16.6334 7.4992 16.8667 7.4992 17.045 7.40837C17.2018 7.32848 17.3293 7.201 17.4092 7.0442C17.5 6.86594 17.5 6.63258 17.5 6.16587V5.23543C17.5 4.85379 17.5 4.66297 17.4324 4.50551C17.3727 4.36662 17.2764 4.24656 17.1538 4.15821C17.0147 4.05803 16.8285 4.01664 16.4559 3.93385L10.2892 2.56348C10.1813 2.53949 10.1273 2.5275 10.0728 2.52272C10.0244 2.51847 9.97564 2.51847 9.9272 2.52272C9.87267 2.5275 9.8187 2.53949 9.71076 2.56348Z" stroke="#667085" stroke-linecap="round" stroke-linejoin="round" />
                                        <line x1="28.5" y1="5" x2="28.5" y2="15" stroke="#667085" />
                                    </svg>

                                    <input
                                        type="number"
                                        name="accountNumber"
                                        className="auth-input"
                                        placeholder="892100192"
                                        value={payout.accountNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <label className="flex items-center space-x-3">
                                <Checkbox
                                // checked={eventData.visibility === "private" ? true : false}
                                // onCheckedChange={(e) => pickEventVisibility("private")}
                                />
                                <p className="xs-text-normal">Checkings</p>
                            </label>

                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-4 p-4 border-t">
                        <FunctionalButton click={close} noIcn text='Cancel' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                        <FunctionalButton click={createPayout} noIcn text={"Add payout account"} />
                    </div>
                </div>
            </div >
        </div >
    )
}
