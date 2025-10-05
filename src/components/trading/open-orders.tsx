"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { toast } from "sonner"

export function OpenOrders() {
  const orders = [
    {
      id: "1",
      type: "buy",
      pair: "APT/USDC",
      price: "15.35",
      amount: "10.5",
      filled: "3.2",
      isPrivate: true,
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      type: "sell",
      pair: "APT/USDC",
      price: "15.42",
      amount: "5.8",
      filled: "0",
      isPrivate: false,
      timestamp: Date.now() - 7200000,
    },
  ]

  const handleCancel = (id: string) => {
    toast.success("Order cancelled")
  }

  if (orders.length === 0) {
    return (
      <Card className="glass border-white/10 p-12 text-center">
        <p className="text-slate-400">No open orders</p>
      </Card>
    )
  }

  return (
    <Card className="glass border-white/10 p-6">
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      order.type === "buy"
                        ? "border-green-500/50 bg-green-500/10 text-green-400"
                        : "border-red-500/50 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {order.type.toUpperCase()}
                  </Badge>
                  {order.isPrivate && (
                    <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
                      Private
                    </Badge>
                  )}
                </div>
                <p className="mt-2 font-semibold text-white">{order.pair}</p>
                <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400">Price: </span>
                    <span className="text-white">${order.price}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Amount: </span>
                    <span className="text-white">{order.amount}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400">Filled: </span>
                    <span className="text-white">
                      {order.filled}/{order.amount} (
                      {((Number.parseFloat(order.filled) / Number.parseFloat(order.amount)) * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCancel(order.id)}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
