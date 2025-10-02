import {
  SimpleCard,
  SimpleCardContent,
  SimpleCardFooter,
  SimpleCardHeader,
  SimpleButton,
  SimpleBadge,
  StarIcon,
  UsersIcon,
  ClockIcon,
} from "@/components/simple-icons"

const courses = [
  {
    id: 1,
    title: "Ethical Hacking & Penetration Testing",
    instructor: "Sarah Chen",
    instructorAvatar: "/cybersecurity-expert-woman.png",
    rating: 4.9,
    students: 12500,
    duration: "40 hours",
    price: 299,
    originalPrice: 399,
    level: "Intermediate",
    image: "/ethical-hacking-lab.png",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Network Security"],
  },
  {
    id: 2,
    title: "Cloud Security Architecture",
    instructor: "Michael Rodriguez",
    instructorAvatar: "/professional-cloud-security-architect.png",
    rating: 4.8,
    students: 8900,
    duration: "35 hours",
    price: 349,
    originalPrice: 449,
    level: "Advanced",
    image: "/cloud-security-dashboard.png",
    skills: ["AWS Security", "Azure Security", "Cloud Compliance"],
  },
  {
    id: 3,
    title: "Incident Response & Forensics",
    instructor: "Dr. Emily Watson",
    instructorAvatar: "/placeholder-o9qxj.png",
    rating: 4.9,
    students: 6700,
    duration: "45 hours",
    price: 399,
    originalPrice: 499,
    level: "Advanced",
    image: "/digital-forensics-tools.png",
    skills: ["Digital Forensics", "Incident Response", "Malware Analysis"],
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    instructor: "James Thompson",
    instructorAvatar: "/cybersecurity-instructor.png",
    rating: 4.7,
    students: 15200,
    duration: "25 hours",
    price: 199,
    originalPrice: 299,
    level: "Beginner",
    image: "/cybersecurity-network-basics.png",
    skills: ["Network Security", "Risk Management", "Security Policies"],
  },
]

export function FeaturedCourses() {
  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SimpleBadge variant="secondary" className="mb-4">
            Featured Courses
          </SimpleBadge>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">Master Cybersecurity Skills</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from industry experts with hands-on labs, real-world scenarios, and certification preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <SimpleCard
              key={course.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <SimpleCardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <SimpleBadge
                      variant={
                        course.level === "Beginner"
                          ? "secondary"
                          : course.level === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {course.level}
                    </SimpleBadge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <SimpleButton
                      size="sm"
                      variant="outline"
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </SimpleButton>
                  </div>
                </div>
              </SimpleCardHeader>

              <SimpleCardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {course.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UsersIcon />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.skills.slice(0, 2).map((skill) => (
                    <SimpleBadge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </SimpleBadge>
                  ))}
                  {course.skills.length > 2 && (
                    <SimpleBadge variant="outline" className="text-xs">
                      +{course.skills.length - 2}
                    </SimpleBadge>
                  )}
                </div>
              </SimpleCardContent>

              <SimpleCardFooter className="p-6 pt-0">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${course.price}</span>
                      <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                    <SimpleBadge variant="secondary" className="text-xs">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                    </SimpleBadge>
                  </div>
                  <SimpleButton className="w-full bg-teal-600 hover:bg-teal-700 text-white">Enroll Now</SimpleButton>
                </div>
              </SimpleCardFooter>
            </SimpleCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <SimpleButton variant="outline" size="lg" className="border-teal-600 text-teal-600 hover:bg-teal-50">
            View All Courses
          </SimpleButton>
        </div>
      </div>
    </section>
  )
}
