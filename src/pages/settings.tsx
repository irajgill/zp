"use client"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch"
import {Bell, Globe, Shield, Wallet} from "lucide-react"
import {useState} from "react"
import {toast} from "sonner"

export default function Settings() {
  const [privacyLevel, setPrivacyLevel] = useState("enhanced")
  const [autoMixing, setAutoMixing] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const handleSave = () => {
    toast.success("Settings saved successfully")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-slate-400">Configure your privacy and security preferences</p>
      </div>

      {/* Privacy Settings */}
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Privacy Settings</h2>
        </div>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-white">Default Privacy Level</Label>
            <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900">
                <SelectItem value="standard">Standard (Fast)</SelectItem>
                <SelectItem value="enhanced">Enhanced (Recommended)</SelectItem>
                <SelectItem value="maximum">Maximum (Slower)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-slate-400">Choose the default privacy level for your transactions</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">Auto-Mixing</Label>
              <p className="text-sm text-slate-400">Automatically mix funds for enhanced privacy</p>
            </div>
            <Switch checked={autoMixing} onCheckedChange={setAutoMixing} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">Hide Balances by Default</Label>
              <p className="text-sm text-slate-400">Automatically hide sensitive balance information</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Wallet Settings */}
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Wallet className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Wallet Settings</h2>
        </div>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-white">Network</Label>
            <Select defaultValue="testnet">
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900">
                <SelectItem value="testnet">Testnet</SelectItem>
                <SelectItem value="mainnet">Mainnet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">Auto-Connect Wallet</Label>
              <p className="text-sm text-slate-400">Automatically connect to your wallet on page load</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">Enable Notifications</Label>
              <p className="text-sm text-slate-400">Receive notifications for important events</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">Transaction Alerts</Label>
              <p className="text-sm text-slate-400">Get notified when transactions complete</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">Proof Generation Updates</Label>
              <p className="text-sm text-slate-400">Receive updates on proof generation progress</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Compliance Settings */}
      <Card className="glass border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Globe className="h-6 w-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Compliance Settings</h2>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">KYC Verification</Label>
              <p className="text-sm text-slate-400">Enable privacy-preserving KYC verification</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white">Regulatory Reporting</Label>
              <p className="text-sm text-slate-400">Allow selective disclosure for regulatory compliance</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Data Retention Period</Label>
            <Select defaultValue="90">
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-slate-900">
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          Save Settings
        </Button>
      </div>
    </div>
  )
}
