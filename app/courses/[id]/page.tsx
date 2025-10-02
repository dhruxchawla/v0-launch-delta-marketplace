"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs } from "@/components/ui/tabs"
import {
  AwardIcon,
  StarIcon,
  ClockIcon,
  BookOpenIcon,
  GlobeIcon,
  CalendarIcon,
  UsersIcon,
  PlayIcon,
  CheckIcon,
  LockIcon,
  ShoppingCartIcon,
} from "@/components/simple-icons"
import Image from "next/image"
import { courseService } from "@/lib/courses"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export default function CourseDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const { addToCart, cartItems } = useCart()
  const [selectedTab, setSelectedTab] = useState("overview")

  const course = courseService.getCourseById(params.id as string)

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const isInCart = cartItems.some((item) => item.courseId === course.id)

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(course.id, {
        title: course.title,
        instructor: course.instructor.name,
        thumbnail: course.thumbnail,
        price: course.price,
        originalPrice: course.originalPrice,
      })
    }
  }

  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
                {course.certificate && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    <AwardIcon className="h-3 w-3 mr-1" />
                    Certificate
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.studentsCount.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpenIcon className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <GlobeIcon className="h-4 w-4" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 mt-6 p-4 border rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{course.instructor.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.instructor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="h-3 w-3" />
                      <span>{course.instructor.studentsCount.toLocaleString()} students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Preview */}
            <div className="mb-8">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button size="lg" className="rounded-full">
                    <PlayIcon className="h-6 w-6 mr-2" />
                    Preview Course
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <div className="flex border-b">
                <button
                  onClick={() => setSelectedTab("overview")}
                  className={`px-4 py-2 font-medium ${selectedTab === "overview" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setSelectedTab("curriculum")}
                  className={`px-4 py-2 font-medium ${selectedTab === "curriculum" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
                >
                  Curriculum
                </button>
                <button
                  onClick={() => setSelectedTab("reviews")}
                  className={`px-4 py-2 font-medium ${selectedTab === "reviews" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
                >
                  Reviews
                </button>
              </div>

              {selectedTab === "overview" && (
                <div className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>What you'll learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {selectedTab === "curriculum" && (
                <div className="mt-6 space-y-4">
                  {course.curriculum.map((section, sectionIndex) => (
                    <Card key={sectionIndex}>
                      <CardHeader>
                        <CardTitle className="text-lg">{section.section}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between p-2 hover:bg-muted rounded"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.preview ? (
                                  <PlayIcon className="h-4 w-4 text-primary" />
                                ) : (
                                  <LockIcon className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-sm">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                {lesson.preview && (
                                  <Badge variant="outline" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {selectedTab === "reviews" && (
                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-muted-foreground">
                        <UsersIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Reviews will be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Price */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-primary">${course.price}</span>
                      {course.originalPrice && (
                        <>
                          <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                          <Badge className="bg-destructive text-destructive-foreground">
                            {discountPercentage}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">30-day money-back guarantee</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {user ? (
                      <>
                        <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={isInCart}>
                          <ShoppingCartIcon className="h-4 w-4 mr-2" />
                          {isInCart ? "Added to Cart" : "Add to Cart"}
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent" size="lg">
                          Buy Now
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full" size="lg" asChild>
                        <a href="/signup">Sign Up to Enroll</a>
                      </Button>
                    )}
                  </div>

                  {/* Course Includes */}
                  <div>
                    <h3 className="font-semibold mb-3">This course includes:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{course.duration} on-demand video</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      {course.certificate && (
                        <div className="flex items-center gap-2">
                          <AwardIcon className="h-4 w-4 text-muted-foreground" />
                          <span>Certificate of completion</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Lifetime access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
