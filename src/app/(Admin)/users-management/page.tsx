"use client"

import { DateRangeFilter } from '@/components/reuseable';
import { useAppContext } from '@/context/appContext';
import UserTable from '@/features/users/components/userTable';
import { BrowseAllUsers } from '@/services/adminService';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';



export default function UserManagement() {
  const { initialData } = useAppContext()
  const { data: users = [] } = useSWR('all-users', BrowseAllUsers, {
    // refreshInterval: 30000,
    fallbackData: initialData.users
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
  }, [searchTerm, users, JSON.stringify(dateRange)]);



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


        {/* {loading && <Loader />} */}
        {
          // !loading && 
          users.length > 0 && (
            <UserTable
              filteredItems={filteredItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        {/* Users Table */}

      </div>

    </div>
  );
};
