import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Building, Car, Bus } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: [
      "Government S.K.S.J. Technology Institute",
      "30/A, Nrupathunga Rd, Ambedkar Veedhi",
      "Sampangi Rama Nagar, Bengaluru, Karnataka 560001, India",
    ],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["Main Office: +91 80 2234 5678", "Admissions: +91 80 2234 5679", "Placement Cell: +91 80 2234 5680"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["General: info@sksj.ac.in", "Admissions: admissions@sksj.ac.in", "Placements: placements@sksj.ac.in"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM", "Sunday: Closed"],
  },
]

const departments = [
  {
    name: "Admissions Office",
    phone: "+91 80 2234 5679",
    email: "admissions@sksj.ac.in",
    location: "Ground Floor, Admin Block",
  },
  {
    name: "Academic Office",
    phone: "+91 80 2234 5681",
    email: "academics@sksj.ac.in",
    location: "First Floor, Admin Block",
  },
  {
    name: "Placement Cell",
    phone: "+91 80 2234 5680",
    email: "placements@sksj.ac.in",
    location: "Second Floor, Admin Block",
  },
  {
    name: "Student Affairs",
    phone: "+91 80 2234 5682",
    email: "students@sksj.ac.in",
    location: "Ground Floor, Student Center",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Get in touch with us for admissions, inquiries, or any assistance you need
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Campus Location
              </CardTitle>
              <CardDescription>Find us on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">
                    Government S.K.S.J. Technology Institute
                    <br />
                    30/A, Nrupathunga Rd, Sampangi Rama Nagar
                    <br />
                    Bengaluru, Karnataka 560001
                  </p>
                </div>
              </div>

              {/* Transportation Info */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">How to Reach</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Car className="h-4 w-4" />
                  <span>10 minutes from Majestic Railway Station</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Bus className="h-4 w-4" />
                  <span>Bus routes: 201, 226, 298 (Sampangi Rama Nagar Stop)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Department Contacts
              </CardTitle>
              <CardDescription>Direct contact information for specific departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                    <h4 className="font-medium text-gray-900">{dept.name}</h4>
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{dept.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span>{dept.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{dept.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="mt-8 bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Emergency Contact</CardTitle>
            <CardDescription className="text-red-600">For urgent matters and emergencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-red-800 mb-2">24/7 Emergency Helpline</h4>
                <div className="flex items-center gap-2 text-red-700">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">+91 80 2234 5688</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-red-800 mb-2">Security Office</h4>
                <div className="flex items-center gap-2 text-red-700">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">+91 80 2234 5687</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-pretty">
            Our team is here to help you with any questions about admissions, academics, or campus life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/feedback">Send Feedback</a>
            </Button>
            <Button variant="outline" size="lg">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
