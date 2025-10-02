"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Star, Search, Filter, MessageCircle, ThumbsUp, Flag } from "lucide-react"
import { useState } from "react"

const reviewsData = [
  {
    id: 1,
    student: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "john.smith@email.com",
    },
    course: "Ethical Hacking Fundamentals",
    rating: 5,
    title: "Excellent course with practical examples",
    content:
      "This course exceeded my expectations. The instructor explains complex concepts in a very understandable way, and the hands-on labs are incredibly valuable. I feel much more confident in my ethical hacking skills now.",
    date: "2024-06-10",
    helpful: 12,
    replied: true,
    verified: true,
  },
  {
    id: 2,
    student: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "sarah.j@email.com",
    },
    course: "Network Security Essentials",
    rating: 4,
    title: "Great content, could use more examples",
    content:
      "The course covers all the essential topics in network security. The theoretical foundation is solid, but I would have liked to see more real-world examples and case studies.",
    date: "2024-06-08",
    helpful: 8,
    replied: false,
    verified: true,
  },
  {
    id: 3,
    student: {
      name: "Mike Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "mike.davis@email.com",
    },
    course: "Cybersecurity Risk Management",
    rating: 5,
    title: "Perfect for risk management professionals",
    content:
      "As someone working in risk management, this course provided exactly what I needed. The frameworks and methodologies are current and applicable to real business scenarios.",
    date: "2024-06-05",
    helpful: 15,
    replied: true,
    verified: true,
  },
  {
    id: 4,
    student: {
      name: "Lisa Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "lisa.wilson@email.com",
    },
    course: "Incident Response Planning",
    rating: 3,
    title: "Good content but pacing could be better",
    content:
      "The course material is comprehensive and well-researched. However, some sections feel rushed while others drag on. Better pacing would make this course much more engaging.",
    date: "2024-06-03",
    helpful: 5,
    replied: false,
    verified: true,
  },
  {
    id: 5,
    student: {
      name: "Tom Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "tom.brown@email.com",
    },
    course: "Ethical Hacking Fundamentals",
    rating: 5,
    title: "Outstanding instructor and course structure",
    content:
      "This is hands down the best cybersecurity course I've taken. The instructor's expertise shines through every lesson, and the progressive difficulty keeps you engaged throughout.",
    date: "2024-06-01",
    helpful: 20,
    replied: true,
    verified: true,
  },
]

export default function VendorReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReview, setSelectedReview] = useState<(typeof reviewsData)[0] | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredReviews = reviewsData.filter(
    (review) =>
      review.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const averageRating = (reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length).toFixed(1)
  const totalReviews = reviewsData.length
  const pendingReplies = reviewsData.filter((r) => !r.replied).length

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviewsData.filter((r) => r.rating === rating).length,
    percentage: (reviewsData.filter((r) => r.rating === rating).length / totalReviews) * 100,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reviews</h1>
          <p className="text-slate-600 mt-2">Manage student feedback and ratings</p>
        </div>
        <Button>
          <MessageCircle className="h-4 w-4 mr-2" />
          Reply to All
        </Button>
      </div>

      {/* Reviews Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(Number.parseFloat(averageRating))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Replies</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReplies}</div>
            <p className="text-xs text-muted-foreground">Need your response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Helpful Votes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewsData.reduce((sum, r) => sum + r.helpful, 0)}</div>
            <p className="text-xs text-muted-foreground">Total helpful votes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="pending">Pending Replies</TabsTrigger>
            <TabsTrigger value="ratings">Rating Breakdown</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
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
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>Latest student feedback across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <div
                      key={review.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedReview?.id === review.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedReview(review)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-sm">{review.student.name}</h4>
                            <p className="text-xs text-muted-foreground">{review.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          {!review.replied && (
                            <Badge variant="destructive" className="text-xs">
                              Reply Needed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <h5 className="font-medium text-sm mb-1">{review.title}</h5>
                      <p className="text-sm text-muted-foreground line-clamp-2">{review.content}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>{review.date}</span>
                        <span>{review.helpful} helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedReview && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Details</CardTitle>
                  <CardDescription>Respond to student feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={selectedReview.student.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedReview.student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{selectedReview.student.name}</h3>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= selectedReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{selectedReview.course}</p>
                      <h4 className="font-medium mb-2">{selectedReview.title}</h4>
                      <p className="text-sm">{selectedReview.content}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{selectedReview.date}</span>
                        <span>{selectedReview.helpful} helpful</span>
                        {selectedReview.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {!selectedReview.replied && (
                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-medium">Reply to Review</h4>
                      <Textarea
                        placeholder="Write your response..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button size="sm">Send Reply</Button>
                        <Button variant="outline" size="sm">
                          Save Draft
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedReview.replied && (
                    <div className="pt-4 border-t">
                      <Badge variant="default" className="mb-2">
                        Replied
                      </Badge>
                      <p className="text-sm text-muted-foreground">You have already responded to this review.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews Needing Replies</CardTitle>
              <CardDescription>Student reviews that haven't been responded to yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReviews
                  .filter((r) => !r.replied)
                  .map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-sm">{review.student.name}</h4>
                            <p className="text-xs text-muted-foreground">{review.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="destructive" className="text-xs">
                            Reply Needed
                          </Badge>
                        </div>
                      </div>
                      <h5 className="font-medium text-sm mb-1">{review.title}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{review.content}</p>
                      <Button size="sm">
                        <MessageCircle className="h-3 w-3 mr-2" />
                        Reply
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Breakdown of ratings across all your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{item.rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <div className="text-sm text-muted-foreground w-16 text-right">
                      {item.count} ({item.percentage.toFixed(0)}%)
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
