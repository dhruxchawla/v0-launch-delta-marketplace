import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Users, ArrowRight } from "lucide-react"

const learningPaths = [
  {
    id: 1,
    title: "Cybersecurity Analyst Career Path",
    description: "Complete roadmap from beginner to certified cybersecurity analyst",
    duration: "6-8 months",
    courses: 8,
    students: 15600,
    level: "Beginner to Intermediate",
    skills: ["SOC Operations", "Incident Response", "Threat Analysis", "SIEM Tools"],
    progress: 0,
    steps: [
      { title: "Security Fundamentals", completed: false, duration: "4 weeks" },
      { title: "Network Security Basics", completed: false, duration: "3 weeks" },
      { title: "Threat Detection", completed: false, duration: "5 weeks" },
      { title: "Incident Response", completed: false, duration: "4 weeks" },
      { title: "SIEM & Log Analysis", completed: false, duration: "6 weeks" },
      { title: "Certification Prep", completed: false, duration: "3 weeks" },
    ],
  },
  {
    id: 2,
    title: "Ethical Hacker Certification Path",
    description: "Master penetration testing and ethical hacking techniques",
    duration: "8-10 months",
    courses: 12,
    students: 9800,
    level: "Intermediate to Advanced",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Web App Security", "Network Hacking"],
    progress: 0,
    steps: [
      { title: "Networking Fundamentals", completed: false, duration: "3 weeks" },
      { title: "Linux for Hackers", completed: false, duration: "4 weeks" },
      { title: "Web Application Testing", completed: false, duration: "6 weeks" },
      { title: "Network Penetration Testing", completed: false, duration: "8 weeks" },
      { title: "Advanced Exploitation", completed: false, duration: "6 weeks" },
      { title: "CEH Certification Prep", completed: false, duration: "4 weeks" },
    ],
  },
  {
    id: 3,
    title: "Cloud Security Specialist Path",
    description: "Become an expert in securing cloud infrastructure and services",
    duration: "5-7 months",
    courses: 10,
    students: 7200,
    level: "Intermediate to Advanced",
    skills: ["AWS Security", "Azure Security", "Cloud Compliance", "Container Security"],
    progress: 0,
    steps: [
      { title: "Cloud Fundamentals", completed: false, duration: "3 weeks" },
      { title: "AWS Security Services", completed: false, duration: "5 weeks" },
      { title: "Azure Security Center", completed: false, duration: "4 weeks" },
      { title: "Container Security", completed: false, duration: "4 weeks" },
      { title: "Cloud Compliance", completed: false, duration: "3 weeks" },
      { title: "CCSP Certification Prep", completed: false, duration: "4 weeks" },
    ],
  },
]

export function LearningPaths() {
  return (
    <section id="paths" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Learning Paths
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">Structured Career Roadmaps</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow our expertly designed learning paths to master cybersecurity skills and advance your career with
            confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {learningPaths.map((path) => (
            <Card key={path.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline">{path.level}</Badge>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {path.students.toLocaleString()}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{path.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{path.duration}</span>
                  </div>
                  <div>
                    <span className="font-medium">{path.courses}</span> courses
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>

                <div>
                  <h4 className="font-medium mb-3">Learning Steps</h4>
                  <div className="space-y-2">
                    {path.steps.slice(0, 4).map((step, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <CheckCircle
                          className={`h-4 w-4 ${step.completed ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span className={step.completed ? "line-through text-muted-foreground" : ""}>{step.title}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{step.duration}</span>
                      </div>
                    ))}
                    {path.steps.length > 4 && (
                      <div className="text-xs text-muted-foreground pl-7">+{path.steps.length - 4} more steps</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Start Learning Path
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
