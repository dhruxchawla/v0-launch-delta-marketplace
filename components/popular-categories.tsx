import { SimpleCard, SimpleCardContent, SimpleBadge } from "@/components/simple-icons"
import {
  ShieldIcon,
  CloudIcon,
  BugIcon,
  LockIcon,
  EyeIcon,
  ZapIcon,
  DatabaseIcon,
  WifiIcon,
} from "@/components/simple-icons"

const categories = [
  {
    icon: "Shield",
    name: "Network Security",
    courses: 45,
    description: "Firewalls, IDS/IPS, Network Monitoring",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: "Cloud",
    name: "Cloud Security",
    courses: 32,
    description: "AWS, Azure, GCP Security",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: "Bug",
    name: "Penetration Testing",
    courses: 28,
    description: "Ethical Hacking, Vulnerability Assessment",
    color: "text-red-600 bg-red-100",
  },
  {
    icon: "Lock",
    name: "Cryptography",
    courses: 24,
    description: "Encryption, PKI, Digital Signatures",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: "Eye",
    name: "Digital Forensics",
    courses: 19,
    description: "Incident Response, Evidence Analysis",
    color: "text-orange-600 bg-orange-100",
  },
  {
    icon: "Zap",
    name: "Threat Intelligence",
    courses: 22,
    description: "OSINT, Threat Hunting, IOCs",
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    icon: "Database",
    name: "Data Protection",
    courses: 16,
    description: "GDPR, Privacy, Data Loss Prevention",
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    icon: "Wifi",
    name: "Wireless Security",
    courses: 14,
    description: "WiFi, Bluetooth, Mobile Security",
    color: "text-pink-600 bg-pink-100",
  },
]

const iconMap = {
  Shield: ShieldIcon,
  Cloud: CloudIcon,
  Bug: BugIcon,
  Lock: LockIcon,
  Eye: EyeIcon,
  Zap: ZapIcon,
  Database: DatabaseIcon,
  Wifi: WifiIcon,
}

export function PopularCategories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SimpleBadge variant="secondary" className="mb-4">
            Popular Categories
          </SimpleBadge>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">Explore Cybersecurity Domains</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover specialized courses across all major cybersecurity disciplines and build expertise in your chosen
            field.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]

            return (
              <SimpleCard
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <SimpleCardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <SimpleBadge variant="outline" className="text-xs">
                      {category.courses} courses
                    </SimpleBadge>
                    <span className="text-sm font-medium text-teal-600 group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                </SimpleCardContent>
              </SimpleCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
