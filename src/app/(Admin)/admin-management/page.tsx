"use client"

import { FunctionalButton, Loader } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import AdminCreateForm from '@/features/users/components/adminCreateForm';
import AdminTable from '@/features/users/components/adminTable';
import { BrowseAllUsers } from '@/services/adminService';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

const AdminManagement = () => {
  const { initialData } = useAppContext()
  const { data: users = [], isLoading } = useSWR('all-users', BrowseAllUsers,{
    refreshInterval:5000,
    fallbackData:initialData.users
  }
  );
  // const [users, setUsers] = useState<User[]>(initialData.users);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    setCurrentPage(1)
    return users.filter((item:User) => {
      const matchesSearch = item.fullName?.toLowerCase().includes(searchTerm?.toLowerCase()) || item.email?.toLowerCase().includes(searchTerm?.toLowerCase());
      return matchesSearch;
    }).filter((user:User) => user.role.includes("admin") || user.role.includes("superAdmin"))
  }, [searchTerm, users])

  // users

//   useEffect(() => {
//     const fetchEvents = async () => {
//         try {
//             setLoading(true)
//             const user:any = await BrowseAllUsers();
//             //   console.log(data)
//             setUsers(user)
//             setLoading(false)
//         } catch (error) {
//             console.error("Error fetching events:", error);
//             setLoading(false)
//         }
//     };

//     fetchEvents();
// }, []);
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

console.log(users)

  const openModal = () => {
    setOpen(!open)
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  // console.log(filteredItems)

  return (
    <div className='grid gap-8'>
      {open && <AdminCreateForm close={() => openModal()} />}

      <div>
        <h2 className="md-text">Admin Roles & Permissions </h2>
        <p className="sm-text">Control admin access and manage permissions easily</p>
      </div>

      {/* Search and Filters */}
      <div className=" flex justify-between items-center">
        <div className="auth-input-container max-w-[34.3rem] !w-full">
          <Search className="text-[#667085] w-[1.5rem] h-[1.5rem]" />
          <input
            type="text"
            placeholder="Search for users..."
            className="auth-input "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FunctionalButton click={openModal} text='Add member' />
      </div>
      {/* {loading && <Loader />} */}
      {
      
      // !loading && 
      filteredItems.length > 0 && (
        <AdminTable
          filteredItems={filteredItems.slice(indexOfFirstItem, indexOfLastItem)}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AdminManagement;