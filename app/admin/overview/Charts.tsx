'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

type salesDataType = {
  month: string
  totalSales: number
}[]

export default function Charts({ salesData }: { salesData: salesDataType }) {
  console.log(salesData)

  return (
    <ResponsiveContainer width='100%' height={350}>
      {}
      <BarChart data={salesData}>
        <XAxis
          dataKey='month'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          // dataKey='month'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey='totalSales'
          fill='current' // fills the current color
          radius={[4, 4, 4, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
