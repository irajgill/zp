"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatTimestamp } from "@/lib/utils"

export function TradeHistory() {
  const trades = [
    {
      id: "1",
      type: "buy",
      pair: "APT/USDC",
      price: "15.34",
      amount: "8.5",
      total: "130.39",
      isPrivate: true,
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      type: "sell",
      pair: "APT/USDC",
      price: "15.28",
      amount: "12.3",
      total: "187.94",
      isPrivate: false,
      timestamp: Date.now() - 7200000,
    },
    {
      id: "3",
      type: "buy",
      pair: "APT/USDC",
      price: "15.12",
      amount: "5.7",
      total: "86.18",
      isPrivate: true,
      timestamp: Date.now() - 10800000,
    },
  ]

  if (trades.length === 0) {
    return (
      <Card className="glass border-white/10 p-12 text-center">
        <p className="text-slate-400">No trade history</p>
      </Card>
    )
  }

  return (
    <Card className="glass border-white/10 p-6">
      <div className="space-y-3">
        {trades.map((trade) => (
          <div key={trade.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      trade.type === "buy"
                        ? "border-green-500/50 bg-green-500/10 text-green-400"
                        : "border-red-500/50 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </Badge>
                  {trade.isPrivate && (
                    <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
                      Private
                    </Badge>
                  )}
                </div>
                <p className="mt-2 font-semibold text-white">{trade.pair}</p>
                <div className="mt-1 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400">Price: </span>
                    <span className="text-white">${trade.price}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Amount: </span>
                    <span className="text-white">{trade.amount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Total: </span>
                    <span className="text-white">${trade.total}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-400">{formatTimestamp(trade.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
