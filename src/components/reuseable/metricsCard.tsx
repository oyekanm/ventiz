import { TrendingUp } from 'lucide-react'
import React from 'react'

interface Metric {
  label: string,
  value: string | number,
  change: number,
  period: string,
  percentile?: boolean
}

export default function MetricsCard({ change, label, period, value, percentile = false }: Metric) {
  return (
    <div className="bg-white p-[1.2rem] px-[1.6rem] radius-md border grid gap-4">
      <p className="xs-text !font-medium !text-[#475467]">{label}</p>
      <p className="text-[3rem] leading-[3.8rem] font-semibold ">{value}</p>
      <div className="flex items-center gap-4 text-sm text-green-600">
        <span className='xs-text-medium flex items-center border rounded-full p-[.2rem] px-[.8rem]'><TrendingUp className='text-[#079455] !w-8 !h-4' /> {change}{percentile ? "%" : ""}</span>
        <span className="xs-text !font-medium !text-[#475467]">in {period}</span>
      </div>
    </div>
  )
}




// Component to display metrics
// export function MetricsOverview() {
//   const { metrics, timeRange, setTimeRange } = useMetrics(eventsData, ticketsData, usersData);
//   return (
//     <div className="metrics-overview">
    


//       <div className="metrics-grid">
//         <div className="metric-card">
//           <h3>Revenue generated</h3>
//           <div className="metric-value">£{metrics.revenue.value}</div>
//           <div className="metric-change">
//             {metrics.revenue.percentChange > 0 ? '↗' : '↘'}
//             {Math.abs(metrics.revenue.percentChange).toFixed(1)}%
//             in {timeRange === '24hours' ? '24 hours' :
//               timeRange === '7days' ? '7 days' :
//                 timeRange === '30days' ? '30 days' : 'all time'}
//           </div>
//         </div>

//         <div className="metric-card">
//           <h3>Total number of events</h3>
//           <div className="metric-value">{metrics.totalEvents.value}</div>
//           <div className="metric-change">
//             {metrics.totalEvents.percentChange > 0 ? '↗' : '↘'}
//             {Math.abs(metrics.totalEvents.percentChange).toFixed(1)}%
//             in {timeRange === '24hours' ? '24 hours' :
//               timeRange === '7days' ? '7 days' :
//                 timeRange === '30days' ? '30 days' : 'all time'}
//           </div>
//         </div>

//         <div className="metric-card">
//           <h3>Total number of event hosts</h3>
//           <div className="metric-value">{metrics.totalHosts.value}</div>
//           <div className="metric-change">
//             {metrics.totalHosts.percentChange > 0 ? '↗' : '↘'}
//             {Math.abs(metrics.totalHosts.percentChange).toFixed(1)}%
//             in {timeRange === '24hours' ? '24 hours' :
//               timeRange === '7days' ? '7 days' :
//                 timeRange === '30days' ? '30 days' : 'all time'}
//           </div>
//         </div>

//         <div className="metric-card">
//           <h3>Total tickets sold</h3>
//           <div className="metric-value">{metrics.totalTickets.value}</div>
//           <div className="metric-change">
//             {metrics.totalTickets.percentChange > 0 ? '↗' : '↘'}
//             {Math.abs(metrics.totalTickets.percentChange).toFixed(1)}%
//             in {timeRange === '24hours' ? '24 hours' :
//               timeRange === '7days' ? '7 days' :
//                 timeRange === '30days' ? '30 days' : 'all time'}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }