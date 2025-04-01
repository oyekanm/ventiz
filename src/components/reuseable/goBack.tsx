import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBack() {
    const route = useRouter()
    return (
        < button onClick={() => route.back()} className=" sm-text flex items-center gap-2 text-gray-600 mb-6 px-4 py-2 rounded-lg border hover:bg-gray-50" >
            <ArrowLeft size={16} />
            <span>Back</span>
        </button >
    )
}
