import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Computer, Zap, Building2, Shirt, Users, BookOpen, Award, ArrowRight, GraduationCap } from "lucide-react"

const departments = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    description:
      "Explore the world of software development, artificial intelligence, machine learning, and cutting-edge computing technologies. Our CSE department prepares students for careers in tech giants and innovative startups.",
    icon: Computer,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    students: 800,
    faculty: 45,
    labs: 12,
    specializations: ["AI & ML", "Data Science", "Cybersecurity", "Web Development", "Mobile App Development"],
    achievements: [
      "Top placement record with 98% success rate",
      "Research publications in top-tier conferences",
      "Industry partnerships with Google, Microsoft, Amazon",
    ],
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    description:
      "Master the fundamentals of electronics, communication systems, signal processing, and embedded systems. Our ECE graduates work in telecommunications, semiconductor, and IoT industries.",
    icon: Zap,
    color: "bg-yellow-500",
    lightColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    students: 650,
    faculty: 38,
    labs: 10,
    specializations: ["VLSI Design", "Signal Processing", "Embedded Systems", "IoT", "Telecommunications"],
    achievements: [
      "State-of-the-art VLSI lab with latest tools",
      "Industry collaborations with Intel, Qualcomm",
      "Award-winning student projects in robotics",
    ],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    shortName: "Civil",
    description:
      "Build the infrastructure of tomorrow with expertise in structural engineering, environmental engineering, transportation, and sustainable construction practices.",
    icon: Building2,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-600",
    students: 550,
    faculty: 32,
    labs: 8,
    specializations: [
      "Structural Engineering",
      "Environmental Engineering",
      "Transportation",
      "Geotechnical",
      "Construction Management",
    ],
    achievements: [
      "Green building certification programs",
      "Partnerships with leading construction companies",
      "Research in sustainable construction materials",
    ],
  },
  {
    id: "textile",
    name: "Silk & Textile Engineering",
    shortName: "Textile",
    description:
      "Innovate in the textile industry with knowledge of fiber science, fabric technology, textile manufacturing, and sustainable fashion practices.",
    icon: Shirt,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
    students: 400,
    faculty: 28,
    labs: 6,
    specializations: ["Fiber Science", "Fabric Technology", "Textile Chemistry", "Fashion Design", "Quality Control"],
    achievements: [
      "Collaboration with leading fashion brands",
      "Research in eco-friendly textile materials",
      "Modern textile manufacturing lab",
    ],
  },
]

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Departments</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Discover our four specialized engineering departments, each offering world-class education and
              cutting-edge research opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {departments.map((dept) => {
              const IconComponent = dept.icon
              return (
                <Card key={dept.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardHeader className={`${dept.lightColor} border-b`}>
                    <div className="flex items-center gap-4">
                      <div className={`${dept.color} p-3 rounded-lg text-white`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{dept.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {dept.shortName}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <CardDescription className="text-base mb-6 text-pretty">{dept.description}</CardDescription>

                    {/* Department Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Users className={`h-5 w-5 ${dept.textColor}`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{dept.students}</div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <GraduationCap className={`h-5 w-5 ${dept.textColor}`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{dept.faculty}</div>
                        <div className="text-sm text-gray-600">Faculty</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <BookOpen className={`h-5 w-5 ${dept.textColor}`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{dept.labs}</div>
                        <div className="text-sm text-gray-600">Labs</div>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {dept.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${dept.color} mt-2 flex-shrink-0`} />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" size="lg">
                      Know More About {dept.shortName}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Engineering Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of successful engineers who started their careers at Sunrise College of Engineering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
