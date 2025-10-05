import { create } from "zustand"
import type { WalletState } from "@/types"

interface WalletStore extends WalletState {
  setAddress: (address: string | null) => void
  setBalance: (balance: string) => void
  setPrivateBalance: (balance: string) => void
  setConnected: (connected: boolean) => void
  setNetwork: (network: "testnet" | "mainnet") => void
  reset: () => void
}

const initialState: WalletState = {
  address: null,
  balance: "0",
  privateBalance: "0",
  connected: false,
  network: "testnet",
}

export const useWalletStore = create<WalletStore>((set) => ({
  ...initialState,
  setAddress: (address) => set({ address }),
  setBalance: (balance) => set({ balance }),
  setPrivateBalance: (balance) => set({ privateBalance: balance }),
  setConnected: (connected) => set({ connected }),
  setNetwork: (network) => set({ network }),
  reset: () => set(initialState),
}))
