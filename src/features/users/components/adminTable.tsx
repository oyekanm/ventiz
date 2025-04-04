import { Pagination, UserInfoCard } from '@/components/reuseable';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import EditRoleForm from './editPermission';
import { formatDateWithAMPM } from '@/utils/dateFormatter';

interface Props {
    filteredItems: User[],
    currentPage: number,
    totalPages: number,
    setCurrentPage: any,
}

export default function AdminTable({ filteredItems, currentPage, setCurrentPage, totalPages }: Props) {
    // 
    const [open, setOpen] = useState(false)
    const [admin,setAdmin] = useState<any>()

    const openModal = () => {
        setOpen(!open)
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }
    const setPayload = (noti: any) => {
        setAdmin(noti)
        openModal()
      }

    // console.log(filteredItems)

    return (
        <div className='grid gap-4 '>
            {open && <EditRoleForm admin={admin} close={() => openModal()} />}

            <div>
                <p className="xs-text !font-medium !text-[#344054]">
                    Showing {filteredItems.length} admin members
                </p>
            </div>
            <div>
                {/* Table */}
                <div className="bg-white rounded-lg border">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b h-[4.4rem]  ">
                                <th className="th">
                                    <input type="checkbox" className="rounded" />
                                </th>
                                <th className="th">Users</th>
                                <th className="th">Role</th>
                                <th className="th">
                                    <span className="flex items-center gap-2">
                                        Last Active
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                </th>
                                <th className="th"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(user => (
                                <tr key={user._id} className="border-b h-[7.2rem]">
                                    <td className="td">
                                        <input type="checkbox" className="rounded" />
                                    </td>
                                    <td className="td">
                                        <UserInfoCard name={user.fullName} other={user.email} />
                                    </td>
                                    <td className="td capitalize">{user.role[0]}</td>
                                    <td className="td">{formatDateWithAMPM(user?.lastLogin)}</td>
                                    <td className="td">
                                        <button  disabled={open}  onClick={()=>setPayload(user)} className="text-blue-600 font-semibold hover:underline">Edit permissions</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}
