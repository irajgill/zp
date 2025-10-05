import { Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import { Dashboard } from "@/pages/dashboard"
import { Payments } from "@/pages/payments"
import { Deposit } from "@/pages/deposit"
import { Trading } from "@/pages/trading"
import { Escrow } from "@/pages/escrow"
import { Compliance } from "@/pages/compliance"
import { Analytics } from "@/pages/analytics"
import { Settings } from "@/pages/settings"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}
