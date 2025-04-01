import React from 'react'
import FunctionalButton from './functionalButton'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
    currentPage: number,
    totalPages: number,
    onPageChange: any,
    maxVisiblePages?: number,
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5
}: Props) {
    // Handle page change
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];

        // Always show first page
        if (totalPages <= maxVisiblePages) {
            // If total pages is less than max visible, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Calculate range to display
            const halfVisible = Math.floor(maxVisiblePages / 2);//3
            let startPage = Math.max(1, currentPage - halfVisible); //1
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1); //12

console.log(halfVisible,startPage,endPage)

            // Adjust if we're near the end
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            // Add first page if not included
            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push();
                }
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            // Add last page if not included
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push();
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    return (
        <div className="flex justify-between items-center p-4">
            <FunctionalButton
                click={() => handlePageChange(currentPage - 1)}
                disable={currentPage === 1}
                Icon={ArrowLeft} text='Previous'
                txtClr='text-[#344054]'
                bgClr='#ffff'
                clx='border border-[#D0D5DD]'
            />
            {/* <div className="flex items-center gap-2">
                {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
                    <span
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded ${page === 1 ? 'bg-gray-100' : ''
                            }`}
                    >
                        {page}
                    </span>
                ))}
            </div> */}
            <div className="flex items-center space-x-2">
                {pageNumbers.map((page, index) => (
                        <button
                            key={`page-${page}`}
                            onClick={() => handlePageChange(page)}
                            className={`h-8 w-8 flex items-center justify-center rounded-md ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                        >
                            {page}
                        </button>
                ))}
            </div>
            <FunctionalButton
                click={() => handlePageChange(currentPage + 1)}
                disable={currentPage === totalPages}
                Icon={ArrowRight}
                order={2} text='Next'
                txtClr='text-[#344054]'
                bgClr='#ffff'
                clx='border border-[#D0D5DD]'
            />
        </div>
    )
}
