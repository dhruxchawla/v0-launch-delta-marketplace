"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { CourseCard } from "@/components/course-card"
import { Icons } from "@/components/icons"
import { courseService, categories, levels } from "@/lib/courses"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [maxPrice, setMaxPrice] = useState([300])
  const [showFilters, setShowFilters] = useState(false)

  const filteredCourses = useMemo(() => {
    return courseService.searchCourses(searchQuery, selectedCategory, selectedLevel, maxPrice[0])
  }, [searchQuery, selectedCategory, selectedLevel, maxPrice])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Categories")
    setSelectedLevel("All Levels")
    setMaxPrice([300])
  }

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== "All Categories" ? selectedCategory : null,
    selectedLevel !== "All Levels" ? selectedLevel : null,
    maxPrice[0] < 300 ? `Under $${maxPrice[0]}` : null,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Browse Cybersecurity Courses</h1>
          <p className="text-slate-600">Discover expert-led courses to advance your cybersecurity career</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              <Icons.Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-sm">{activeFiltersCount}</span>
              )}
            </button>
          </div>

          {/* Filters */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ${showFilters ? "block" : "hidden lg:grid"}`}
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Max Price: ${maxPrice[0]}</label>
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={maxPrice[0]}
                onChange={(e) => setMaxPrice([Number.parseInt(e.target.value)])}
                className="w-full mt-2"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                <Icons.X className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <span className="flex items-center gap-1 bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm">
                  Search: "{searchQuery}"
                  <Icons.X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </span>
              )}
              {selectedCategory !== "All Categories" && (
                <span className="flex items-center gap-1 bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm">
                  {selectedCategory}
                  <Icons.X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All Categories")} />
                </span>
              )}
              {selectedLevel !== "All Levels" && (
                <span className="flex items-center gap-1 bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm">
                  {selectedLevel}
                  <Icons.X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLevel("All Levels")} />
                </span>
              )}
              {maxPrice[0] < 300 && (
                <span className="flex items-center gap-1 bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm">
                  Under ${maxPrice[0]}
                  <Icons.X className="h-3 w-3 cursor-pointer" onClick={() => setMaxPrice([300])} />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-slate-600">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2 text-slate-900">No courses found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
