import { TrendingUp } from 'lucide-react'
import React from 'react'

interface Metric { 
  label: string, 
  value:string | number, 
  change: number, 
  period: string,
  percentile?:boolean
 }

export default function MetricsCard({change,label,period,value,percentile=false}:Metric) {
  return (
    <div className="bg-white p-[1.2rem] px-[1.6rem] radius-md border grid gap-4">
      <p className="xs-text !font-medium !text-[#475467]">{label}</p>
      <p className="text-[3rem] leading-[3.8rem] font-semibold ">{value}</p>
      <div className="flex items-center gap-4 text-sm text-green-600">
        <span className='xs-text-medium flex items-center border rounded-full p-[.2rem] px-[.8rem]'><TrendingUp className='text-[#079455] !w-8 !h-4' /> {change}{percentile?"%":""}</span>
        <span className="xs-text !font-medium !text-[#475467]">in {period}</span>
      </div>
    </div>
  )
}
