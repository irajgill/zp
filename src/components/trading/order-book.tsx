"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function OrderBook() {
  // Mock order book data
  const bids = [
    { price: "15.36", amount: "125.45", total: "1,927.71" },
    { price: "15.35", amount: "89.23", total: "1,369.68" },
    { price: "15.34", amount: "234.12", total: "3,591.40" },
    { price: "15.33", amount: "156.78", total: "2,403.43" },
    { price: "15.32", amount: "98.45", total: "1,508.66" },
  ]

  const asks = [
    { price: "15.38", amount: "145.23", total: "2,233.64" },
    { price: "15.39", amount: "78.90", total: "1,214.27" },
    { price: "15.40", amount: "201.34", total: "3,100.64" },
    { price: "15.41", amount: "167.89", total: "2,587.20" },
    { price: "15.42", amount: "112.56", total: "1,735.68" },
  ]

  return (
    <Card className="glass border-white/10 p-4">
      <h3 className="font-semibold text-white">Order Book</h3>

      <div className="mt-4 space-y-4">
        {/* Asks (Sell Orders) */}
        <div>
          <div className="mb-2 grid grid-cols-3 gap-2 text-xs text-slate-400">
            <span>Price (USDC)</span>
            <span className="text-right">Amount (APT)</span>
            <span className="text-right">Total</span>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {asks.reverse().map((ask, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-2 rounded px-2 py-1 text-xs transition-colors hover:bg-red-500/10"
                >
                  <span className="font-mono text-red-400">{ask.price}</span>
                  <span className="font-mono text-right text-white">{ask.amount}</span>
                  <span className="font-mono text-right text-slate-400">{ask.total}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Current Price */}
        <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 text-center">
          <p className="text-2xl font-bold text-white">15.37</p>
          <p className="text-xs text-green-400">+0.02 (+0.13%)</p>
        </div>

        {/* Bids (Buy Orders) */}
        <div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {bids.map((bid, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-2 rounded px-2 py-1 text-xs transition-colors hover:bg-green-500/10"
                >
                  <span className="font-mono text-green-400">{bid.price}</span>
                  <span className="font-mono text-right text-white">{bid.amount}</span>
                  <span className="font-mono text-right text-slate-400">{bid.total}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  )
}
