"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Shield } from "lucide-react"
import { toast } from "sonner"

interface OrderFormProps {
  pair: string
}

export function OrderForm({ pair }: OrderFormProps) {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [isPrivate, setIsPrivate] = useState(true)
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = () => {
    if (!price || !amount) {
      toast.error("Please fill in all fields")
      return
    }

    toast.success(`${orderType === "buy" ? "Buy" : "Sell"} order placed`, {
      description: `${amount} APT at $${price} ${isPrivate ? "(Private)" : ""}`,
    })

    setPrice("")
    setAmount("")
  }

  const total = price && amount ? (Number.parseFloat(price) * Number.parseFloat(amount)).toFixed(2) : "0.00"

  return (
    <Card className="glass border-white/10 p-6">
      <Tabs value={orderType} onValueChange={(v) => setOrderType(v as "buy" | "sell")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
            Sell
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-400">Private Order</span>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Price (USDC)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-white/10 bg-white/5 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Amount (APT)</Label>
            <Input
              type="number"
              step="0.0001"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-white/10 bg-white/5 text-white"
            />
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total</span>
              <span className="font-semibold text-white">${total} USDC</span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Buy APT
          </Button>
        </TabsContent>

        <TabsContent value="sell" className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-400">Private Order</span>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Price (USDC)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-white/10 bg-white/5 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Amount (APT)</Label>
            <Input
              type="number"
              step="0.0001"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-white/10 bg-white/5 text-white"
            />
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total</span>
              <span className="font-semibold text-white">${total} USDC</span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            Sell APT
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
