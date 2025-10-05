"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ArrowDownUp, TrendingUp, Search, ExternalLink } from "lucide-react"
import { useAppStore } from "@/store/app-store"
import { formatTimestamp } from "@/lib/utils"
import { TransactionStatus } from "@/components/common/transaction-status"

export function PaymentHistory() {
  const { transactions } = useAppStore()

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
            hash: "0xabcd...ef01",
          },
          {
            id: "2",
            type: "deposit" as const,
            amount: "2.0",
            coin: "APT" as const,
            status: "completed" as const,
            timestamp: Date.now() - 7200000,
            isPrivate: false,
            hash: "0x2345...6789",
          },
          {
            id: "3",
            type: "private_payment" as const,
            amount: "1.2",
            coin: "USDC" as const,
            status: "pending" as const,
            timestamp: Date.now() - 10800000,
            isPrivate: true,
            recipient: "0x9876...5432",
          },
          {
            id: "4",
            type: "withdraw" as const,
            amount: "0.8",
            coin: "APT" as const,
            status: "completed" as const,
            timestamp: Date.now() - 14400000,
            isPrivate: false,
            hash: "0x3456...7890",
          },
        ]

  return (
    <div className="space-y-6">
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Payment History</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search transactions..." className="border-white/10 bg-white/5 pl-10 text-white" />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
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
                        : tx.type === "withdraw"
                          ? "bg-red-500/20"
                          : "bg-blue-500/20"
                  }`}
                >
                  {tx.type === "private_payment" && <Send className="h-5 w-5 text-purple-400" />}
                  {tx.type === "deposit" && <ArrowDownUp className="h-5 w-5 text-green-400" />}
                  {tx.type === "withdraw" && <ArrowDownUp className="h-5 w-5 text-red-400" />}
                  {tx.type === "trading" && <TrendingUp className="h-5 w-5 text-blue-400" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">
                      {tx.type === "private_payment"
                        ? "Private Payment"
                        : tx.type === "deposit"
                          ? "Deposit"
                          : tx.type === "withdraw"
                            ? "Withdraw"
                            : "Trading"}
                    </p>
                    {tx.isPrivate && (
                      <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-400">
                        Private
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{formatTimestamp(tx.timestamp)}</p>
                  {tx.recipient && <p className="font-mono text-xs text-slate-500">To: {tx.recipient}</p>}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-white">
                    {tx.amount} {tx.coin}
                  </p>
                  <TransactionStatus status={tx.status} />
                </div>
                {tx.hash && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white"
                    onClick={() => window.open(`https://explorer.aptoslabs.com/txn/${tx.hash}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
