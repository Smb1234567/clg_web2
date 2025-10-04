"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Camera, Award, Music, BookOpen, Gamepad2 } from "lucide-react"

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  category: string
  attendees: string
  featured: boolean
  createdAt: string
}

interface GalleryImage {
  _id: string
  title: string
  description: string
  category: string
  imageUrl: string
  createdAt: string
}

const categoryColors = {
  Technical: "bg-blue-100 text-blue-800",
  Academic: "bg-green-100 text-green-800",
  Sports: "bg-orange-100 text-orange-800",
  Cultural: "bg-purple-100 text-purple-800",
  Career: "bg-indigo-100 text-indigo-800",
}

const iconMap = {
  Technical: Award,
  Academic: BookOpen,
  Sports: Gamepad2,
  Cultural: Music,
  Career: Users,
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchEvents()
    fetchGalleryImages()
  }, [])

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events")
      const data = await res.json()
      if (data.success) {
        setEvents(data.data)
      } else {
        setError("Failed to load events")
      }
    } catch (err) {
      console.error("Error fetching events:", err)
      setError("Failed to load events")
    } finally {
      setLoading(false)
    }
  }

  const fetchGalleryImages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery")
      const data = await res.json()
      if (data.success) {
        setGalleryImages(data.data)
      }
    } catch (err) {
      console.error("Error fetching gallery images:", err)
    }
  }

  const handleEventRegistration = async (eventId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentName: "Guest User" }), // In real app, get from auth
      })
      const data = await res.json()
      if (data.success) {
        alert("Registration successful!")
      } else {
        alert("Registration failed. Please try again.")
      }
    } catch (err) {
      console.error("Registration error:", err)
      alert("Registration failed. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Events & Gallery</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Discover upcoming events and explore our vibrant campus life through our photo gallery
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-gray-600">Don't miss out on these exciting upcoming events</p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No upcoming events at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const IconComponent = iconMap[event.category as keyof typeof iconMap] || Award
                return (
                  <Card
                    key={event._id}
                    className={`hover:shadow-lg transition-shadow ${event.featured ? "ring-2 ring-primary/20" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <Badge
                            variant="secondary"
                            className={categoryColors[event.category as keyof typeof categoryColors]}
                          >
                            {event.category}
                          </Badge>
                        </div>
                        {event.featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight text-balance">{event.title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="mb-4 text-pretty">{event.description}</CardDescription>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees} expected attendees</span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        variant={event.featured ? "default" : "outline"}
                        onClick={() => handleEventRegistration(event._id)}
                      >
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Gallery</h2>
            <p className="text-gray-600">Explore our vibrant campus life and modern facilities</p>
          </div>

          {galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Gallery images will be displayed here.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <Card key={image._id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-600 text-pretty">{image.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <Camera className="h-4 w-4" />
              View More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
            Follow us on social media to stay updated with the latest events, announcements, and campus activities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Follow on Instagram
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              Join Facebook Group
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
