"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Users, Award, Target, Globe, Heart, Zap, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "CEO & Co-Founder",
    bio: "Former CISO with 15+ years in cybersecurity. Led security teams at Fortune 500 companies.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    bio: "Security researcher and ethical hacker. Published author on penetration testing methodologies.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "Emily Watson",
    role: "Head of Education",
    bio: "PhD in Computer Science. Former professor specializing in cybersecurity education and curriculum design.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "James Rodriguez",
    role: "Lead Security Instructor",
    bio: "Certified ethical hacker and digital forensics expert. 10+ years of hands-on security experience.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
]

const values = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We prioritize the highest security standards in everything we do, from our platform to our curriculum.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our vibrant community of learners and experts drives innovation and knowledge sharing.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest quality standards in our courses, instructors, and learning experience.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Making cybersecurity education accessible to everyone, regardless of background or location.",
  },
]

const stats = [
  { number: "50K+", label: "Students Worldwide" },
  { number: "500+", label: "Expert Instructors" },
  { number: "1000+", label: "Courses Available" },
  { number: "95%", label: "Job Placement Rate" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">
              About Launch Delta
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering the Next Generation of
              <span className="text-primary"> Cybersecurity Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Launch Delta is the world's leading cybersecurity education platform, trusted by over 50,000 professionals
              to advance their careers and protect organizations from evolving cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  Our Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging the Cybersecurity Skills Gap</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  With cyber threats evolving daily and a global shortage of 3.5 million cybersecurity professionals,
                  we're on a mission to democratize cybersecurity education and create the next generation of defenders.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our platform combines cutting-edge curriculum, hands-on labs, and real-world scenarios to prepare
                  students for the challenges they'll face in their cybersecurity careers.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="font-medium">Industry-Aligned Curriculum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-secondary" />
                    <span className="font-medium">Hands-On Learning</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/cybersecurity-team-collaboration.png"
                  alt="Cybersecurity professionals collaborating"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What Drives Us Forward</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our core values guide every decision we make and shape the learning experience we provide.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Our Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Experts Behind Launch Delta</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our leadership team brings decades of combined experience in cybersecurity, education, and technology.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={member.linkedin}>Connect</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">
                  Our Story
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">From Idea to Impact</h2>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2019 - The Beginning</h3>
                    <p className="text-muted-foreground">
                      Founded by cybersecurity veterans Sarah Mitchell and Michael Chen, Launch Delta began as a
                      response to the growing skills gap in cybersecurity. Having witnessed firsthand the challenges
                      organizations faced in finding qualified security professionals, they set out to create a
                      comprehensive learning platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2020-2022 - Building Excellence</h3>
                    <p className="text-muted-foreground">
                      We partnered with industry experts and leading cybersecurity professionals to develop our
                      curriculum. Our focus on hands-on learning and real-world scenarios quickly gained recognition,
                      attracting thousands of students and top-tier instructors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2023-Present - Global Impact</h3>
                    <p className="text-muted-foreground">
                      Today, Launch Delta serves over 50,000 students worldwide, with graduates working at leading
                      organizations across the globe. We continue to innovate and expand our offerings, staying ahead of
                      emerging threats and technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Cybersecurity Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have advanced their careers with Launch Delta's comprehensive
              cybersecurity training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
