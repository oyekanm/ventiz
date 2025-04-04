"use client"

import { DateRangeFilter, FunctionalButton, Loader, Pagination, UserInfoCard } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import UserDetailModal from '@/features/users/components/userDetailModal';
import { useFetchData } from '@/hooks/useFetchData';
import { useUsers } from '@/hooks/useReuseableSwr';
import { BrowseAllUsers } from '@/services/adminService';
import { formatDateWithAMPM } from '@/utils/dateFormatter';
import { ArrowLeft, ArrowRight, Calendar, Filter, ListFilter, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-date-range';
import useSWR, { preload } from 'swr';



export default function UserManagement() {
  const { initialData } = useAppContext()
  const { data: users = [] } = useSWR('all-users', BrowseAllUsers, {
    refreshInterval: 30000,
    fallbackData: initialData.users
  });

  // const [users, setUsers] = useState<User[]>(initialData.users);
  const [loading, setLoading] = useState(false);

  console.log(users)

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
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<any>()
  const [dateRange, setDateRange] = useState<any>(
    {
      startDate: null,
      endDate: null,
    }
  )

  //   // Apply date range filter to users data
  const handleDateRangeChange = (datesRange: any) => {
    const { startDate, endDate } = datesRange;

    // Make end date inclusive by setting it to the end of the day
    const inclusiveEndDate = new Date(endDate);
    inclusiveEndDate.setHours(23, 59, 59, 999);

    setDateRange({
      endDate: inclusiveEndDate as any,
      startDate: startDate
    })
  };
  const dateReset = () => {
    setDateRange(
      {
        startDate: null,
        endDate: null,
      }
    )
  }

  const filteredItems = useMemo(() => {
    setCurrentPage(1)
    return users?.filter((item: User) => {
      const matchesSearch = item.fullName?.toLowerCase().includes(searchTerm?.toLowerCase()) || item.email?.toLowerCase().includes(searchTerm?.toLowerCase());
      // const matchesCategory = categoryFilter === "all" || item.eventType. categoryFilter;
      // return matchesSearch && matchesCategory;
      return matchesSearch;
    }).filter((user: User) => !user.role.includes("admin") && !user.role.includes("superAdmin"))
      .filter((user: User) => {
        const registrationDate = new Date(user.createdAt);
        const filter = registrationDate >= dateRange.startDate && registrationDate <= dateRange.endDate;

        if (!dateRange.startDate || !dateRange.endDate) {
          return user
        }

        return filter;
      });
  }, [users, searchTerm, JSON.stringify(dateRange)]);

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  console.log(JSON.stringify(dateRange))

  const getStatusStyle = (status: any) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      case 'disabled':
        return 'bg-red-50 text-red-700';
      case 'approved':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const openModal = () => {
    setOpen(!open)
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }

  const setPayload = (noti: any) => {
    setUser(noti)
    openModal()
  }

  return (
    <div className='grid gap-8'>
      <div>
        <h2 className="md-text">Track registered users </h2>
        <p className="sm-text">View, manage, and track users activity</p>
      </div>

      <div className='grid gap-6 '>
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
          <div className='flex items-center gap-4'>
            <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
            {dateRange.startDate && <button onClick={dateReset} className="text-blue-600 font-medium text-[1.3rem] hover:underline">reset</button>}

          </div>
          {/* <FunctionalButton Icon={Calendar} text='Jan 12, 2024 - Jan 18, 2024' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' /> */}
        </div>
        {open && <UserDetailModal user={user} close={() => openModal()} />}

        {/* {loading && <Loader />} */}
        {
          // !loading && 
          users.length > 0 && (
            <div className="bg-white rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b h-[4.4rem]  ">
                    <th className="th">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="th">Users</th>
                    <th className="th">User role</th>
                    <th className="th">Registration Date & Time</th>
                    <th className="th">Status</th>
                    <th className="th"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((user: User) => (
                    <tr key={user._id} className="border-b h-[7.2rem]">
                      <td className="td">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="td">
                        <UserInfoCard name={user.fullName} other={user.email} />
                      </td>
                      <td className="td capitalize">{user.role[0]}</td>
                      <td className="td">{formatDateWithAMPM(user.createdAt)}</td>
                      <td className="td">
                        <span className={`px-4 py-2 font-medium rounded-full  ${getStatusStyle(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="td">
                        <button disabled={open} onClick={() => setPayload(user)} className="text-blue-600 font-medium hover:underline">View details</button>
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
          )}
        {/* Users Table */}

      </div>

    </div>
  );
};
