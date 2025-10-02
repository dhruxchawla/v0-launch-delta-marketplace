"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Award, Clock, BookOpen, Search, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buyerService } from "@/lib/buyer"
import { useAuth } from "@/contexts/auth-context"

export default function BuyerCoursesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [progressFilter, setProgressFilter] = useState("all")

  const allCourses = buyerService.getEnrolledCourses(user?.id || "")

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProgress =
      progressFilter === "all" ||
      (progressFilter === "in-progress" && course.progress > 0 && course.progress < 100) ||
      (progressFilter === "completed" && course.progress === 100) ||
      (progressFilter === "not-started" && course.progress === 0)
    return matchesSearch && matchesProgress
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground">Track your learning progress and continue your courses</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={progressFilter} onValueChange={setProgressFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="lg" className="rounded-full" asChild>
                    <Link href={`/courses/${course.courseId}`}>
                      <Play className="h-6 w-6 mr-2" />
                      {course.progress === 100 ? "Review" : course.progress > 0 ? "Continue" : "Start"}
                    </Link>
                  </Button>
                </div>
                {course.progress === 100 && (
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    <Award className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">By {course.instructor}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                      <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>42h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{course.totalLessons}</span>
                      </div>
                    </div>
                    {course.certificate?.issued && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={course.certificate.certificateUrl || "#"}>
                          <Download className="h-3 w-3 mr-1" />
                          Certificate
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || progressFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't enrolled in any courses yet"}
            </p>
            <Button asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
