import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, Award, MapPin } from "lucide-react"

const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Senior Security Architect",
    company: "Microsoft",
    avatar: "/asian-cybersecurity-expert.png",
    rating: 4.9,
    students: 25600,
    courses: 12,
    specialties: ["Penetration Testing", "Ethical Hacking", "Network Security"],
    location: "Seattle, WA",
    bio: "Former NSA analyst with 15+ years in cybersecurity. CISSP, CEH, and OSCP certified.",
    achievements: ["Top 1% Instructor", "Industry Expert", "Published Author"],
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Cloud Security Lead",
    company: "Amazon Web Services",
    avatar: "/hispanic-cloud-security-architect.png",
    rating: 4.8,
    students: 18900,
    courses: 8,
    specialties: ["Cloud Security", "AWS", "DevSecOps"],
    location: "Austin, TX",
    bio: "AWS Security Specialist with expertise in cloud architecture and compliance frameworks.",
    achievements: ["AWS Hero", "Conference Speaker", "Security Champion"],
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    title: "Digital Forensics Expert",
    company: "FBI Cyber Division",
    avatar: "/placeholder-o9qxj.png",
    rating: 4.9,
    students: 14200,
    courses: 6,
    specialties: ["Digital Forensics", "Incident Response", "Malware Analysis"],
    location: "Washington, DC",
    bio: "Former FBI Special Agent specializing in cybercrime investigations and digital evidence.",
    achievements: ["Government Expert", "Court Testimony", "Research Leader"],
  },
  {
    id: 4,
    name: "James Thompson",
    title: "CISO & Security Consultant",
    company: "Fortune 500 Companies",
    avatar: "/cybersecurity-executive.png",
    rating: 4.7,
    students: 32100,
    courses: 15,
    specialties: ["Risk Management", "Compliance", "Security Leadership"],
    location: "New York, NY",
    bio: "Veteran CISO with 20+ years leading security programs for major corporations.",
    achievements: ["Industry Leader", "Board Advisor", "Keynote Speaker"],
  },
  {
    id: 5,
    name: "Alex Kim",
    title: "Threat Intelligence Analyst",
    company: "CrowdStrike",
    avatar: "/asian-threat-analyst.png",
    rating: 4.8,
    students: 11800,
    courses: 9,
    specialties: ["Threat Intelligence", "OSINT", "Threat Hunting"],
    location: "San Francisco, CA",
    bio: "Threat intelligence expert tracking advanced persistent threats and nation-state actors.",
    achievements: ["Threat Hunter", "Research Published", "CTI Expert"],
  },
]

export function TopInstructors() {
  return (
    <section id="instructors" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Expert Instructors
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">Learn from Industry Leaders</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our instructors are practicing cybersecurity professionals from top companies and government agencies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {instructors.map((instructor) => (
            <Card
              key={instructor.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <h3 className="font-semibold text-lg mb-1">{instructor.name}</h3>
                <p className="text-sm text-primary font-medium mb-1">{instructor.title}</p>
                <p className="text-xs text-muted-foreground mb-3">{instructor.company}</p>

                <div className="flex items-center justify-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{(instructor.students / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mb-4 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{instructor.location}</span>
                </div>

                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{instructor.bio}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {instructor.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  {instructor.achievements.slice(0, 2).map((achievement) => (
                    <div key={achievement} className="flex items-center gap-2 text-xs">
                      <Award className="h-3 w-3 text-primary" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Meet All Instructors
          </Button>
        </div>
      </div>
    </section>
  )
}
