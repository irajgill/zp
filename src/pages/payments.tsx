import {PaymentHistory} from "@/components/payments/payment-history"
import {ReceivePayment} from "@/components/payments/receive-payment"
import {SendPayment} from "@/components/payments/send-payment"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function Payments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Private Payments</h1>
        <p className="mt-2 text-slate-400">Send and receive confidential payments using zero-knowledge proofs</p>
      </div>

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/5">
          <TabsTrigger value="send">Send</TabsTrigger>
          <TabsTrigger value="receive">Receive</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="mt-6">
          <SendPayment />
        </TabsContent>

        <TabsContent value="receive" className="mt-6">
          <ReceivePayment />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <PaymentHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
