"use client"

import {cn} from "@/lib/utils"
import {ArrowDownUp, BarChart3, LayoutDashboard, Lock, Send, Settings, ShieldCheck, TrendingUp} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/router"

interface SidebarProps {
  isOpen: boolean
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Private Payments", href: "/payments", icon: Send },
  { name: "Deposit / Withdraw", href: "/deposit", icon: ArrowDownUp },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "Escrow", href: "/escrow", icon: Lock },
  { name: "Compliance", href: "/compliance", icon: ShieldCheck },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar({ isOpen }: SidebarProps) {
  const router = useRouter()

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = router.pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-purple-400")} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
