import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import FunctionalButton from './functionalButton';

interface Props {
    onDateRangeChange:any
}

export default function DateRangeFilter({ onDateRangeChange }:Props) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), // Default to last 7 days
    endDate: new Date(),
    key: 'selection'
  });

  // Format the date range for display
  const formattedDateRange = `${format(dateRange.startDate, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`;

  // Handle date range changes
  const handleDateRangeChange = (ranges:any) => {
    const { selection } = ranges;
    setDateRange(selection);
  };

  // Close the date picker and apply the filter
  const applyDateRange = () => {
    onDateRangeChange(dateRange);
    setDatePickerOpen(false);
  };

  // Handle clicks outside the date picker to close it
//   useEffect(() => {
//     function handleClickOutside(event) {
//       const picker = document.getElementById('date-range-picker');
//       const button = document.getElementById('date-range-button');
      
//       if (picker && button && 
//           !picker.contains(event.target) && 
//           !button.contains(event.target)) {
//         setDatePickerOpen(false);
//       }
//     }

//     if (datePickerOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [datePickerOpen]);

  return (
    <div className="bg-white">
      <FunctionalButton click={() => setDatePickerOpen(!datePickerOpen)} Icon={Calendar} text={formattedDateRange} txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />

      
      {datePickerOpen && (
        <div id="date-range-picker" className="centre !top-[5%]">
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleDateRangeChange}
            months={2}
            direction="horizontal"

            // showSelectionPreview={true}
            // moveRangeOnFirstSelection={false}
          />
          <div className="flex-basics !justify-end gap-8">
          <FunctionalButton click={() => setDatePickerOpen(false)} noIcn text='Cancel' txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
            <FunctionalButton click={applyDateRange} noIcn text='Apply Changes' />
          </div>
        </div>
      )}
    </div>
  );
}

// Example usage with a data table component
// export function UsersTable({ usersData }) {
//   const [filteredUsers, setFilteredUsers] = useState([]);
  
//   // Apply date range filter to users data
//   const handleDateRangeChange = (dateRange) => {
//     const { startDate, endDate } = dateRange;
    
//     // Make end date inclusive by setting it to the end of the day
//     const inclusiveEndDate = new Date(endDate);
//     inclusiveEndDate.setHours(23, 59, 59, 999);
    
//     // Filter users based on registration date
//     const filtered = usersData.filter(user => {
//       const registrationDate = new Date(user.registrationDate);
//       return registrationDate >= startDate && registrationDate <= inclusiveEndDate;
//     });
    
//     setFilteredUsers(filtered);
//   };

//   // Initialize filtered data
//   useEffect(() => {
//     setFilteredUsers(usersData);
//   }, [usersData]);

//   return (
//     <div className="users-table-container">
      
//           <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
//     </div>
//   );
// }