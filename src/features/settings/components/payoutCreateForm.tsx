import { FunctionalButton } from '@/components/reuseable'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import useToast from '@/hooks/useToast'
import { CreateAdmin } from '@/services/adminService'
import { CreateCard } from '@/services/supportService'
import axios from 'axios'
import { ChevronDown, Mail, MapPinIcon, UserRound, X } from 'lucide-react'
import React, { useState } from 'react'
import { mutate } from 'swr'



export default function PayoutCreateForm({ close }: ModalProps) {
    const user = JSON.parse(localStorage.getItem("user") as string)
    const [payout, setPayout] = useState({
        email: "",
        "country": "UK",
        "countryCurrency": "USD",
        "owner": "individual",
        "firstName": "John",
        "lastName": "Doe",
        "address": "123 Main St",
        "city": "New York",
        "postalCode": "10001",
        "countryAddress": "USA",
        "accountType": "savings",
        "bankName": "Bank of America",
        "sortCode": 123456,
        "accountNumber": 987654321,
        "isDefault": true
        // country: "",
        // countryCurrency: "",
        // owner: "company",
        // firstName: "",
        // lastName: "",
        // address: "",
        // city: "",
        // postalCode: "",
        // countryAddress: "",
        // accountType: "checkings",
        // bankName: "",
        // sortCode: 0,
        // accountNumber: 0,
        // isDefault: false
    })
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const createPayout = async () => {
        const { accountNumber, accountType, address, bankName, email, city, country, countryAddress, countryCurrency, firstName, isDefault, lastName, owner, postalCode, sortCode } = payout
        if (!accountNumber || !email || !accountType || !address || !bankName || !city || !country || !countryAddress || !countryCurrency || !firstName || !isDefault || !lastName || !owner || !postalCode || !sortCode) {
            toast({
                status: 'error',
                text: "fill all details",
                duration: 7000
            });
            return;
        }

        try {
            setLoading(true)
            const response = await CreateCard(payout)
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
                mutate("user-card")
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
                    <p className="xs-text-medium">ADD NEW PAYOUT ACCOUNT</p>
                    <button onClick={close} className="text-gray-500 hover:text-gray-700">
                        <X className='!size-8' />
                    </button>
                </div>
                <div className='h-[80%] overflow-auto mt-4 p-[1.2rem] px-[1.6rem]'>
                    <div>
                        <p className='xs-text-semi'>In which country and currency will you be paid?</p>

                        <div>
                            <label className="auth-label">
                                Country  <span className="text-red-500">*</span>
                            </label>
                            <div className='flex items-center gap-4'>
                                <div className='auth-input-container !w-[6.4rem]'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_769_14451)">
                                            <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#F0F0F0" />
                                            <path d="M2.06718 3.91089C1.28167 4.93288 0.689365 6.11081 0.344482 7.39046H5.54675L2.06718 3.91089Z" fill="#0052B4" />
                                            <path d="M19.6558 7.39042C19.3109 6.11081 18.7186 4.93288 17.9331 3.91089L14.4536 7.39042H19.6558Z" fill="#0052B4" />
                                            <path d="M0.344482 12.6086C0.689404 13.8883 1.28171 15.0662 2.06718 16.0881L5.54663 12.6086H0.344482Z" fill="#0052B4" />
                                            <path d="M16.0879 2.06649C15.0659 1.28098 13.888 0.688672 12.6084 0.34375V5.54598L16.0879 2.06649Z" fill="#0052B4" />
                                            <path d="M3.91162 17.9314C4.93361 18.7169 6.11155 19.3092 7.39116 19.6541V14.4519L3.91162 17.9314Z" fill="#0052B4" />
                                            <path d="M7.39111 0.34375C6.1115 0.688672 4.93357 1.28098 3.91162 2.06644L7.39111 5.54593V0.34375Z" fill="#0052B4" />
                                            <path d="M12.6084 19.6541C13.888 19.3092 15.0659 18.7169 16.0879 17.9314L12.6084 14.4519V19.6541Z" fill="#0052B4" />
                                            <path d="M14.4536 12.6086L17.9331 16.0882C18.7186 15.0662 19.3109 13.8882 19.6558 12.6086H14.4536Z" fill="#0052B4" />
                                            <path d="M19.9154 8.69566H11.3044H11.3044V0.0846484C10.8774 0.0290625 10.4421 0 10 0C9.55785 0 9.12262 0.0290625 8.69566 0.0846484V8.69559V8.69563H0.0846484C0.0290625 9.12262 0 9.55793 0 10C0 10.4421 0.0290625 10.8774 0.0846484 11.3043H8.69559H8.69563V19.9154C9.12262 19.9709 9.55785 20 10 20C10.4421 20 10.8774 19.971 11.3043 19.9154V11.3044V11.3044H19.9154C19.9709 10.8774 20 10.4421 20 10C20 9.55793 19.9709 9.12262 19.9154 8.69566Z" fill="#D80027" />
                                            <path d="M12.6086 12.6094L17.071 17.0718C17.2762 16.8666 17.472 16.6521 17.6588 16.4298L13.8384 12.6094H12.6086V12.6094Z" fill="#D80027" />
                                            <path d="M7.39122 12.6094H7.39114L2.92883 17.0717C3.13399 17.2769 3.34848 17.4727 3.57083 17.6595L7.39122 13.839V12.6094Z" fill="#D80027" />
                                            <path d="M7.3911 7.39093V7.39085L2.92876 2.92847C2.72352 3.13362 2.52774 3.34812 2.34094 3.57046L6.16137 7.39089H7.3911V7.39093Z" fill="#D80027" />
                                            <path d="M12.6086 7.39175L17.071 2.92933C16.8659 2.72409 16.6514 2.52831 16.429 2.34155L12.6086 6.16198V7.39175Z" fill="#D80027" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_769_14451">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <ChevronDown size={20} />
                                </div>
                                <div className="auth-input-container !w-full">
                                    {/* < className="auth-input-icon" /> */}
                                    <input
                                        type="text"
                                        name="country"
                                        className="auth-input"
                                        placeholder="United Kingdom"
                                        value={payout.country}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="auth-label">
                                Currency  <span className="text-red-500">*</span>
                            </label>
                            <div className="auth-input-container !w-full">
                                <UserRound className="auth-input-icon" />
                                <input
                                    type="text"
                                    name="countryCurrency"
                                    className="auth-input"
                                    placeholder="Enter Currency"
                                    value={payout.countryCurrency}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='xs-text-semi'>Account holder information</p>

                        <div className='grid gap-4 mt-4'>
                            <div className='flex items-center gap-8' >
                                <label className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={payout.owner === "individual"}
                                        onCheckedChange={(e) => setPayout(prev => ({ ...prev, owner: "individual" }))}
                                    />
                                    <p className="xs-text-normal">Individual</p>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={payout.owner === "company"}
                                        onCheckedChange={(e) => setPayout(prev => ({ ...prev, owner: "company" }))}
                                    />
                                    <p className="xs-text-normal">Company/Business</p>

                                </label>
                            </div>
                            <div>
                                <label className="auth-label">
                                    First name  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <UserRound className="auth-input-icon" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="auth-input"
                                        placeholder="Enter First name"
                                        value={payout.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="auth-label">
                                    Last name  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <UserRound className="auth-input-icon" />
                                    <input
                                        type="text"
                                        className="auth-input"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        value={payout.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <label className="auth-label">Email address</label>
                                <div className="auth-input-container">
                                    <Mail className="auth-input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Please enter your email address"
                                        className="auth-input"
                                        name="email"
                                        value={payout.email}
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
                                        checked={payout.accountType === "checkings"}
                                        onCheckedChange={(e) => setPayout(prev => ({ ...prev, accountType: "checkings" }))}
                                    />
                                    <p className="xs-text-normal">Checkings</p>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={payout.accountType === "savings"}
                                        onCheckedChange={(e) => setPayout(prev => ({ ...prev, accountType: "savings" }))}
                                    />
                                    <p className="xs-text-normal">Savings</p>

                                </label>
                            </div>


                        </div>
                        <p className='xs-text-semi'>Bank account information</p>
                        <div className='grid gap-4 mt-4'>
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
                                    Country Address  <span className="text-red-500">*</span>
                                </label>
                                <div className="auth-input-container !w-full">
                                    <MapPinIcon className="auth-input-icon" />
                                    <input
                                        type="text"
                                        name="countryAddress"
                                        className="auth-input"
                                        placeholder="Enter Address"
                                        value={payout.countryAddress}
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
                                        onChange={(e) => setPayout(prev => ({ ...prev, sortCode: parseFloat(e.target.value || "0") }))}
                                    />
                                </div>
                            </div>
                            {/* <div>
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
                                        // value={payout.city}
                                        // onChange={handleInputChange}
                                    />
                                </div>
                            </div> */}
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
                                        onChange={(e) => setPayout(prev => ({ ...prev, accountNumber: parseFloat(e.target.value || "0") }))}
                                    />
                                </div>
                            </div>
                            {/* <div>
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
                            </div> */}

                            <label className="flex items-center space-x-3">
                                <Checkbox
                                    checked={payout.isDefault}
                                    onCheckedChange={(e) => setPayout(prev => ({ ...prev, isDefault: !prev.isDefault }))}
                                />
                                <p className="xs-text-normal">Set bank account as default payout account</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4 p-4 border-t">
                    <FunctionalButton click={close} noIcn text='Cancel' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
                    {/* <FunctionalButton click={createPayout} noIcn text={"Add payout account"} /> */}
                    <FunctionalButton disable={loading} click={createPayout} noIcn text={loading ? "Adding account..." : "Add payout account"} />
                </div>
            </div >
        </div >
    )
}
