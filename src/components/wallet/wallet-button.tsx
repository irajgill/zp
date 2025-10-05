// Remove "use client" from the top

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {usePrivateBalance} from "@/hooks/use-private-balance"
import {useWalletBalance} from "@/hooks/use-wallet-balance"
import {formatAddress, formatUSD} from "@/lib/utils"
import {useWalletStore} from "@/store/wallet-store"
import {useWallet} from "@aptos-labs/wallet-adapter-react"
import {LogOut, Wallet} from "lucide-react"
import {useEffect} from "react"

export function WalletButton() {
  const { account, connected, connect, disconnect, wallets } = useWallet()
  const { address, balance, setAddress, setConnected, reset } = useWalletStore()

  useWalletBalance()
  usePrivateBalance()

  useEffect(() => {
    if (connected && account) {
      setAddress(account.address)
      setConnected(true)
    } else {
      reset()
    }
  }, [connected, account, setAddress, setConnected, reset])

  const handleConnect = async () => {
    try {
      // Find Petra wallet from available wallets
      const petraWallet = wallets?.find(w => w.name === "Petra")
      if (petraWallet) {
        await connect(petraWallet.name)
      } else {
        console.error("Petra wallet not found. Please install Petra wallet extension.")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      reset()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  if (!connected) {
    return (
      <Button
        onClick={handleConnect}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  const aptPrice = 15.37
  const usdValue = Number.parseFloat(balance) * aptPrice

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
          <Wallet className="mr-2 h-4 w-4" />
          {formatAddress(address || "")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-white/10 bg-slate-900">
        <DropdownMenuLabel className="text-slate-400">My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <div className="px-2 py-2">
          <p className="text-xs text-slate-400">APT Balance</p>
          <p className="text-lg font-semibold text-white">{balance} APT</p>
          <p className="text-xs text-slate-400">{formatUSD(usdValue)}</p>
        </div>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={handleDisconnect} className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
