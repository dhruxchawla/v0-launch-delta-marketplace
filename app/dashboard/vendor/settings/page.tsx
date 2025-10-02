"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Bell, CreditCard, Shield, Globe, Upload, Save } from "lucide-react"
import { useState } from "react"
import { ProfileImageUpload } from "@/components/profile-image-upload"

export default function VendorSettings() {
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    bio: "Cybersecurity expert with 15+ years of experience in ethical hacking, network security, and risk management. Former CISO at Fortune 500 companies.",
    website: "https://sarahmitchell.com",
    linkedin: "https://linkedin.com/in/sarahmitchell",
    twitter: "@sarahmitchell_sec",
    location: "San Francisco, CA",
    expertise: ["Ethical Hacking", "Network Security", "Risk Management", "Incident Response"],
  })

  const [notifications, setNotifications] = useState({
    newEnrollments: true,
    courseReviews: true,
    paymentUpdates: true,
    marketingEmails: false,
    weeklyReports: true,
    studentMessages: true,
  })

  const [paymentInfo, setPaymentInfo] = useState({
    paypalEmail: "sarah.mitchell@paypal.com",
    bankAccount: "****4567",
    taxId: "12-3456789",
    payoutSchedule: "monthly",
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your account preferences and profile</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your public profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <ProfileImageUpload size="lg" showUploadButton={true} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Areas of Expertise</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm">
                    + Add Skill
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Enrollments</Label>
                    <p className="text-sm text-muted-foreground">Get notified when students enroll in your courses</p>
                  </div>
                  <Switch
                    checked={notifications.newEnrollments}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newEnrollments: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Reviews</Label>
                    <p className="text-sm text-muted-foreground">Get notified when students leave reviews</p>
                  </div>
                  <Switch
                    checked={notifications.courseReviews}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, courseReviews: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about earnings and payouts</p>
                  </div>
                  <Switch
                    checked={notifications.paymentUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentUpdates: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Student Messages</Label>
                    <p className="text-sm text-muted-foreground">Get notified when students send you messages</p>
                  </div>
                  <Switch
                    checked={notifications.studentMessages}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, studentMessages: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive tips and promotional content</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>Manage your payout methods and tax information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paypal">PayPal Email</Label>
                  <Input
                    id="paypal"
                    type="email"
                    value={paymentInfo.paypalEmail}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, paypalEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank">Bank Account</Label>
                  <Input
                    id="bank"
                    value={paymentInfo.bankAccount}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, bankAccount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax ID</Label>
                  <Input
                    id="tax"
                    value={paymentInfo.taxId}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, taxId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Payout Schedule</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="weekly">Weekly</option>
                    <option value="monthly" selected>
                      Monthly
                    </option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Tax Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload W-9 Form
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Tax Certificate
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Payment Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your instructor profile visible to students</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Earnings</Label>
                    <p className="text-sm text-muted-foreground">Display your total earnings on your profile</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Student Contact</Label>
                    <p className="text-sm text-muted-foreground">Allow students to contact you directly</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share anonymized data to improve the platform</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Data Export</h4>
                <p className="text-sm text-muted-foreground">
                  Download a copy of your data including courses, students, and earnings.
                </p>
                <Button variant="outline">Request Data Export</Button>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account security and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Change Password</Label>
                  <div className="space-y-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>

                <div className="space-y-2">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="space-y-2">
                  <Label>Language & Region</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select className="w-full p-2 border rounded-md">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                    <select className="w-full p-2 border rounded-md">
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-red-200">
                <h4 className="font-medium text-red-600">Danger Zone</h4>
                <div className="space-y-2">
                  <Label className="text-red-600">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
