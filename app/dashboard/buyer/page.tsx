"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, Clock, TrendingUp, Play, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { buyerService } from "@/lib/buyer"
import { useAuth } from "@/contexts/auth-context"

export default function BuyerDashboardPage() {
  const { user } = useAuth()
  const stats = buyerService.getBuyerStats(user?.id || "")
  const enrolledCourses = buyerService.getEnrolledCourses(user?.id || "").slice(0, 3)
  const cartItems = buyerService.getCartItems(user?.id || "")

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Continue your cybersecurity learning journey</p>
        </div>
        <div className="flex gap-2">
          {cartItems.length > 0 && (
            <Button variant="outline" asChild>
              <Link href="/dashboard/buyer/cart">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartItems.length})
              </Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCoursesEnrolled}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCoursesCompleted} completed (
              {Math.round((stats.totalCoursesCompleted / stats.totalCoursesEnrolled) * 100) || 0}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHoursLearned}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stats.currentStreak} day streak</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
            <p className="text-xs text-muted-foreground">Professional certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
            <Progress value={stats.averageProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Continue Learning</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/buyer/courses">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="relative">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      width={80}
                      height={60}
                      className="rounded object-cover"
                    />
                    {course.progress < 100 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/courses/${course.courseId}`}>
                        {course.progress === 100 ? "Review" : "Continue"}
                      </Link>
                    </Button>
                    {course.certificate?.issued && (
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Completed "Network Security Fundamentals"</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Started "Advanced Penetration Testing"</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Earned certificate in "Incident Response"</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Added course to cart</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Weekly Learning Goal</span>
                <span className="text-sm text-muted-foreground">12/15 hours</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">3 hours remaining this week</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Course Completion</span>
                <span className="text-sm text-muted-foreground">2/3 courses</span>
              </div>
              <Progress value={67} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">1 course to complete this month</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Skill Assessment</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Excellent progress!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
