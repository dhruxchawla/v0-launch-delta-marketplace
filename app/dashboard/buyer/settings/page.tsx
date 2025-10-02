"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Bell, CreditCard, Shield, Globe, Save, Download } from "lucide-react"
import { useState } from "react"
import { ProfileImageUpload } from "@/components/profile-image-upload"

export default function BuyerSettings() {
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    bio: "Cybersecurity enthusiast looking to advance my career in information security. Currently working as a junior analyst.",
    location: "New York, NY",
    interests: ["Ethical Hacking", "Network Security", "Incident Response", "Risk Management"],
  })

  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    newCourses: true,
    promotions: false,
    weeklyDigest: true,
    instructorMessages: true,
    certificateReady: true,
  })

  const [learningPreferences, setLearningPreferences] = useState({
    autoplay: true,
    subtitles: false,
    playbackSpeed: "1x",
    downloadQuality: "720p",
    emailReminders: true,
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your account preferences and learning settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
              <CardDescription>Update your personal information and interests</CardDescription>
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
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About Me</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Learning Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm">
                    + Add Interest
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

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autoplay Videos</Label>
                    <p className="text-sm text-muted-foreground">Automatically play the next video in a course</p>
                  </div>
                  <Switch
                    checked={learningPreferences.autoplay}
                    onCheckedChange={(checked) => setLearningPreferences({ ...learningPreferences, autoplay: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Subtitles</Label>
                    <p className="text-sm text-muted-foreground">Display subtitles by default when available</p>
                  </div>
                  <Switch
                    checked={learningPreferences.subtitles}
                    onCheckedChange={(checked) =>
                      setLearningPreferences({ ...learningPreferences, subtitles: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded to continue your courses</p>
                  </div>
                  <Switch
                    checked={learningPreferences.emailReminders}
                    onCheckedChange={(checked) =>
                      setLearningPreferences({ ...learningPreferences, emailReminders: checked })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Playback Speed</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={learningPreferences.playbackSpeed}
                    onChange={(e) => setLearningPreferences({ ...learningPreferences, playbackSpeed: e.target.value })}
                  >
                    <option value="0.5x">0.5x</option>
                    <option value="0.75x">0.75x</option>
                    <option value="1x">1x (Normal)</option>
                    <option value="1.25x">1.25x</option>
                    <option value="1.5x">1.5x</option>
                    <option value="2x">2x</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Download Quality</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={learningPreferences.downloadQuality}
                    onChange={(e) =>
                      setLearningPreferences({ ...learningPreferences, downloadQuality: e.target.value })
                    }
                  >
                    <option value="480p">480p</option>
                    <option value="720p">720p (Recommended)</option>
                    <option value="1080p">1080p</option>
                  </select>
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
                    <Label>Course Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified when your enrolled courses are updated</p>
                  </div>
                  <Switch
                    checked={notifications.courseUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Courses</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new courses in your interests</p>
                  </div>
                  <Switch
                    checked={notifications.newCourses}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newCourses: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Promotions & Discounts</Label>
                    <p className="text-sm text-muted-foreground">Receive special offers and discount notifications</p>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Instructor Messages</Label>
                    <p className="text-sm text-muted-foreground">Get notified when instructors send you messages</p>
                  </div>
                  <Switch
                    checked={notifications.instructorMessages}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, instructorMessages: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Certificate Ready</Label>
                    <p className="text-sm text-muted-foreground">Get notified when your certificates are ready</p>
                  </div>
                  <Switch
                    checked={notifications.certificateReady}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, certificateReady: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly learning progress summaries</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
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
                    <p className="text-sm text-muted-foreground">
                      Make your learning profile visible to other students
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Progress</Label>
                    <p className="text-sm text-muted-foreground">Display your course progress on your profile</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Learning Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Share anonymized learning data to improve recommendations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Recommendations</Label>
                    <p className="text-sm text-muted-foreground">Allow personalized course recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Data Management</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Certificates
                  </Button>
                </div>
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
                  <Label>Payment Methods</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">**** **** **** 4567</p>
                          <p className="text-sm text-muted-foreground">Expires 12/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
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
