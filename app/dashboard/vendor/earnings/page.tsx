"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Download, CreditCard, Wallet } from "lucide-react"

const earningsData = [
  { month: "January 2024", gross: 4200, fees: 420, net: 3780, status: "paid" },
  { month: "February 2024", gross: 5600, fees: 560, net: 5040, status: "paid" },
  { month: "March 2024", gross: 3800, fees: 380, net: 3420, status: "paid" },
  { month: "April 2024", gross: 6100, fees: 610, net: 5490, status: "paid" },
  { month: "May 2024", gross: 4900, fees: 490, net: 4410, status: "pending" },
  { month: "June 2024", gross: 5200, fees: 520, net: 4680, status: "processing" },
]

const recentTransactions = [
  {
    id: "TXN-001",
    course: "Ethical Hacking Fundamentals",
    student: "John Smith",
    amount: 99,
    date: "2024-06-15",
    status: "completed",
  },
  {
    id: "TXN-002",
    course: "Network Security Essentials",
    student: "Sarah Johnson",
    amount: 79,
    date: "2024-06-14",
    status: "completed",
  },
  {
    id: "TXN-003",
    course: "Cybersecurity Risk Management",
    student: "Mike Davis",
    amount: 129,
    date: "2024-06-13",
    status: "completed",
  },
  {
    id: "TXN-004",
    course: "Incident Response Planning",
    student: "Lisa Wilson",
    amount: 149,
    date: "2024-06-12",
    status: "refunded",
  },
  {
    id: "TXN-005",
    course: "Ethical Hacking Fundamentals",
    student: "Tom Brown",
    amount: 99,
    date: "2024-06-11",
    status: "completed",
  },
]

export default function VendorEarnings() {
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.net, 0)
  const pendingEarnings = earningsData
    .filter((item) => item.status === "pending" || item.status === "processing")
    .reduce((sum, item) => sum + item.net, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Earnings</h1>
          <p className="text-slate-600 mt-2">Track your revenue and payment history</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Next payout: June 30, 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,680</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Earnings</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payout Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings Breakdown</CardTitle>
              <CardDescription>Your earnings history with platform fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earningsData.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{earning.month}</h4>
                        <Badge
                          variant={
                            earning.status === "paid"
                              ? "default"
                              : earning.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {earning.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Gross: ${earning.gross} • Fees: ${earning.fees} • Net: ${earning.net}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${earning.net}</div>
                      <div className="text-sm text-muted-foreground">
                        {((earning.net / earning.gross) * 100).toFixed(1)}% after fees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest course purchases and refunds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{transaction.course}</h4>
                      <div className="text-sm text-muted-foreground">
                        {transaction.student} • {transaction.date} • {transaction.id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">${transaction.amount}</span>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "refunded"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>Manage your payment preferences and schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Payment Method</h4>
                    <p className="text-sm text-muted-foreground">Bank Account ending in ****4567</p>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Payout Schedule</h4>
                    <p className="text-sm text-muted-foreground">Monthly on the last day</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Minimum Payout</h4>
                    <p className="text-sm text-muted-foreground">$100 minimum threshold</p>
                  </div>
                  <Button variant="outline">Adjust</Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Tax Information</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Keep your tax information up to date for accurate reporting.
                </p>
                <Button variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Tax Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
