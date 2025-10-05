"use client"

import {StatCard} from "@/components/common/stat-card"
import {Card} from "@/components/ui/card"
import {Activity, Globe, Lock, Shield, Users} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function Analytics() {
  // Mock privacy metrics
  const privacyMetrics = {
    anonymitySetSize: 1247,
    mixingEffectiveness: 94,
    privacyLeaks: 0,
    totalProofsGenerated: 8542,
  }

  // Mock chart data
  const volumeData = [
    { month: "Jan", volume: 45000, private: 32000 },
    { month: "Feb", volume: 52000, private: 38000 },
    { month: "Mar", volume: 48000, private: 35000 },
    { month: "Apr", volume: 61000, private: 45000 },
    { month: "May", volume: 55000, private: 42000 },
    { month: "Jun", volume: 67000, private: 51000 },
  ]

  const privacyRatioData = [
    { name: "Private", value: 68, color: "#8b5cf6" },
    { name: "Public", value: 32, color: "#3b82f6" },
  ]

  const proofTypeData = [
    { type: "Payment", count: 3245 },
    { type: "KYC", count: 1876 },
    { type: "Compliance", count: 2134 },
    { type: "Trading", count: 1287 },
  ]

  const networkHealthData = [
    { time: "00:00", users: 234, proofs: 45 },
    { time: "04:00", users: 189, proofs: 32 },
    { time: "08:00", users: 312, proofs: 67 },
    { time: "12:00", users: 456, proofs: 89 },
    { time: "16:00", users: 398, proofs: 76 },
    { time: "20:00", users: 367, proofs: 71 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Analytics</h1>
        <p className="mt-2 text-slate-400">Privacy metrics and network insights</p>
      </div>

      {/* Privacy Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Anonymity Set Size"
          value={privacyMetrics.anonymitySetSize.toLocaleString()}
          subtitle="Active participants"
          icon={Users}
        />
        <StatCard
          title="Mixing Effectiveness"
          value={`${privacyMetrics.mixingEffectiveness}%`}
          subtitle="Privacy score"
          icon={Shield}
          trend={{ value: "2.3%", positive: true }}
        />
        <StatCard
          title="Privacy Leaks"
          value={privacyMetrics.privacyLeaks.toString()}
          subtitle="Zero incidents"
          icon={Lock}
          className="border-green-500/20"
        />
        <StatCard
          title="Total Proofs"
          value={privacyMetrics.totalProofsGenerated.toLocaleString()}
          subtitle="Generated"
          icon={Activity}
          trend={{ value: "15.7%", positive: true }}
        />
      </div>

      {/* Transaction Volume */}
      <Card className="glass border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">Transaction Volume</h2>
        <p className="mt-1 text-sm text-slate-400">Monthly transaction volume comparison</p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
              <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar dataKey="volume" fill="#3b82f6" name="Total Volume" />
              <Bar dataKey="private" fill="#8b5cf6" name="Private Volume" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Privacy Ratio */}
        <Card className="glass border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white">Privacy Ratio</h2>
          <p className="mt-1 text-sm text-slate-400">Distribution of private vs public transactions</p>

          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={privacyRatioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {privacyRatioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Proof Types */}
        <Card className="glass border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white">Proof Generation by Type</h2>
          <p className="mt-1 text-sm text-slate-400">Distribution of zero-knowledge proofs</p>

          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proofTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
                <YAxis dataKey="type" type="category" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Network Health */}
      <Card className="glass border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">Network Health</h2>
        <p className="mt-1 text-sm text-slate-400">Active users and proof generation over time</p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
              <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Active Users" />
              <Line type="monotone" dataKey="proofs" stroke="#8b5cf6" strokeWidth={2} name="Proofs Generated" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Geographic Distribution */}
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Geographic Distribution</h2>
            <p className="mt-1 text-sm text-slate-400">Anonymized regional activity (privacy-preserving)</p>
          </div>
          <Globe className="h-8 w-8 text-purple-400" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { region: "North America", percentage: 42, users: 523 },
            { region: "Europe", percentage: 35, users: 437 },
            { region: "Asia Pacific", percentage: 23, users: 287 },
          ].map((region) => (
            <div key={region.region} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">{region.region}</p>
              <p className="mt-2 text-3xl font-bold text-white">{region.percentage}%</p>
              <p className="mt-1 text-sm text-slate-400">{region.users} active users</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
