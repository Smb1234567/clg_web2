"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { Plus, LogOut, FileText, Upload, File, Calendar, ImageIcon, Trash2 } from "lucide-react"

interface Announcement {
  _id: string
  title: string
  content: string
  category?: string
  urgent?: boolean
  createdAt: string
}

interface Note {
  _id: string
  title: string
  branch: string
  semester: number
  subjectCode: string
  fileName: string
  uploadedBy: string
  createdAt: string
}

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
  uploadedBy: string
  createdAt: string
}

export default function AdminDashboard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("Academic")
  const [urgent, setUrgent] = useState(false)
  const [noteTitle, setNoteTitle] = useState("")
  const [noteBranch, setNoteBranch] = useState("CSE")
  const [noteSemester, setNoteSemester] = useState("1")
  const [subjectCode, setSubjectCode] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventVenue, setEventVenue] = useState("")
  const [eventCategory, setEventCategory] = useState("Academic")
  const [eventAttendees, setEventAttendees] = useState("")
  const [eventFeatured, setEventFeatured] = useState(false)
  const [message, setMessage] = useState("")
  const [noteMessage, setNoteMessage] = useState("")
  const [eventMessage, setEventMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [noteLoading, setNoteLoading] = useState(false)
  const [eventLoading, setEventLoading] = useState(false)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [galleryTitle, setGalleryTitle] = useState("")
  const [galleryDescription, setGalleryDescription] = useState("")
  const [galleryCategory, setGalleryCategory] = useState("Campus")
  const [selectedGalleryFile, setSelectedGalleryFile] = useState<File | null>(null)
  const [galleryMessage, setGalleryMessage] = useState("")
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    setIsDemo(token.startsWith("demo-token"))

    fetchAnnouncements()
    fetchNotes()
    fetchEvents()
    fetchGalleryImages()
  }, [router.pathname])

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/announcements")
      const data = await res.json()
      if (data.success) {
        setAnnouncements(data.data)
      } else {
        setAnnouncements([]) // 👈 Fallback to empty array
      }
    } catch (err) {
      console.error("Error fetching announcements:", err)
      setAnnouncements([]) // 👈 Fallback to empty array
    }
  }

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes")
      const data = await res.json()
      if (data.success) {
        setNotes(data.data)
      } else {
        setNotes([]) // 👈 Fallback to empty array
      }
    } catch (err) {
      console.error("Error fetching notes:", err)
      setNotes([]) // 👈 Fallback to empty array
    }
  }

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events")
      const data = await res.json()
      if (data.success) {
        setEvents(data.data)
      } else {
        setEvents([]) // 👈 Fallback to empty array
      }
    } catch (err) {
      console.error("Error fetching events:", err)
      setEvents([]) // 👈 Fallback to empty array
    }
  }

  const fetchGalleryImages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery")
      const data = await res.json()
      if (data.success) {
        setGalleryImages(data.data)
      } else {
        setGalleryImages([]) // 👈 Fallback to empty array
      }
    } catch (err) {
      console.log("[v0] Backend not available, using demo gallery data")
      setGalleryImages([
        {
          _id: "1",
          title: "Campus Overview",
          description: "Aerial view of our beautiful campus",
          category: "Campus",
          imageUrl: "/modern-college-campus-aerial-view.jpg",
          uploadedBy: "admin",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          title: "Computer Lab",
          description: "State-of-the-art computer laboratory",
          category: "Facilities",
          imageUrl: "/modern-computer-science-laboratory.jpg",
          uploadedBy: "admin",
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, category, urgent }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage("Announcement created successfully!")
        setTitle("")
        setContent("")
        setCategory("Academic")
        setUrgent(false)
        fetchAnnouncements()
      } else {
        setMessage(data.message || "Failed to create announcement")
      }
    } catch (err) {
      setMessage("Error creating announcement")
      console.error("Create announcement error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleNoteUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setNoteMessage("")
    setNoteLoading(true)

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    if (!selectedFile) {
      setNoteMessage("Please select a file to upload")
      setNoteLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("title", noteTitle)
      formData.append("branch", noteBranch)
      formData.append("semester", noteSemester)
      formData.append("subjectCode", subjectCode)

      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        setNoteMessage("Note uploaded successfully!")
        setNoteTitle("")
        setSubjectCode("")
        setSelectedFile(null)
        const fileInput = document.getElementById("noteFile") as HTMLInputElement
        if (fileInput) fileInput.value = ""
        fetchNotes()
      } else {
        setNoteMessage(data.message || "Failed to upload note")
      }
    } catch (err) {
      setNoteMessage("Error uploading note")
      console.error("Upload note error:", err)
    } finally {
      setNoteLoading(false)
    }
  }

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEventMessage("")
    setEventLoading(true)

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: eventTitle,
          description: eventDescription,
          date: eventDate,
          time: eventTime,
          venue: eventVenue,
          category: eventCategory,
          attendees: eventAttendees,
          featured: eventFeatured,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setEventMessage("Event created successfully!")
        setEventTitle("")
        setEventDescription("")
        setEventDate("")
        setEventTime("")
        setEventVenue("")
        setEventCategory("Academic")
        setEventAttendees("")
        setEventFeatured(false)
        fetchEvents()
      } else {
        setEventMessage(data.message || "Failed to create event")
      }
    } catch (err) {
      setEventMessage("Error creating event")
      console.error("Create event error:", err)
    } finally {
      setEventLoading(false)
    }
  }

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setGalleryMessage("")
    setGalleryLoading(true)

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    if (!selectedGalleryFile) {
      setGalleryMessage("Please select an image to upload")
      setGalleryLoading(false)
      return
    }

    try {
      if (isDemo) {
        const newImage: GalleryImage = {
          _id: Date.now().toString(),
          title: galleryTitle,
          description: galleryDescription,
          category: galleryCategory,
          imageUrl: URL.createObjectURL(selectedGalleryFile),
          uploadedBy: "admin",
          createdAt: new Date().toISOString(),
        }
        setGalleryImages((prev) => [newImage, ...prev])
        setGalleryMessage("Image uploaded successfully! (Demo Mode)")
      } else {
        const formData = new FormData()
        formData.append("image", selectedGalleryFile)
        formData.append("title", galleryTitle)
        formData.append("description", galleryDescription)
        formData.append("category", galleryCategory)

        const res = await fetch("http://localhost:5000/api/gallery", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

        const data = await res.json()

        if (data.success) {
          setGalleryMessage("Image uploaded successfully!")
          fetchGalleryImages()
        } else {
          setGalleryMessage(data.message || "Failed to upload image")
        }
      }

      setGalleryTitle("")
      setGalleryDescription("")
      setGalleryCategory("Campus")
      setSelectedGalleryFile(null)
      const fileInput = document.getElementById("galleryFile") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (err) {
      setGalleryMessage("Error uploading image")
      console.error("Upload image error:", err)
    } finally {
      setGalleryLoading(false)
    }
  }

  const deleteGalleryImage = async (imageId: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      if (isDemo) {
        setGalleryImages((prev) => prev.filter((img) => img._id !== imageId))
        return
      }

      const res = await fetch(`http://localhost:5000/api/gallery/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (data.success) {
        fetchGalleryImages()
      }
    } catch (err) {
      console.error("Delete image error:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              {isDemo && <p className="text-sm text-blue-600">Running in Demo Mode - Backend not connected</p>}
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Announcement
              </CardTitle>
              <CardDescription>Add a new announcement for students and faculty</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter announcement title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter announcement content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Placement">Placement</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="urgent" checked={urgent} onCheckedChange={(checked) => setUrgent(checked as boolean)} />
                  <Label htmlFor="urgent">Mark as urgent</Label>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Announcement"}
                </Button>
                {message && (
                  <Alert
                    className={
                      message.includes("successfully") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }
                  >
                    <AlertDescription className={message.includes("successfully") ? "text-green-800" : "text-red-800"}>
                      {message}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Study Notes
              </CardTitle>
              <CardDescription>Upload PDF notes for students to download</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNoteUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="noteTitle">Note Title</Label>
                  <Input
                    id="noteTitle"
                    placeholder="e.g., Data Structures - Unit 1"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjectCode">Subject Code</Label>
                  <Input
                    id="subjectCode"
                    placeholder="e.g., BCS401"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="noteBranch">Branch</Label>
                    <Select value={noteBranch} onValueChange={setNoteBranch}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="ECE">ECE</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Silk & Textile">Silk & Textile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="noteSemester">Semester</Label>
                    <Select value={noteSemester} onValueChange={setNoteSemester}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noteFile">PDF File</Label>
                  <Input
                    id="noteFile"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={noteLoading}>
                  {noteLoading ? "Uploading..." : "Upload Note"}
                </Button>
                {noteMessage && (
                  <Alert
                    className={
                      noteMessage.includes("successfully") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }
                  >
                    <AlertDescription
                      className={noteMessage.includes("successfully") ? "text-green-800" : "text-red-800"}
                    >
                      {noteMessage}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Create New Event
              </CardTitle>
              <CardDescription>Add a new event for students and faculty</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input
                    id="eventTitle"
                    placeholder="Enter event title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDescription">Description</Label>
                  <Textarea
                    id="eventDescription"
                    placeholder="Enter event description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventTime">Time</Label>
                    <Input
                      id="eventTime"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventVenue">Venue</Label>
                  <Input
                    id="eventVenue"
                    placeholder="Enter event venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventCategory">Category</Label>
                    <Select value={eventCategory} onValueChange={setEventCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Career">Career</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventAttendees">Expected Attendees</Label>
                    <Input
                      id="eventAttendees"
                      placeholder="e.g., 500+"
                      value={eventAttendees}
                      onChange={(e) => setEventAttendees(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="eventFeatured"
                    checked={eventFeatured}
                    onCheckedChange={(checked) => setEventFeatured(checked as boolean)}
                  />
                  <Label htmlFor="eventFeatured">Mark as featured event</Label>
                </div>
                <Button type="submit" className="w-full" disabled={eventLoading}>
                  {eventLoading ? "Creating..." : "Create Event"}
                </Button>
                {eventMessage && (
                  <Alert
                    className={
                      eventMessage.includes("successfully")
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }
                  >
                    <AlertDescription
                      className={eventMessage.includes("successfully") ? "text-green-800" : "text-red-800"}
                    >
                      {eventMessage}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Upload Gallery Image
              </CardTitle>
              <CardDescription>Add images to the college gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGalleryUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="galleryTitle">Image Title</Label>
                  <Input
                    id="galleryTitle"
                    placeholder="Enter image title"
                    value={galleryTitle}
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="galleryDescription">Description</Label>
                  <Textarea
                    id="galleryDescription"
                    placeholder="Enter image description"
                    value={galleryDescription}
                    onChange={(e) => setGalleryDescription(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="galleryCategory">Category</Label>
                  <Select value={galleryCategory} onValueChange={setGalleryCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Campus">Campus</SelectItem>
                      <SelectItem value="Facilities">Facilities</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Students">Students</SelectItem>
                      <SelectItem value="Faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="galleryFile">Image File</Label>
                  <Input
                    id="galleryFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedGalleryFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={galleryLoading}>
                  {galleryLoading ? "Uploading..." : "Upload Image"}
                </Button>
                {galleryMessage && (
                  <Alert
                    className={
                      galleryMessage.includes("successfully")
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }
                  >
                    <AlertDescription
                      className={galleryMessage.includes("successfully") ? "text-green-800" : "text-red-800"}
                    >
                      {galleryMessage}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Announcements
              </CardTitle>
              <CardDescription>Latest announcements from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {Array.isArray(announcements) && announcements.slice(0, 5).map((announcement) => (
                  <div key={announcement._id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm">{announcement.title}</h4>
                      {announcement.urgent && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Urgent</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{announcement.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Events
              </CardTitle>
              <CardDescription>Latest events created in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {Array.isArray(events) && events.slice(0, 5).map((event) => (
                  <div key={event._id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      {event.featured && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Featured</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>{event.venue}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{event.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <File className="h-5 w-5" />
                Recently Uploaded Notes
              </CardTitle>
              <CardDescription>Latest notes uploaded to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(notes) && notes.slice(0, 6).map((note) => (
                  <div key={note._id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">{note.title}</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>
                        <span className="font-medium">Subject:</span> {note.subjectCode}
                      </p>
                      <p>
                        <span className="font-medium">Branch:</span> {note.branch}
                      </p>
                      <p>
                        <span className="font-medium">Semester:</span> {note.semester}
                      </p>
                      <p>
                        <span className="font-medium">File:</span> {note.fileName}
                      </p>
                      <p className="text-gray-500 mt-2">{new Date(note.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Gallery Management
              </CardTitle>
              <CardDescription>Manage uploaded gallery images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.isArray(galleryImages) && galleryImages.map((image) => (
                  <div key={image._id} className="border rounded-lg overflow-hidden">
                    <img
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-1">{image.title}</h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{image.category}</span>
                        <Button size="sm" variant="destructive" onClick={() => deleteGalleryImage(image._id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
