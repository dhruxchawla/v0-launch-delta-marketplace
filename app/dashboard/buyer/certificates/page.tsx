"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Download, Search, Filter, Calendar, Share2, Eye } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const certificatesData = [
  {
    id: 1,
    title: "Ethical Hacking Fundamentals",
    instructor: "Dr. Sarah Mitchell",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    completedDate: "2024-06-15",
    issueDate: "2024-06-16",
    certificateId: "CERT-EH-001-2024",
    grade: "A+",
    score: 95,
    credentialUrl: "https://credentials.launchdelta.com/cert-eh-001",
    downloadUrl: "/certificates/ethical-hacking-cert.pdf",
    verified: true,
    skills: ["Penetration Testing", "Vulnerability Assessment", "Network Security"],
    courseDuration: "42 hours",
    courseImage: "/ethical-hacking-course.png",
  },
  {
    id: 2,
    title: "Network Security Essentials",
    instructor: "Prof. Michael Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    completedDate: "2024-06-10",
    issueDate: "2024-06-11",
    certificateId: "CERT-NS-002-2024",
    grade: "A",
    score: 88,
    credentialUrl: "https://credentials.launchdelta.com/cert-ns-002",
    downloadUrl: "/certificates/network-security-cert.pdf",
    verified: true,
    skills: ["Firewall Configuration", "Network Monitoring", "Intrusion Detection"],
    courseDuration: "35 hours",
    courseImage: "/network-security-course.png",
  },
  {
    id: 3,
    title: "Advanced Penetration Testing",
    instructor: "Prof. Michael Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    completedDate: "2024-05-20",
    issueDate: "2024-05-21",
    certificateId: "CERT-APT-003-2024",
    grade: "A+",
    score: 97,
    credentialUrl: "https://credentials.launchdelta.com/cert-apt-003",
    downloadUrl: "/certificates/pen-testing-cert.pdf",
    verified: true,
    skills: ["Advanced Exploitation", "Post-Exploitation", "Red Team Operations"],
    courseDuration: "56 hours",
    courseImage: "/pen-testing-course.png",
  },
]

export default function BuyerCertificates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificatesData)[0] | null>(null)

  const filteredCertificates = certificatesData.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalCertificates = certificatesData.length
  const averageScore = Math.round(certificatesData.reduce((sum, cert) => sum + cert.score, 0) / totalCertificates)
  const totalHours = certificatesData.reduce((sum, cert) => sum + Number.parseInt(cert.courseDuration), 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Certificates</h1>
          <p className="text-slate-600 mt-2">Your earned certifications and achievements</p>
        </div>
        <Button>
          <Share2 className="h-4 w-4 mr-2" />
          Share Profile
        </Button>
      </div>

      {/* Certificate Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCertificates}</div>
            <p className="text-xs text-muted-foreground">Professional certifications earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">Across all completed courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">Total certified learning time</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
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

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Certificates</h2>
          {filteredCertificates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Award className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Complete courses to earn professional certificates
                </p>
                <Button>Browse Courses</Button>
              </CardContent>
            </Card>
          ) : (
            filteredCertificates.map((certificate) => (
              <Card
                key={certificate.id}
                className={`cursor-pointer transition-colors ${
                  selectedCertificate?.id === certificate.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCertificate(certificate)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src={certificate.courseImage || "/placeholder.svg"}
                      alt={certificate.title}
                      width={80}
                      height={60}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{certificate.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={certificate.instructorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {certificate.instructor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{certificate.instructor}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="mb-1">
                            Grade: {certificate.grade}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{certificate.score}%</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {certificate.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Completed: {certificate.completedDate}</span>
                        <span>{certificate.courseDuration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Certificate Details */}
        {selectedCertificate && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Certificate Details</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  {selectedCertificate.title}
                </CardTitle>
                <CardDescription>Professional Certificate of Completion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                  <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{selectedCertificate.title}</h3>
                  <p className="text-muted-foreground mb-4">This certifies that you have successfully completed</p>
                  <div className="space-y-2">
                    <p className="font-semibold">Grade: {selectedCertificate.grade}</p>
                    <p className="text-sm text-muted-foreground">Score: {selectedCertificate.score}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Certificate ID:</span>
                    <p className="font-medium">{selectedCertificate.certificateId}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Issue Date:</span>
                    <p className="font-medium">{selectedCertificate.issueDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Instructor:</span>
                    <p className="font-medium">{selectedCertificate.instructor}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">{selectedCertificate.courseDuration}</p>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm">Skills Demonstrated:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCertificate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Online
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Verify this certificate at:{" "}
                    <a href={selectedCertificate.credentialUrl} className="text-primary hover:underline">
                      {selectedCertificate.credentialUrl}
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
