import { useQuery } from "@tanstack/react-query"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useWalletStore } from "@/store/wallet-store"
import { BACKEND_URL } from "@/lib/constants"

export function usePrivateBalance() {
  const { account, connected } = useWallet()
  const { setPrivateBalance } = useWalletStore()

  return useQuery({
    queryKey: ["private-balance", account?.address],
    queryFn: async () => {
      if (!account?.address) return "0"

      try {
        const response = await fetch(`${BACKEND_URL}/api/vault/balance/${account.address}`)
        if (!response.ok) {
          console.warn("Backend not available, using mock private balance")
          const mockBalance = "1.5000"
          setPrivateBalance(mockBalance)
          return mockBalance
        }

        const data = await response.json()
        const balance = data.balance || "0"
        setPrivateBalance(balance)
        return balance
      } catch (error) {
        console.warn("Failed to fetch private balance:", error)
        // Return mock data for demo
        const mockBalance = "1.5000"
        setPrivateBalance(mockBalance)
        return mockBalance
      }
    },
    enabled: connected && !!account?.address,
    refetchInterval: 15000,
    retry: false,
  })
}
