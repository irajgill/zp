"use client"

import { Menu, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/wallet/wallet-button"
import { NetworkIndicator } from "@/components/wallet/network-indicator"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-white hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">zkPrivatePay</h1>
              <p className="text-xs text-slate-400">Privacy-First Payments</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NetworkIndicator />
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
