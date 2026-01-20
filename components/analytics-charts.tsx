"use client"

import { useMemo } from "react"

interface ChartData {
    month: string
    revenue: number
}

interface AnalyticsChartsProps {
    data: ChartData[]
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
    const maxRevenue = useMemo(() => {
        const values = data.map(d => d.revenue)
        return Math.max(...values, 1000) // Default max to 1000 if no revenue
    }, [data])

    return (
        <div className="w-full h-64 flex items-end justify-between gap-2 pt-6">
            {data.map((item, index) => {
                const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0
                const displayHeight = isNaN(height) ? 0 : Math.max(height, 2)

                return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="relative w-full flex flex-col items-center justify-end h-full group">
                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                ${item.revenue.toLocaleString()}
                            </div>

                            {/* Bar */}
                            <div
                                className="w-full bg-gradient-to-t from-sky-500 to-sky-400 rounded-t-sm transition-all duration-500 group-hover:from-sky-400 group-hover:to-sky-300"
                                style={{ height: `${displayHeight}%` }}
                            ></div>
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium">{item.month}</span>
                    </div>
                )
            })}
        </div>
    )
}
