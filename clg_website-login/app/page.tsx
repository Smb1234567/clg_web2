import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Users, BookOpen, Award, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Welcome to <span className="text-primary">{"GSKSJTI"}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Excellence in Engineering Education. Empowering students with cutting-edge knowledge and practical skills
              to shape the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/departments">
                  Explore Departments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/announcements">View Announcements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">2500+</h3>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">4</h3>
              <p className="text-gray-600">Departments</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">29</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Announcements</h2>
            <p className="text-gray-600">Stay updated with the latest news and announcements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Academic</Badge>
                  <span className="text-sm text-muted-foreground">Dec 15, 2024</span>
                </div>
                <CardTitle className="text-lg">Winter Semester Registration Open</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Registration for Winter 2025 semester is now open. Students can register for courses through the
                  online portal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Event</Badge>
                  <span className="text-sm text-muted-foreground">Dec 12, 2024</span>
                </div>
                <CardTitle className="text-lg">Annual Tech Fest 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join us for our annual technology festival featuring competitions, workshops, and industry talks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Placement</Badge>
                  <span className="text-sm text-muted-foreground">Dec 10, 2024</span>
                </div>
                <CardTitle className="text-lg">Campus Placement Drive</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Major tech companies will be visiting campus for recruitment. Eligible students should register
                  immediately.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/announcements">
                View All Announcements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
