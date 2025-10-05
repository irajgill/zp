import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { toast } from "sonner"
import { useAptosClient } from "./use-aptos-client"

export function useSubmitTransaction() {
  const { signAndSubmitTransaction } = useWallet()
  const client = useAptosClient()

  const submitTransaction = async (payload: any) => {
    try {
      const response = await signAndSubmitTransaction(payload)

      // Wait for transaction confirmation
      const txn = await client.waitForTransaction({
        transactionHash: response.hash,
      })

      if (txn.success) {
        toast.success("Transaction successful!", {
          description: `Hash: ${response.hash.slice(0, 10)}...`,
        })
        return { success: true, hash: response.hash }
      } else {
        toast.error("Transaction failed")
        return { success: false, error: "Transaction failed" }
      }
    } catch (error: any) {
      console.error("Transaction error:", error)
      toast.error("Transaction failed", {
        description: error.message || "Unknown error occurred",
      })
      return { success: false, error: error.message }
    }
  }

  return { submitTransaction }
}
