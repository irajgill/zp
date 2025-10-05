import { BACKEND_URL } from "./constants"

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Proof generation endpoints
  async generatePaymentProof(data: {
    amount: string
    recipient: string
    coin: string
  }): Promise<{ jobId: string }> {
    return this.request("/api/proofs/payment/generate", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getProofStatus(jobId: string): Promise<{
    status: string
    progress: number
    estimatedTime: number
    proofHash?: string
  }> {
    return this.request(`/api/proofs/status/${jobId}`)
  }

  async generateKYCProof(data: { address: string }): Promise<{ jobId: string }> {
    return this.request("/api/compliance/kyc-proof", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Payment endpoints
  async submitConfidentialPayment(data: {
    proofHash: string
    commitment: string
    amount: string
  }): Promise<{ success: boolean; txHash?: string }> {
    return this.request("/api/payments/confidential", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getPaymentHistory(address: string): Promise<any[]> {
    return this.request(`/api/payments/history/${address}`)
  }

  // Analytics endpoints
  async getPrivacyMetrics(): Promise<{
    anonymitySetSize: number
    mixingEffectiveness: number
    privacyLeaks: number
    totalProofsGenerated: number
  }> {
    return this.request("/api/analytics/privacy-metrics")
  }

  async getComplianceScore(address: string): Promise<{
    overall: number
    kyc: boolean
    aml: boolean
    sanctions: boolean
  }> {
    return this.request(`/api/compliance/score/${address}`)
  }
}

export const apiClient = new ApiClient(BACKEND_URL)
