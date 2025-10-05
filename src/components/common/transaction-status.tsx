import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TransactionStatusProps {
  status: "pending" | "completed" | "failed" | "processing"
}

export function TransactionStatus({ status }: TransactionStatusProps) {
  const config = {
    pending: {
      icon: Clock,
      label: "Pending",
      className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-400",
    },
    completed: {
      icon: CheckCircle2,
      label: "Completed",
      className: "border-green-500/50 bg-green-500/10 text-green-400",
    },
    failed: {
      icon: XCircle,
      label: "Failed",
      className: "border-red-500/50 bg-red-500/10 text-red-400",
    },
    processing: {
      icon: Loader2,
      label: "Processing",
      className: "border-blue-500/50 bg-blue-500/10 text-blue-400",
    },
  }

  const { icon: Icon, label, className } = config[status]

  return (
    <Badge variant="outline" className={className}>
      <Icon className={`mr-1 h-3 w-3 ${status === "processing" ? "animate-spin" : ""}`} />
      {label}
    </Badge>
  )
}
