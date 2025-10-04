"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    // Demo credentials: admin@sksj.edu.in / admin123
    const demoCredentials = {
      email: "admin@sksj.edu.in",
      password: "admin123",
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("adminEmail", email)
        setMessage("Login successful! Redirecting...")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000)
      } else {
        setMessage(data.message || "Login failed")
      }
    } catch (err) {
      console.log("[v0] Backend connection failed, using demo mode")
      if (email === demoCredentials.email && password === demoCredentials.password) {
        localStorage.setItem("token", "demo-token-" + Date.now())
        localStorage.setItem("adminEmail", email)
        setMessage("Login successful! (Demo Mode) Redirecting...")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000)
      } else {
        setMessage("Invalid credentials. Demo login: admin@sksj.edu.in / admin123")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin dashboard</CardDescription>
          <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
            <strong>Demo Credentials:</strong>
            <br />
            Email: admin@sksj.edu.in
            <br />
            Password: admin123
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@sksj.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            {message && (
              <Alert
                className={message.includes("successful") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
              >
                <AlertDescription className={message.includes("successful") ? "text-green-800" : "text-red-800"}>
                  {message}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
