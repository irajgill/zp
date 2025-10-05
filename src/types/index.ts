export interface WalletState {
  address: string | null
  balance: string
  privateBalance: string
  connected: boolean
  network: "testnet" | "mainnet"
}

export interface ProofJob {
  id: string
  type: "payment_proof" | "kyc_proof" | "compliance_proof" | "trading_proof"
  status: "queued" | "processing" | "completed" | "failed"
  progress: number
  estimatedTime: number
  proofHash?: string
  error?: string
}

export interface Transaction {
  id: string
  type: "deposit" | "withdraw" | "private_payment" | "escrow" | "trading"
  amount: string
  coin: "APT" | "USDC" | "USDT"
  status: "pending" | "completed" | "failed"
  timestamp: number
  hash?: string
  recipient?: string
  isPrivate: boolean
}

export interface ComplianceScore {
  overall: number
  kyc: boolean
  aml: boolean
  sanctions: boolean
  lastUpdated: number
}

export interface EscrowContract {
  id: string
  parties: string[]
  amount: string
  coin: "APT" | "USDC" | "USDT"
  status: "active" | "completed" | "disputed" | "cancelled"
  conditions: string
  timeout: number
  createdAt: number
}

export interface Order {
  id: string
  type: "buy" | "sell"
  pair: string
  amount: string
  price: string
  filled: string
  status: "open" | "filled" | "cancelled"
  isPrivate: boolean
  timestamp: number
}

export interface PrivacyMetrics {
  anonymitySetSize: number
  mixingEffectiveness: number
  privacyLeaks: number
  totalProofsGenerated: number
}
