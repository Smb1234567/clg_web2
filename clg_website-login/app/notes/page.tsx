"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Calendar, User, Filter, BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Note {
  _id: string
  title: string
  branch: string
  semester: number
  subjectCode: string
  fileName: string
  uploadedBy: string
  createdAt: string
  fileUrl?: string
  downloads?: number
  fileSize?: string
  type?: string
}

const branches = [
  { value: "all", label: "All Branches" },
  { value: "CSE", label: "Computer Science & Engineering" },
  { value: "ECE", label: "Electronics & Communication" },
  { value: "Civil", label: "Civil Engineering" },
  { value: "Silk & Textile", label: "Silk & Textile Engineering" },
]

const semesters = [
  { value: "all", label: "All Semesters" },
  { value: "1", label: "Semester 1" },
  { value: "2", label: "Semester 2" },
  { value: "3", label: "Semester 3" },
  { value: "4", label: "Semester 4" },
  { value: "5", label: "Semester 5" },
  { value: "6", label: "Semester 6" },
  { value: "7", label: "Semester 7" },
  { value: "8", label: "Semester 8" },
]

const typeColors = {
  "Lecture Notes": "bg-blue-100 text-blue-800",
  "Complete Notes": "bg-green-100 text-green-800",
  "Chapter Notes": "bg-yellow-100 text-yellow-800",
  "Lab Manual": "bg-purple-100 text-purple-800",
  "Reference Material": "bg-orange-100 text-orange-800",
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes")
      const data = await res.json()
      if (data.success) {
        setNotes(data.data)
      } else {
        setError("Failed to load notes")
      }
    } catch (err) {
      console.error("Error fetching notes:", err)
      setError("Failed to load notes")
    } finally {
      setLoading(false)
    }
  }

  const filteredNotes = notes.filter((note) => {
    const branchMatch = selectedBranch === "all" || note.branch === selectedBranch
    const semesterMatch = selectedSemester === "all" || note.semester.toString() === selectedSemester
    const searchMatch =
      searchQuery === "" ||
      note.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    return branchMatch && semesterMatch && searchMatch
  })

  const handleDownload = async (noteId: string, fileName: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}/download`)
      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("Failed to download file")
      }
    } catch (err) {
      console.error("Download error:", err)
      alert("Failed to download file")
    }
  }

  const getBranchName = (branch: string) => {
    const branchObj = branches.find((b) => b.value === branch)
    return branchObj ? branchObj.label : branch
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notes...</p>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Notes</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Access comprehensive study materials, lecture notes, and reference documents for all departments and
              semesters
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filter and Search:</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by subject code (e.g., BCS401) or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="min-w-[200px]">
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="min-w-[150px]">
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.value} value={semester.value}>
                          {semester.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-gray-600 flex items-center">
                  Showing {filteredNotes.length} of {notes.length} notes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <Card key={note._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <Badge
                          variant="secondary"
                          className={typeColors[note.type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}
                        >
                          {note.type || "Notes"}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Sem {note.semester}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight text-balance">{note.title}</CardTitle>
                    <CardDescription>
                      {note.subjectCode} • {getBranchName(note.branch)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{note.uploadedBy}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                        {note.downloads && (
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            <span>{note.downloads} downloads</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-gray-500">{note.fileSize || "PDF"}</span>
                        <Button size="sm" className="gap-2" onClick={() => handleDownload(note._id, note.fileName)}>
                          <Download className="h-3 w-3" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have study materials to share?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-pretty">
            Help your fellow students by uploading your notes, assignments, and study materials. All uploads are
            reviewed by faculty before being made available.
          </p>
          <Button size="lg" variant="outline" asChild>
            <a href="/admin/login">Upload Notes</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
