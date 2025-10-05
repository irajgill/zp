"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function TradingChart() {
  // Mock chart data
  const data = [
    { time: "00:00", price: 14.92 },
    { time: "04:00", price: 15.12 },
    { time: "08:00", price: 15.05 },
    { time: "12:00", price: 15.28 },
    { time: "16:00", price: 15.45 },
    { time: "20:00", price: 15.37 },
  ]

  return (
    <Card className="glass border-white/10 p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Price Chart</h3>
        <div className="flex gap-2">
          {["1H", "4H", "1D", "1W", "1M"].map((interval) => (
            <button
              key={interval}
              className="rounded px-3 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              {interval}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: "12px" }}
              domain={["dataMin - 0.1", "dataMax + 0.1"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Line type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
