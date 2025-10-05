import { useQuery } from "@tanstack/react-query"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useAptosClient } from "./use-aptos-client"
import { useWalletStore } from "@/store/wallet-store"

export function useWalletBalance() {
  const { account, connected } = useWallet()
  const client = useAptosClient()
  const { setBalance } = useWalletStore()

  return useQuery({
    queryKey: ["wallet-balance", account?.address],
    queryFn: async () => {
      if (!account?.address) return "0"

      try {
        const resources = await client.getAccountResources({
          accountAddress: account.address,
        })

        const aptResource = resources.find((r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>")

        if (aptResource) {
          const balance = (aptResource.data as any).coin.value
          const aptBalance = (Number(balance) / 100000000).toFixed(4)
          setBalance(aptBalance)
          return aptBalance
        }

        return "0"
      } catch (error) {
        console.error("Failed to fetch balance:", error)
        return "0"
      }
    },
    enabled: connected && !!account?.address,
    refetchInterval: 10000, // Refetch every 10 seconds
  })
}
