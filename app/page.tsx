import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCourses } from "@/components/featured-courses"
import { PopularCategories } from "@/components/popular-categories"
import { TopInstructors } from "@/components/top-instructors"
import { LearningPaths } from "@/components/learning-paths"
import { Testimonials } from "@/components/testimonials"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCourses />
        <PopularCategories />
        <LearningPaths />
        <TopInstructors />
        <StatsSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
