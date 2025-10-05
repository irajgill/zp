import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("glass border-white/10 p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
          {trend && (
            <p className={cn("mt-2 text-sm font-medium", trend.positive ? "text-green-400" : "text-red-400")}>
              {trend.positive ? "+" : ""}
              {trend.value}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3">
          <Icon className="h-6 w-6 text-purple-400" />
        </div>
      </div>
    </Card>
  )
}
