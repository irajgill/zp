"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Lock, CheckCircle2, AlertCircle } from "lucide-react"
import { formatTimestamp } from "@/lib/utils"

export function Escrow() {
  const escrows = [
    {
      id: "1",
      parties: ["0x1234...5678", "0x9876...5432"],
      amount: "50.0",
      coin: "APT",
      status: "active",
      conditions: "Payment on delivery confirmation",
      timeout: Date.now() + 86400000,
      createdAt: Date.now() - 3600000,
    },
    {
      id: "2",
      parties: ["0x2345...6789", "0x8765...4321"],
      amount: "100.0",
      coin: "USDC",
      status: "completed",
      conditions: "Milestone-based release",
      timeout: Date.now() + 172800000,
      createdAt: Date.now() - 7200000,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Escrow Services</h1>
          <p className="mt-2 text-slate-400">Secure multi-party transactions with smart contracts</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Escrow
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {escrows.map((escrow) => (
          <Card key={escrow.id} className="glass border-white/10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3">
                  <Lock className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {escrow.amount} {escrow.coin}
                  </p>
                  <p className="text-sm text-slate-400">Escrow #{escrow.id}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${
                  escrow.status === "active"
                    ? "border-green-500/50 bg-green-500/10 text-green-400"
                    : escrow.status === "completed"
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      : "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {escrow.status === "active" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                {escrow.status === "disputed" && <AlertCircle className="mr-1 h-3 w-3" />}
                {escrow.status}
              </Badge>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div>
                <p className="text-slate-400">Parties</p>
                <div className="mt-1 space-y-1">
                  {escrow.parties.map((party, i) => (
                    <p key={i} className="font-mono text-white">
                      {party}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-400">Conditions</p>
                <p className="mt-1 text-white">{escrow.conditions}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400">Created</p>
                  <p className="mt-1 text-white">{formatTimestamp(escrow.createdAt)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Timeout</p>
                  <p className="mt-1 text-white">{formatTimestamp(escrow.timeout)}</p>
                </div>
              </div>
            </div>

            {escrow.status === "active" && (
              <div className="mt-6 flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Release Funds
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  Dispute
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
