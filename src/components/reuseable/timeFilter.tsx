import React from 'react'
import FunctionalButton from './functionalButton';

interface Props {
    setTimeRange?: any
}

export default function TimeFilter({ setTimeRange }: Props) {
    const timeFilters = ['All time', '30 days', '7 days', '24 hours'];

    return (
        <div className="flex gap-4">
            {timeFilters.map((filter, index) => (
                <FunctionalButton 
                // click={() => setTimeRange(filter)} 
                key={index} noIcn text={filter} txtClr='text-[#344054]' bgClr='#ffff' clx='border border-[#D0D5DD]' />
            ))}
        </div>
    )
}
