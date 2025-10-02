import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Jennifer Martinez",
    role: "Security Analyst",
    company: "Goldman Sachs",
    avatar: "/placeholder-mze0t.png",
    rating: 5,
    content:
      "The penetration testing course completely transformed my career. I went from help desk to security analyst in just 8 months. The hands-on labs were incredibly realistic.",
    course: "Ethical Hacking & Penetration Testing",
    outcome: "Promoted to Security Analyst",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Cloud Security Engineer",
    company: "Netflix",
    avatar: "/asian-cloud-engineer.png",
    rating: 5,
    content:
      "As someone transitioning from traditional IT to cloud security, this platform provided exactly what I needed. The AWS security course was comprehensive and practical.",
    course: "Cloud Security Architecture",
    outcome: "40% salary increase",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Incident Response Manager",
    company: "Microsoft",
    avatar: "/placeholder-y98lb.png",
    rating: 5,
    content:
      "The digital forensics course gave me the skills to lead our incident response team. The real-world scenarios prepared me for actual breaches we faced.",
    course: "Incident Response & Forensics",
    outcome: "Led team through major incident",
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "Cybersecurity Consultant",
    company: "Deloitte",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "The learning paths are brilliantly structured. I completed the analyst track and immediately felt confident in my new role. The instructors are world-class.",
    course: "Cybersecurity Analyst Career Path",
    outcome: "Started consulting career",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Security Architect",
    company: "Apple",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "The advanced threat detection course helped me design better security architectures. The content is always up-to-date with the latest threats and techniques.",
    course: "Advanced Threat Detection",
    outcome: "Promoted to Senior Architect",
  },
  {
    id: 6,
    name: "Robert Thompson",
    role: "CISO",
    company: "JPMorgan Chase",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "I recommend this platform to my entire team. The quality of instruction and practical focus makes it the best cybersecurity training available.",
    course: "Multiple Courses",
    outcome: "Team skill advancement",
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Student Success Stories
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">Real Results from Real Professionals</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our students have advanced their careers and made real impact in cybersecurity roles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-primary">{testimonial.company}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="text-xs text-muted-foreground mb-1">Course Completed:</div>
                    <div className="text-sm font-medium mb-2">{testimonial.course}</div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.outcome}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
