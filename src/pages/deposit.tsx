"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowDown, ArrowUp, Shield, AlertCircle } from "lucide-react"
import { useWalletStore } from "@/store/wallet-store"
import { formatAmount, generateCommitment } from "@/lib/utils"
import { toast } from "sonner"

export function Deposit() {
  const { balance, privateBalance } = useWalletStore()
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedCoin, setSelectedCoin] = useState("APT")

  const handleDeposit = () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    toast.success("Deposit initiated", {
      description: `Depositing ${depositAmount} ${selectedCoin} to private vault`,
    })
    setDepositAmount("")
  }

  const handleWithdraw = () => {
    if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    toast.success("Withdrawal initiated", {
      description: `Withdrawing ${withdrawAmount} ${selectedCoin} from private vault`,
    })
    setWithdrawAmount("")
  }

  const commitment = generateCommitment(depositAmount + Date.now().toString())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Deposit / Withdraw</h1>
        <p className="mt-2 text-slate-400">Manage your private vault funds</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass border-white/10 p-6">
          <p className="text-sm text-slate-400">Public Balance</p>
          <p className="mt-2 text-3xl font-bold text-white">{formatAmount(balance)} APT</p>
        </Card>
        <Card className="glass border-white/10 p-6">
          <p className="text-sm text-slate-400">Private Balance</p>
          <p className="mt-2 text-3xl font-bold text-white">{formatAmount(privateBalance)} APT</p>
        </Card>
        <Card className="glass border-white/10 p-6">
          <p className="text-sm text-slate-400">Total Balance</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {formatAmount((Number.parseFloat(balance) + Number.parseFloat(privateBalance)).toString())} APT
          </p>
        </Card>
      </div>

      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/5">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="glass border-white/10 p-6">
                <h2 className="text-2xl font-semibold text-white">Deposit to Private Vault</h2>
                <p className="mt-2 text-slate-400">Move funds from your public balance to private vault</p>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Amount</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="border-white/10 bg-white/5 text-white"
                    />
                    <p className="text-sm text-slate-400">Available: {formatAmount(balance)} APT</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Coin</Label>
                    <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                      <SelectTrigger className="border-white/10 bg-white/5 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-slate-900">
                        <SelectItem value="APT">APT</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {depositAmount && (
                    <div className="space-y-2">
                      <Label className="text-white">Commitment Hash</Label>
                      <Input
                        value={commitment}
                        readOnly
                        className="border-white/10 bg-white/5 font-mono text-sm text-white"
                      />
                      <p className="text-xs text-slate-400">This hash will be used to track your private deposit</p>
                    </div>
                  )}

                  <Alert className="border-blue-500/20 bg-blue-500/10">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-400">
                      Deposits are encrypted using zero-knowledge proofs. Your balance will be hidden on-chain.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleDeposit}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Deposit to Private Vault
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="glass border-white/10 p-6">
              <h3 className="font-semibold text-white">Privacy Benefits</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 text-purple-400" />
                  <span>Balance hidden from public view</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 text-purple-400" />
                  <span>Transactions remain confidential</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 text-purple-400" />
                  <span>Full control over your funds</span>
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="withdraw" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="glass border-white/10 p-6">
                <h2 className="text-2xl font-semibold text-white">Withdraw from Private Vault</h2>
                <p className="mt-2 text-slate-400">Move funds from your private vault to public balance</p>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Amount</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="border-white/10 bg-white/5 text-white"
                    />
                    <p className="text-sm text-slate-400">Available: {formatAmount(privateBalance)} APT</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Coin</Label>
                    <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                      <SelectTrigger className="border-white/10 bg-white/5 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-slate-900">
                        <SelectItem value="APT">APT</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Alert className="border-yellow-500/20 bg-yellow-500/10">
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                    <AlertDescription className="text-yellow-400">
                      Withdrawing funds will make the transaction amount visible on-chain.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleWithdraw}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Withdraw from Private Vault
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="glass border-white/10 p-6">
              <h3 className="font-semibold text-white">Important Notes</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-400" />
                  <span>Withdrawals are public transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-400" />
                  <span>Amount will be visible on-chain</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-400" />
                  <span>Consider privacy implications</span>
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
