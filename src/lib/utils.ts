import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatAmount(amount: string | number, decimals = 4): string {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
  return num.toFixed(decimals)
}

export function formatUSD(amount: string | number): string {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num)
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}

export function generateCommitment(value: string): string {
  // In production, this would use proper cryptographic hashing
  return `0x${Array.from(value)
    .map((c) => c.charCodeAt(0).toString(16))
    .join("")
    .padEnd(64, "0")}`
}

export function estimateProofTime(type: string): number {
  const times = {
    payment_proof: 15000,
    kyc_proof: 30000,
    compliance_proof: 20000,
    trading_proof: 10000,
  }
  return times[type as keyof typeof times] || 15000
}
