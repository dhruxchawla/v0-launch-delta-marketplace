"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, RefreshCw, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"

const ordersData = [
  {
    id: "ORD-001",
    date: "2024-06-15",
    course: "Ethical Hacking Fundamentals",
    instructor: "Dr. Sarah Mitchell",
    amount: 99,
    status: "completed",
    paymentMethod: "Credit Card",
    transactionId: "TXN-12345",
    downloadLink: "/certificates/ethical-hacking-cert.pdf",
  },
  {
    id: "ORD-002",
    date: "2024-06-10",
    course: "Network Security Essentials",
    instructor: "Prof. Michael Chen",
    amount: 79,
    status: "completed",
    paymentMethod: "PayPal",
    transactionId: "TXN-12346",
    downloadLink: "/certificates/network-security-cert.pdf",
  },
  {
    id: "ORD-003",
    date: "2024-06-05",
    course: "Cybersecurity Risk Management",
    instructor: "Dr. Sarah Mitchell",
    amount: 129,
    status: "active",
    paymentMethod: "Credit Card",
    transactionId: "TXN-12347",
    downloadLink: null,
  },
  {
    id: "ORD-004",
    date: "2024-05-28",
    course: "Incident Response Planning",
    instructor: "James Rodriguez",
    amount: 149,
    status: "refunded",
    paymentMethod: "Credit Card",
    transactionId: "TXN-12348",
    downloadLink: null,
  },
  {
    id: "ORD-005",
    date: "2024-05-20",
    course: "Advanced Penetration Testing",
    instructor: "Prof. Michael Chen",
    amount: 199,
    status: "completed",
    paymentMethod: "Credit Card",
    transactionId: "TXN-12349",
    downloadLink: "/certificates/pen-testing-cert.pdf",
  },
]

export default function BuyerOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof ordersData)[0] | null>(null)

  const filteredOrders = ordersData.filter(
    (order) =>
      order.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalSpent = ordersData.filter((o) => o.status !== "refunded").reduce((sum, order) => sum + order.amount, 0)
  const completedCourses = ordersData.filter((o) => o.status === "completed").length
  const activeCourses = ordersData.filter((o) => o.status === "active").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Order History</h1>
          <p className="text-slate-600 mt-2">View and manage your course purchases</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Order Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent}</div>
            <p className="text-xs text-muted-foreground">
              Across {ordersData.filter((o) => o.status !== "refunded").length} purchases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses}</div>
            <p className="text-xs text-muted-foreground">Certificates available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCourses}</div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="refunded">Refunded</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your complete purchase history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{order.course}</h4>
                          <p className="text-sm text-muted-foreground">by {order.instructor}</p>
                        </div>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "active"
                                ? "secondary"
                                : order.status === "refunded"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{order.date}</span>
                        <span className="font-medium">${order.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedOrder && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                  <CardDescription>Complete information for order {selectedOrder.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedOrder.course}</h3>
                      <p className="text-muted-foreground">by {selectedOrder.instructor}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Order ID:</span>
                        <p className="font-medium">{selectedOrder.id}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <p className="font-medium">{selectedOrder.date}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <p className="font-medium">${selectedOrder.amount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge
                          variant={
                            selectedOrder.status === "completed"
                              ? "default"
                              : selectedOrder.status === "active"
                                ? "secondary"
                                : selectedOrder.status === "refunded"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {selectedOrder.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payment:</span>
                        <p className="font-medium">{selectedOrder.paymentMethod}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Transaction:</span>
                        <p className="font-medium">{selectedOrder.transactionId}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    {selectedOrder.status === "completed" && selectedOrder.downloadLink && (
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    )}
                    {selectedOrder.status === "active" && <Button size="sm">Continue Learning</Button>}
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
              <CardDescription>Courses you have successfully completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders
                  .filter((o) => o.status === "completed")
                  .map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.course}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {order.instructor} • Completed on {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Completed</Badge>
                        {order.downloadLink && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
              <CardDescription>Courses you are currently enrolled in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders
                  .filter((o) => o.status === "active")
                  .map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.course}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {order.instructor} • Enrolled on {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Active</Badge>
                        <Button size="sm">Continue Learning</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunded" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refunded Orders</CardTitle>
              <CardDescription>Orders that have been refunded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders
                  .filter((o) => o.status === "refunded")
                  .map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.course}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {order.instructor} • Refunded on {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">Refunded</Badge>
                        <span className="text-sm font-medium">${order.amount}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
