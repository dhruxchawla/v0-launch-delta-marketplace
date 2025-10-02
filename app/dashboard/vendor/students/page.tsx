"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Search, Filter, MessageCircle, Award, TrendingUp } from "lucide-react"
import { useState } from "react"

const studentsData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 3,
    totalProgress: 75,
    lastActive: "2 hours ago",
    joinDate: "2024-01-15",
    totalSpent: 327,
    courses: [
      { name: "Ethical Hacking Fundamentals", progress: 85, status: "active" },
      { name: "Network Security Essentials", progress: 60, status: "active" },
      { name: "Cybersecurity Risk Management", progress: 80, status: "completed" },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 2,
    totalProgress: 90,
    lastActive: "1 day ago",
    joinDate: "2024-02-20",
    totalSpent: 208,
    courses: [
      { name: "Ethical Hacking Fundamentals", progress: 95, status: "active" },
      { name: "Incident Response Planning", progress: 85, status: "active" },
    ],
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 4,
    totalProgress: 65,
    lastActive: "3 days ago",
    joinDate: "2023-11-10",
    totalSpent: 456,
    courses: [
      { name: "Ethical Hacking Fundamentals", progress: 100, status: "completed" },
      { name: "Network Security Essentials", progress: 70, status: "active" },
      { name: "Cybersecurity Risk Management", progress: 45, status: "active" },
      { name: "Incident Response Planning", progress: 30, status: "active" },
    ],
  },
  {
    id: 4,
    name: "Lisa Wilson",
    email: "lisa.wilson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 1,
    totalProgress: 40,
    lastActive: "1 week ago",
    joinDate: "2024-03-05",
    totalSpent: 149,
    courses: [{ name: "Incident Response Planning", progress: 40, status: "active" }],
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom.brown@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 2,
    totalProgress: 95,
    lastActive: "5 hours ago",
    joinDate: "2024-01-28",
    totalSpent: 248,
    courses: [
      { name: "Ethical Hacking Fundamentals", progress: 100, status: "completed" },
      { name: "Network Security Essentials", progress: 90, status: "active" },
    ],
  },
]

export default function VendorStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<(typeof studentsData)[0] | null>(null)

  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalStudents = studentsData.length
  const activeStudents = studentsData.filter(
    (s) => s.lastActive.includes("hour") || s.lastActive.includes("day"),
  ).length
  const avgProgress = Math.round(studentsData.reduce((sum, s) => sum + s.totalProgress, 0) / studentsData.length)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-600 mt-2">Manage and track your student progress</p>
        </div>
        <Button>
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      {/* Student Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">Active in last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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
                <CardTitle>Student List</CardTitle>
                <CardDescription>All enrolled students across your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStudent?.id === student.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{student.enrolledCourses} courses</div>
                        <div className="text-xs text-muted-foreground">{student.lastActive}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedStudent && (
              <Card>
                <CardHeader>
                  <CardTitle>Student Details</CardTitle>
                  <CardDescription>Detailed information for {selectedStudent.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedStudent.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedStudent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedStudent.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Joined:</span>
                      <p className="font-medium">{selectedStudent.joinDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Spent:</span>
                      <p className="font-medium">${selectedStudent.totalSpent}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Active:</span>
                      <p className="font-medium">{selectedStudent.lastActive}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Progress:</span>
                      <p className="font-medium">{selectedStudent.totalProgress}%</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Course Progress</h4>
                    <div className="space-y-3">
                      {selectedStudent.courses.map((course, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{course.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant={course.status === "completed" ? "default" : "secondary"}>
                                {course.status}
                              </Badge>
                              <span className="text-sm">{course.progress}%</span>
                            </div>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
              <CardDescription>Students who have been active recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents
                  .filter((s) => s.lastActive.includes("hour") || s.lastActive.includes("day"))
                  .map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">Last active: {student.lastActive}</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Students with Completed Courses</CardTitle>
              <CardDescription>Students who have completed at least one course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents
                  .filter((s) => s.courses.some((c) => c.status === "completed"))
                  .map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.courses.filter((c) => c.status === "completed").length} completed courses
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">
                        <Award className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
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
