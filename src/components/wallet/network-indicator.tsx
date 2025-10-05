import { Badge } from "@/components/ui/badge"
import { useWalletStore } from "@/store/wallet-store"

export function NetworkIndicator() {
  const { network } = useWalletStore()

  return (
    <Badge
      variant="outline"
      className={`border-white/10 ${
        network === "testnet" ? "bg-yellow-500/10 text-yellow-400" : "bg-green-500/10 text-green-400"
      }`}
    >
      {network === "testnet" ? "Testnet" : "Mainnet"}
    </Badge>
  )
}
