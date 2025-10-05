import { create } from "zustand"
import type { ProofJob, Transaction, ComplianceScore } from "@/types"

interface AppStore {
  proofJobs: ProofJob[]
  transactions: Transaction[]
  complianceScore: ComplianceScore | null
  privacyMode: boolean
  addProofJob: (job: ProofJob) => void
  updateProofJob: (id: string, updates: Partial<ProofJob>) => void
  addTransaction: (transaction: Transaction) => void
  setComplianceScore: (score: ComplianceScore) => void
  togglePrivacyMode: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  proofJobs: [],
  transactions: [],
  complianceScore: null,
  privacyMode: true,
  addProofJob: (job) => set((state) => ({ proofJobs: [...state.proofJobs, job] })),
  updateProofJob: (id, updates) =>
    set((state) => ({
      proofJobs: state.proofJobs.map((job) => (job.id === id ? { ...job, ...updates } : job)),
    })),
  addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),
  setComplianceScore: (score) => set({ complianceScore: score }),
  togglePrivacyMode: () => set((state) => ({ privacyMode: !state.privacyMode })),
}))
