"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, BookOpen, Building } from "lucide-react"
import { useEffect, useState } from "react"

interface Announcement {
  _id: string
  title: string
  content: string
  category?: string
  urgent?: boolean
  createdAt: string
}

const categoryColors = {
  Academic: "bg-blue-100 text-blue-800",
  Event: "bg-green-100 text-green-800",
  Placement: "bg-purple-100 text-purple-800",
  Infrastructure: "bg-orange-100 text-orange-800",
}

const categoryIcons = {
  Academic: BookOpen,
  Event: Users,
  Placement: Building,
  Infrastructure: Building,
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/announcements")
        const data = await res.json()
        if (data.success) {
          setAnnouncements(data.data)
        } else {
          setError("Failed to fetch announcements")
        }
      } catch (err) {
        setError("Error connecting to server. Please try again later.")
        console.error("Error fetching announcements:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading announcements...</p>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Announcements</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Stay updated with the latest news, events, and important information from Government S.K.S.J. Technology
              Institute
            </p>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No announcements available at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((announcement) => {
                const category = announcement.category || "Academic"
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || BookOpen
                const formattedDate = new Date(announcement.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })

                return (
                  <Card
                    key={announcement._id}
                    className={`hover:shadow-lg transition-shadow ${announcement.urgent ? "ring-2 ring-red-200" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <Badge
                            variant="secondary"
                            className={
                              categoryColors[category as keyof typeof categoryColors] || categoryColors.Academic
                            }
                          >
                            {category}
                          </Badge>
                        </div>
                        {announcement.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight text-balance">{announcement.title}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formattedDate}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-pretty">{announcement.content}</CardDescription>
                      <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="bg-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Notice</h3>
                <p className="text-gray-600 text-pretty">
                  For urgent announcements and emergency notifications, please check your college email regularly.
                  Students are advised to visit the notice board daily for any last-minute updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
