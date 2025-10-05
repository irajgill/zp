// src/pages/_app.tsx
import {Layout} from "@/components/layout/layout"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import type {AppProps} from "next/app"
import {useState} from "react"
import {Toaster} from "sonner"
import "../styles/globals.css"

// ADD THESE IMPORTS
import {Network} from "@aptos-labs/ts-sdk"
import {AptosWalletAdapterProvider} from "@aptos-labs/wallet-adapter-react"
import {PetraWallet} from "petra-plugin-wallet-adapter"

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }))

  // Configure wallets
  const wallets = [new PetraWallet()]

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
      }}
      onError={(error) => {
        console.error("Wallet adapter error:", error)
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </QueryClientProvider>
    </AptosWalletAdapterProvider>
  )
}
