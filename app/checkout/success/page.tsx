"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, BookOpen, Award, Mail } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function CheckoutSuccessPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("transaction")
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Simulate sending confirmation email
    const timer = setTimeout(() => {
      setEmailSent(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your cybersecurity learning journey starts now!
            </p>
          </div>

          {/* Transaction Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Transaction ID:</span>
                <Badge variant="outline" className="font-mono">
                  {transactionId}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <Badge className="bg-green-600">Completed</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Check Your Email</h3>
                  <p className="text-sm text-muted-foreground">
                    {emailSent ? "Confirmation email sent!" : "Sending confirmation email..."}
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Start Learning</h3>
                  <p className="text-sm text-muted-foreground">Access your courses immediately</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Earn Certificates</h3>
                  <p className="text-sm text-muted-foreground">Complete courses to earn certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard/buyer">
                <BookOpen className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>

          {/* Support */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Need help getting started? Our support team is here to help.</p>
            <Button variant="outline" asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
