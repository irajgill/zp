"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderBook } from "@/components/trading/order-book"
import { TradingChart } from "@/components/trading/trading-chart"
import { OrderForm } from "@/components/trading/order-form"
import { OpenOrders } from "@/components/trading/open-orders"
import { TradeHistory } from "@/components/trading/trade-history"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

export function Trading() {
  const [selectedPair, setSelectedPair] = useState("APT/USDC")

  // Mock market data
  const marketData = {
    price: "15.37",
    change24h: "+2.45",
    high24h: "15.89",
    low24h: "14.92",
    volume24h: "1,234,567",
  }

  const isPositive = marketData.change24h.startsWith("+")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Trading</h1>
          <p className="mt-2 text-slate-400">Private trading with zero-knowledge proofs</p>
        </div>
        <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
          Private Mode Enabled
        </Badge>
      </div>

      {/* Market Stats */}
      <Card className="glass border-white/10 p-6">
        <div className="grid gap-6 md:grid-cols-5">
          <div>
            <p className="text-sm text-slate-400">Pair</p>
            <p className="mt-1 text-xl font-bold text-white">{selectedPair}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Price</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-xl font-bold text-white">${marketData.price}</p>
              <Badge
                variant="outline"
                className={`${
                  isPositive
                    ? "border-green-500/50 bg-green-500/10 text-green-400"
                    : "border-red-500/50 bg-red-500/10 text-red-400"
                }`}
              >
                {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                {marketData.change24h}%
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-400">24h High</p>
            <p className="mt-1 text-xl font-bold text-white">${marketData.high24h}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">24h Low</p>
            <p className="mt-1 text-xl font-bold text-white">${marketData.low24h}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">24h Volume</p>
            <p className="mt-1 text-xl font-bold text-white">${marketData.volume24h}</p>
          </div>
        </div>
      </Card>

      {/* Trading Interface */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left: Order Book */}
        <div className="lg:col-span-1">
          <OrderBook />
        </div>

        {/* Center: Chart */}
        <div className="lg:col-span-2 space-y-6">
          <TradingChart />
          <Tabs defaultValue="open" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="open">Open Orders</TabsTrigger>
              <TabsTrigger value="history">Trade History</TabsTrigger>
            </TabsList>
            <TabsContent value="open" className="mt-4">
              <OpenOrders />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <TradeHistory />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Order Form */}
        <div className="lg:col-span-1">
          <OrderForm pair={selectedPair} />
        </div>
      </div>
    </div>
  )
}
