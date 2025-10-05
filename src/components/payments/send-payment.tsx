"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProgressBar } from "@/components/common/progress-bar"
import { ArrowRight, Shield, CheckCircle2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { generateCommitment, estimateProofTime } from "@/lib/utils"
import { useAppStore } from "@/store/app-store"
import type { ProofJob } from "@/types"

const paymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  recipient: z.string().min(10, "Invalid recipient commitment"),
  coin: z.enum(["APT", "USDC", "USDT"]),
  privacyLevel: z.enum(["standard", "enhanced", "maximum"]),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export function SendPayment() {
  const [step, setStep] = useState(1)
  const [proofJob, setProofJob] = useState<ProofJob | null>(null)
  const [proofProgress, setProofProgress] = useState(0)
  const { addProofJob, addTransaction } = useAppStore()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      coin: "APT",
      privacyLevel: "enhanced",
    },
  })

  const selectedCoin = watch("coin")
  const selectedPrivacyLevel = watch("privacyLevel")

  const onSubmit = async (data: PaymentFormData) => {
    if (step === 1) {
      // Move to proof generation step
      setStep(2)
      await generateProof(data)
    } else if (step === 3) {
      // Submit transaction
      await submitPayment(data)
    }
  }

  const generateProof = async (data: PaymentFormData) => {
    try {
      // Create proof job
      const job: ProofJob = {
        id: Math.random().toString(36).substring(7),
        type: "payment_proof",
        status: "processing",
        progress: 0,
        estimatedTime: estimateProofTime("payment_proof"),
      }

      setProofJob(job)
      addProofJob(job)

      // Simulate proof generation progress
      const interval = setInterval(() => {
        setProofProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStep(3)
            setProofJob({
              ...job,
              status: "completed",
              progress: 100,
              proofHash: generateCommitment(data.amount + data.recipient),
            })
            toast.success("Proof generated successfully!")
            return 100
          }
          return prev + 5
        })
      }, 750)
    } catch (error) {
      toast.error("Failed to generate proof")
      setStep(1)
    }
  }

  const submitPayment = async (data: PaymentFormData) => {
    try {
      if (!proofJob?.proofHash) {
        throw new Error("Proof not generated")
      }

      // In production, this would call the actual contract
      toast.success("Payment submitted successfully!")

      // Add to transaction history
      addTransaction({
        id: Math.random().toString(36).substring(7),
        type: "private_payment",
        amount: data.amount,
        coin: data.coin,
        status: "pending",
        timestamp: Date.now(),
        recipient: data.recipient,
        isPrivate: true,
      })

      // Reset form
      setStep(1)
      setProofJob(null)
      setProofProgress(0)
    } catch (error) {
      toast.error("Failed to submit payment")
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="glass border-white/10 p-6">
          {/* Step Indicator */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step >= s ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-white/10"
                  }`}
                >
                  {step > s ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-sm font-semibold text-white">{s}</span>
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`mx-2 h-1 flex-1 ${step > s ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-white/10"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Payment Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Payment Details</h2>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-white">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.0001"
                    placeholder="0.00"
                    className="border-white/10 bg-white/5 text-white"
                    {...register("amount")}
                  />
                  {errors.amount && <p className="text-sm text-red-400">{errors.amount.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coin" className="text-white">
                    Coin
                  </Label>
                  <Select value={selectedCoin} onValueChange={(value) => setValue("coin", value as any)}>
                    <SelectTrigger className="border-white/10 bg-white/5 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-slate-900">
                      <SelectItem value="APT">APT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-white">
                    Recipient Commitment
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="0x..."
                    className="border-white/10 bg-white/5 font-mono text-white"
                    {...register("recipient")}
                  />
                  {errors.recipient && <p className="text-sm text-red-400">{errors.recipient.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacyLevel" className="text-white">
                    Privacy Level
                  </Label>
                  <Select
                    value={selectedPrivacyLevel}
                    onValueChange={(value) => setValue("privacyLevel", value as any)}
                  >
                    <SelectTrigger className="border-white/10 bg-white/5 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-slate-900">
                      <SelectItem value="standard">Standard (Fast)</SelectItem>
                      <SelectItem value="enhanced">Enhanced (Recommended)</SelectItem>
                      <SelectItem value="maximum">Maximum (Slower)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Proof Generation */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Generating Zero-Knowledge Proof</h2>

                <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 animate-pulse text-purple-400" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Creating privacy proof...</p>
                      <p className="text-sm text-slate-400">This ensures your transaction remains confidential</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <ProgressBar value={proofProgress} showLabel />
                  </div>

                  <div className="mt-4 flex justify-between text-sm text-slate-400">
                    <span>Estimated time: {Math.ceil((100 - proofProgress) * 0.15)}s</span>
                    <span>{proofProgress}% complete</span>
                  </div>
                </div>

                <Alert className="border-blue-500/20 bg-blue-500/10">
                  <AlertCircle className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-blue-400">
                    Your payment details are being encrypted using zk-SNARKs. This process ensures complete privacy
                    while maintaining verifiability.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">Review & Submit</h2>

                <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount</span>
                    <span className="font-semibold text-white">
                      {watch("amount")} {watch("coin")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recipient</span>
                    <span className="font-mono text-sm text-white">{watch("recipient").slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Privacy Level</span>
                    <span className="capitalize text-white">{watch("privacyLevel")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Proof Hash</span>
                    <span className="font-mono text-sm text-green-400">{proofJob?.proofHash?.slice(0, 20)}...</span>
                  </div>
                </div>

                <Alert className="border-green-500/20 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-400">
                    Proof generated successfully! Your payment is ready to be submitted.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => {
                      setStep(1)
                      setProofJob(null)
                      setProofProgress(0)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Submit Payment
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>

      {/* Info Sidebar */}
      <div className="space-y-6">
        <Card className="glass border-white/10 p-6">
          <h3 className="font-semibold text-white">Privacy Features</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 text-purple-400" />
              <span>Zero-knowledge proofs hide transaction details</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 text-purple-400" />
              <span>Recipient identity remains confidential</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 text-purple-400" />
              <span>Amount is encrypted on-chain</span>
            </li>
          </ul>
        </Card>

        <Card className="glass border-white/10 p-6">
          <h3 className="font-semibold text-white">Privacy Levels</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-medium text-white">Standard</p>
              <p className="text-slate-400">Fast proof generation, basic privacy</p>
            </div>
            <div>
              <p className="font-medium text-white">Enhanced</p>
              <p className="text-slate-400">Balanced speed and privacy (recommended)</p>
            </div>
            <div>
              <p className="font-medium text-white">Maximum</p>
              <p className="text-slate-400">Strongest privacy, slower generation</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
