import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Download, Share2 } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    title: "Campus Overview",
    description: "Aerial view of the beautiful Sunrise College campus",
    category: "Campus",
    image: "/modern-college-campus-aerial-view.jpg",
    date: "Dec 2024",
  },
  {
    id: 2,
    title: "Computer Science Lab",
    description: "State-of-the-art computer laboratory with latest equipment",
    category: "Facilities",
    image: "/modern-computer-science-laboratory.jpg",
    date: "Nov 2024",
  },
  {
    id: 3,
    title: "Graduation Ceremony 2024",
    description: "Proud graduates celebrating their achievements",
    category: "Events",
    image: "/college-graduation-ceremony-students-celebrating.jpg",
    date: "May 2024",
  },
  {
    id: 4,
    title: "Library Reading Hall",
    description: "Spacious library with extensive collection of books and journals",
    category: "Facilities",
    image: "/modern-college-library-reading-hall.jpg",
    date: "Oct 2024",
  },
  {
    id: 5,
    title: "Tech Fest 2024",
    description: "Students showcasing their innovative projects",
    category: "Events",
    image: "/college-tech-fest-students-with-projects.jpg",
    date: "Mar 2024",
  },
  {
    id: 6,
    title: "Sports Complex",
    description: "Modern sports facilities for various athletic activities",
    category: "Facilities",
    image: "/college-sports-complex-basketball-court.jpg",
    date: "Sep 2024",
  },
  {
    id: 7,
    title: "Cultural Performance",
    description: "Students performing traditional dance during cultural night",
    category: "Events",
    image: "/college-cultural-performance-traditional-dance.jpg",
    date: "Feb 2024",
  },
  {
    id: 8,
    title: "Engineering Workshop",
    description: "Hands-on learning in the mechanical engineering workshop",
    category: "Facilities",
    image: "/engineering-workshop-students-working-machines.jpg",
    date: "Jan 2024",
  },
  {
    id: 9,
    title: "Student Life",
    description: "Students enjoying campus life and friendships",
    category: "Campus",
    image: "/college-students-campus-life-friendship.jpg",
    date: "Aug 2024",
  },
]

const categoryColors = {
  Campus: "bg-blue-100 text-blue-800",
  Facilities: "bg-green-100 text-green-800",
  Events: "bg-purple-100 text-purple-800",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Explore our vibrant campus life, modern facilities, and memorable moments through our photo collection
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className={categoryColors[image.category as keyof typeof categoryColors]}
                    >
                      {image.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 text-gray-800 hover:bg-white">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 text-gray-800 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-balance">{image.title}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{image.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 text-pretty">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <Camera className="h-4 w-4" />
              Load More Photos
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
