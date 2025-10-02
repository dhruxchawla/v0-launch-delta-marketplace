"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Search, Filter, ShoppingCart, Star, Clock, Users, Trash2 } from "lucide-react"
import { useState } from "react"

const wishlistData = [
  {
    id: 1,
    title: "Advanced Malware Analysis",
    instructor: "Dr. Emily Watson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    price: 179,
    originalPrice: 199,
    rating: 4.9,
    students: 1247,
    duration: "12 hours",
    level: "Advanced",
    category: "Malware Analysis",
    image: "/malware-analysis-course.png",
    addedDate: "2024-06-10",
    onSale: true,
    discount: 10,
  },
  {
    id: 2,
    title: "Cloud Security Architecture",
    instructor: "Prof. Michael Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    price: 149,
    originalPrice: 149,
    rating: 4.7,
    students: 892,
    duration: "10 hours",
    level: "Intermediate",
    category: "Cloud Security",
    image: "/cloud-security-course.png",
    addedDate: "2024-06-05",
    onSale: false,
    discount: 0,
  },
  {
    id: 3,
    title: "Digital Forensics Fundamentals",
    instructor: "James Rodriguez",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    price: 119,
    originalPrice: 159,
    rating: 4.8,
    students: 2156,
    duration: "14 hours",
    level: "Beginner",
    category: "Digital Forensics",
    image: "/digital-forensics-course.png",
    addedDate: "2024-05-28",
    onSale: true,
    discount: 25,
  },
  {
    id: 4,
    title: "IoT Security Testing",
    instructor: "Dr. Sarah Mitchell",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    price: 199,
    originalPrice: 199,
    rating: 4.6,
    students: 634,
    duration: "8 hours",
    level: "Advanced",
    category: "IoT Security",
    image: "/placeholder-cr8kt.png",
    addedDate: "2024-05-20",
    onSale: false,
    discount: 0,
  },
  {
    id: 5,
    title: "Blockchain Security Essentials",
    instructor: "Alex Thompson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    price: 89,
    originalPrice: 129,
    rating: 4.5,
    students: 1789,
    duration: "6 hours",
    level: "Intermediate",
    category: "Blockchain",
    image: "/blockchain-security-course.png",
    addedDate: "2024-05-15",
    onSale: true,
    discount: 31,
  },
]

export default function BuyerWishlist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const filteredWishlist = wishlistData.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalValue = wishlistData.reduce((sum, course) => sum + course.price, 0)
  const totalSavings = wishlistData.reduce((sum, course) => sum + (course.originalPrice - course.price), 0)
  const onSaleItems = wishlistData.filter((course) => course.onSale).length

  const toggleSelection = (courseId: number) => {
    setSelectedItems((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  const removeFromWishlist = (courseId: number) => {
    // In a real app, this would make an API call
    console.log(`Removing course ${courseId} from wishlist`)
  }

  const addToCart = (courseId: number) => {
    // In a real app, this would add to cart
    console.log(`Adding course ${courseId} to cart`)
  }

  const addSelectedToCart = () => {
    // In a real app, this would add all selected items to cart
    console.log(`Adding ${selectedItems.length} items to cart`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
          <p className="text-slate-600 mt-2">Courses you want to take later</p>
        </div>
        {selectedItems.length > 0 && (
          <Button onClick={addSelectedToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add {selectedItems.length} to Cart
          </Button>
        )}
      </div>

      {/* Wishlist Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wishlistData.length}</div>
            <p className="text-xs text-muted-foreground">Courses in wishlist</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">${totalSavings} saved</span> from discounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Sale</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onSaleItems}</div>
            <p className="text-xs text-muted-foreground">Items currently discounted</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {filteredWishlist.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground text-center mb-4">
                Browse courses and add them to your wishlist to save for later
              </p>
              <Button>Browse Courses</Button>
            </CardContent>
          </Card>
        ) : (
          filteredWishlist.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-64 h-48 md:h-auto">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.onSale && (
                      <Badge className="absolute top-2 left-2 bg-red-500">{course.discount}% OFF</Badge>
                    )}
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(course.id)}
                            onChange={() => toggleSelection(course.id)}
                            className="rounded"
                          />
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>

                        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>

                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {course.instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{course.instructor}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">Added to wishlist on {course.addedDate}</p>
                      </div>

                      <div className="text-right ml-4">
                        <div className="mb-4">
                          <div className="text-2xl font-bold">${course.price}</div>
                          {course.onSale && (
                            <div className="text-sm text-muted-foreground line-through">${course.originalPrice}</div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full" onClick={() => addToCart(course.id)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full bg-transparent"
                            onClick={() => removeFromWishlist(course.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredWishlist.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Ready to start learning?</h3>
                <p className="text-sm text-muted-foreground">
                  Add all items to cart and save ${totalSavings} with current discounts
                </p>
              </div>
              <Button size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart (${totalValue})
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
