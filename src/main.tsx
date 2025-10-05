import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { PetraWallet } from "petra-plugin-wallet-adapter"
import { Toaster } from "sonner"
import App from "./App"
import "../app/globals.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const wallets = [new PetraWallet()]

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
          <App />
          <Toaster position="top-right" richColors />
        </AptosWalletAdapterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
