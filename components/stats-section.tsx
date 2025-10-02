import { Badge } from "@/components/ui/badge"
import { Users, Award, TrendingUp, Globe, Shield, Zap } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Students",
    description: "Professionals learning cybersecurity",
  },
  {
    icon: Award,
    value: "200+",
    label: "Expert Courses",
    description: "Comprehensive training programs",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "Students pass certifications",
  },
  {
    icon: Globe,
    value: "150+",
    label: "Countries",
    description: "Global learning community",
  },
  {
    icon: Shield,
    value: "1M+",
    label: "Threats Analyzed",
    description: "In hands-on lab exercises",
  },
  {
    icon: Zap,
    value: "24/7",
    label: "Lab Access",
    description: "Practice anytime, anywhere",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Trusted Worldwide
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">Join the Global Cybersecurity Community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thousands of professionals trust us to advance their cybersecurity careers with practical, hands-on
            training.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold font-serif mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
