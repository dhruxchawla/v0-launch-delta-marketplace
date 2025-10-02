import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Course } from "@/lib/courses"

interface CourseCardProps {
  course: Course
  variant?: "default" | "compact"
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            {discountPercentage}% OFF
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-2 right-2">
          {course.level}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>

          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">{course.shortDescription}</p>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
              <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
              <span>({course.studentsCount.toLocaleString()})</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons} lessons</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
            )}
          </div>
          <Button size="sm" asChild>
            <Link href={`/courses/${course.id}`}>View Course</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
