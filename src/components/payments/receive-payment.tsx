"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, QrCode, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { generateCommitment } from "@/lib/utils"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

export function ReceivePayment() {
  const { account } = useWallet()
  const [commitment, setCommitment] = useState(generateCommitment(account?.address || ""))

  const regenerateCommitment = () => {
    setCommitment(generateCommitment(account?.address + Date.now().toString()))
    toast.success("New commitment generated")
  }

  const copyCommitment = () => {
    navigator.clipboard.writeText(commitment)
    toast.success("Commitment copied to clipboard")
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="glass border-white/10 p-6">
        <h2 className="text-2xl font-semibold text-white">Receive Private Payment</h2>
        <p className="mt-2 text-slate-400">Share your commitment hash to receive confidential payments</p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Your Commitment Hash</Label>
            <div className="flex gap-2">
              <Input value={commitment} readOnly className="border-white/10 bg-white/5 font-mono text-white" />
              <Button
                variant="outline"
                size="icon"
                onClick={copyCommitment}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={regenerateCommitment}
            className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Commitment
          </Button>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="flex aspect-square items-center justify-center rounded-lg bg-white">
              <QrCode className="h-32 w-32 text-slate-900" />
            </div>
            <p className="mt-4 text-center text-sm text-slate-400">Scan QR code to get commitment</p>
          </div>
        </div>
      </Card>

      <Card className="glass border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white">How It Works</h3>
        <div className="mt-6 space-y-4 text-sm text-slate-400">
          <div>
            <p className="font-medium text-white">1. Generate Commitment</p>
            <p>Create a unique commitment hash for receiving payments</p>
          </div>
          <div>
            <p className="font-medium text-white">2. Share with Sender</p>
            <p>Send your commitment hash to the person paying you</p>
          </div>
          <div>
            <p className="font-medium text-white">3. Receive Payment</p>
            <p>Funds arrive in your private balance automatically</p>
          </div>
          <div>
            <p className="font-medium text-white">4. Maintain Privacy</p>
            <p>Transaction details remain confidential on-chain</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
