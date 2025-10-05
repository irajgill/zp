"use client"

import { Wallet, Eye, EyeOff, ShieldCheck, ArrowUpRight, Send, Plus, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/common/stat-card"
import { useWalletStore } from "@/store/wallet-store"
import { useAppStore } from "@/store/app-store"
import { formatAmount, formatUSD, formatTimestamp } from "@/lib/utils"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export function Dashboard() {
  const navigate = useNavigate()
  const { balance, privateBalance, connected } = useWalletStore()
  const { privacyMode, togglePrivacyMode, transactions } = useAppStore()
  const [showPrivateBalance, setShowPrivateBalance] = useState(false)

  // Mock data for demo
  const aptPrice = 15.37
  const publicUSD = Number.parseFloat(balance) * aptPrice
  const privateUSD = Number.parseFloat(privateBalance) * aptPrice

  const mockTransactions =
    transactions.length > 0
      ? transactions
      : [
          {
            id: "1",
            type: "private_payment" as const,
            amount: "0.5",
            coin: "APT" as const,
            status: "completed" as const,
            timestamp: Date.now() - 3600000,
            isPrivate: true,
            recipient: "0x1234...5678",
          },
          {
            id: "2",
            type: "deposit" as const,
            amount: "2.0",
            coin: "APT" as const,
            status: "completed" as const,
            timestamp: Date.now() - 7200000,
            isPrivate: false,
          },
          {
            id: "3",
            type: "trading" as const,
            amount: "1.2",
            coin: "APT" as const,
            status: "pending" as const,
            timestamp: Date.now() - 10800000,
            isPrivate: true,
          },
        ]

  const activeProofs = 8
  const complianceScore = 95

  if (!connected) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="glass border-white/10 p-12 text-center">
          <Wallet className="mx-auto h-16 w-16 text-purple-400" />
          <h2 className="mt-4 text-2xl font-bold text-white">Connect Your Wallet</h2>
          <p className="mt-2 text-slate-400">Connect your Petra wallet to access zkPrivatePay</p>
          <Button
            className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            size="lg"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-slate-400">Welcome back to zkPrivatePay</p>
        </div>
        <Button
          variant="outline"
          onClick={togglePrivacyMode}
          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          {privacyMode ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
          {privacyMode ? "Show All" : "Privacy Mode"}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="APT Balance"
          value={`${formatAmount(balance)} APT`}
          subtitle={formatUSD(publicUSD)}
          icon={Wallet}
          trend={{ value: "12.5%", positive: true }}
        />

        <Card className="glass border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-slate-400">Private Balance</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setShowPrivateBalance(!showPrivateBalance)}
                >
                  {showPrivateBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <h3 className="mt-2 text-3xl font-bold text-white">
                {showPrivateBalance ? `${formatAmount(privateBalance)} APT` : "••••••"}
              </h3>
              {showPrivateBalance && <p className="mt-1 text-sm text-slate-400">{formatUSD(privateUSD)}</p>}
            </div>
            <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3">
              <ShieldCheck className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <StatCard
          title="Active Proofs"
          value={activeProofs.toString()}
          subtitle="Pending verification"
          icon={FileCheck}
        />

        <StatCard
          title="Compliance Score"
          value={`${complianceScore}/100`}
          subtitle="Verified"
          icon={ShieldCheck}
          className="border-green-500/20"
        />
      </div>

      {/* Quick Actions */}
      <Card className="glass border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Button
            onClick={() => navigate("/payments")}
            className="h-auto flex-col gap-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 py-6 hover:from-purple-500/30 hover:to-blue-500/30"
          >
            <Send className="h-6 w-6" />
            <span>New Private Payment</span>
          </Button>
          <Button
            onClick={() => navigate("/deposit")}
            className="h-auto flex-col gap-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 py-6 hover:from-purple-500/30 hover:to-blue-500/30"
          >
            <Plus className="h-6 w-6" />
            <span>Deposit Funds</span>
          </Button>
          <Button
            onClick={() => navigate("/compliance")}
            className="h-auto flex-col gap-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 py-6 hover:from-purple-500/30 hover:to-blue-500/30"
          >
            <ShieldCheck className="h-6 w-6" />
            <span>Generate Compliance Proof</span>
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
            View All
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-lg p-2 ${
                    tx.type === "private_payment"
                      ? "bg-purple-500/20"
                      : tx.type === "deposit"
                        ? "bg-green-500/20"
                        : "bg-blue-500/20"
                  }`}
                >
                  {tx.type === "private_payment" && <Send className="h-5 w-5 text-purple-400" />}
                  {tx.type === "deposit" && <Plus className="h-5 w-5 text-green-400" />}
                  {tx.type === "trading" && <ArrowUpRight className="h-5 w-5 text-blue-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">
                      {tx.type === "private_payment"
                        ? "Private Payment"
                        : tx.type === "deposit"
                          ? "Deposit"
                          : "Trading"}
                    </p>
                    {tx.isPrivate && (
                      <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
                        Private
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{formatTimestamp(tx.timestamp)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">
                  {tx.amount} {tx.coin}
                </p>
                <Badge
                  variant="outline"
                  className={`${
                    tx.status === "completed"
                      ? "border-green-500/50 bg-green-500/10 text-green-400"
                      : tx.status === "pending"
                        ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
                        : "border-red-500/50 bg-red-500/10 text-red-400"
                  }`}
                >
                  {tx.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
