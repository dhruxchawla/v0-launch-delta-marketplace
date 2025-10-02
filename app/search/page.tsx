"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { CourseCard } from "@/components/course-card"
import { Icons } from "@/components/icons"
import { courseService } from "@/lib/courses"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState(courseService.getAllCourses())

  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchQuery(query)
    setResults(courseService.searchCourses(query))
  }, [searchParams])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setResults(courseService.searchCourses(query))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-slate-900">Search Courses</h1>

          <div className="relative max-w-2xl">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search for courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-lg border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-600">
              {searchQuery ? (
                <>
                  {results.length} result{results.length !== 1 ? "s" : ""} for "{searchQuery}"
                </>
              ) : (
                `${results.length} course${results.length !== 1 ? "s" : ""} available`
              )}
            </p>

            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="flex items-center gap-2 px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm"
              >
                <Icons.X className="h-4 w-4" />
                Clear Search
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mb-6">
              <span className="flex items-center gap-1 bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm w-fit">
                Search: "{searchQuery}"
                <Icons.X className="h-3 w-3 cursor-pointer" onClick={() => handleSearch("")} />
              </span>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icons.Search className="h-16 w-16 mx-auto mb-4 text-slate-400 opacity-50" />
            <h3 className="text-lg font-semibold mb-2 text-slate-900">No courses found</h3>
            <p className="text-slate-600 mb-4">
              {searchQuery
                ? `No courses match "${searchQuery}". Try different keywords.`
                : "Start typing to search for courses."}
            </p>
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Browse All Courses
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
