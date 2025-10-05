
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {formatTimestamp} from "@/lib/utils"
import {AlertCircle, CheckCircle2, Clock, FileCheck, ShieldCheck, XCircle} from "lucide-react"
import {useState} from "react"
import {toast} from "sonner"

export default function Compliance() {
  const [generating, setGenerating] = useState(false)

  const complianceScore = {
    overall: 95,
    kyc: true,
    aml: true,
    sanctions: true,
    lastUpdated: Date.now() - 86400000,
  }

  const auditTrail = [
    {
      id: "1",
      type: "kyc_proof",
      status: "completed",
      timestamp: Date.now() - 3600000,
      proofHash: "0xabcd...ef01",
    },
    {
      id: "2",
      type: "compliance_check",
      status: "completed",
      timestamp: Date.now() - 7200000,
      proofHash: "0x2345...6789",
    },
    {
      id: "3",
      type: "aml_verification",
      status: "completed",
      timestamp: Date.now() - 10800000,
      proofHash: "0x3456...7890",
    },
  ]

  const handleGenerateProof = async () => {
    setGenerating(true)
    toast.info("Generating compliance proof...")

    setTimeout(() => {
      setGenerating(false)
      toast.success("Compliance proof generated successfully!")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Compliance</h1>
        <p className="mt-2 text-slate-400">Privacy-preserving KYC and regulatory compliance</p>
      </div>

      {/* Compliance Score */}
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 p-4">
              <ShieldCheck className="h-12 w-12 text-green-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{complianceScore.overall}/100</h2>
              <p className="text-slate-400">Overall Compliance Score</p>
              <p className="text-xs text-slate-500">Last updated: {formatTimestamp(complianceScore.lastUpdated)}</p>
            </div>
          </div>
          <Button
            onClick={handleGenerateProof}
            disabled={generating}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {generating ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileCheck className="mr-2 h-4 w-4" />
                Generate Compliance Proof
              </>
            )}
          </Button>
        </div>

        <div className="mt-6">
          <Progress value={complianceScore.overall} className="h-3" />
        </div>
      </Card>

      {/* Verification Status */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">KYC Verification</p>
              <p className="mt-2 text-2xl font-bold text-white">Verified</p>
            </div>
            {complianceScore.kyc ? (
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-400" />
            )}
          </div>
          <Badge variant="outline" className="mt-4 border-green-500/50 bg-green-500/10 text-green-400">
            Active
          </Badge>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">AML Screening</p>
              <p className="mt-2 text-2xl font-bold text-white">Passed</p>
            </div>
            {complianceScore.aml ? (
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-400" />
            )}
          </div>
          <Badge variant="outline" className="mt-4 border-green-500/50 bg-green-500/10 text-green-400">
            Compliant
          </Badge>
        </Card>

        <Card className="glass border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Sanctions Check</p>
              <p className="mt-2 text-2xl font-bold text-white">Clear</p>
            </div>
            {complianceScore.sanctions ? (
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-400" />
            )}
          </div>
          <Badge variant="outline" className="mt-4 border-green-500/50 bg-green-500/10 text-green-400">
            Verified
          </Badge>
        </Card>
      </div>

      {/* Privacy-Preserving KYC */}
      <Card className="glass border-white/10 p-6">
        <h2 className="text-2xl font-semibold text-white">Privacy-Preserving KYC</h2>
        <p className="mt-2 text-slate-400">
          Generate compliance proofs without revealing personal data using zero-knowledge proofs
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-purple-400" />
              <div>
                <p className="font-medium text-white">Zero-Knowledge Proofs</p>
                <p className="mt-1 text-sm text-slate-400">
                  Prove compliance without revealing sensitive personal information
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-blue-400" />
              <div>
                <p className="font-medium text-white">Selective Disclosure</p>
                <p className="mt-1 text-sm text-slate-400">Share only the required information with regulators</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-green-400" />
              <div>
                <p className="font-medium text-white">Regulatory Compliance</p>
                <p className="mt-1 text-sm text-slate-400">
                  Meet all regulatory requirements while maintaining privacy
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 h-5 w-5 text-yellow-400" />
              <div>
                <p className="font-medium text-white">Audit Trail</p>
                <p className="mt-1 text-sm text-slate-400">Complete audit trail for compliance verification</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Audit Trail */}
      <Card className="glass border-white/10 p-6">
        <h2 className="text-2xl font-semibold text-white">Audit Trail</h2>
        <p className="mt-2 text-slate-400">Compliance events and proof generation history</p>

        <div className="mt-6 space-y-3">
          {auditTrail.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2">
                  <FileCheck className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {event.type === "kyc_proof"
                      ? "KYC Proof Generated"
                      : event.type === "compliance_check"
                        ? "Compliance Check"
                        : "AML Verification"}
                  </p>
                  <p className="text-sm text-slate-400">{formatTimestamp(event.timestamp)}</p>
                  <p className="font-mono text-xs text-slate-500">Proof: {event.proofHash}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-400">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {event.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
