"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Globe, Star, ArrowRight, History, User, Save, Edit ,Droplet,Phone,FileText} from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

export default function UserProfile() {
    const [bloodGroup, setBloodGroup] = useState("A+");
  const [emergencyContact, setEmergencyContact] = useState("+1 234-567-8900");
  // Static data for sites and pages
  const recentSites = [
    { name: "Example.com", url: "https://example.com", visits: 25, lastVisit: "2 hours ago" },
    { name: "Test Site", url: "https://test.com", visits: 18, lastVisit: "5 hours ago" },
    { name: "Demo App", url: "https://demo.app", visits: 12, lastVisit: "1 day ago" },
  ]

  const frequentPages = [
    { name: "Dashboard", url: "/dashboard", visits: 150 },
    { name: "Settings", url: "/settings", visits: 89 },
    { name: "Profile", url: "/profile", visits: 67 },
  ]
 const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log(`Uploading ${documentType}:`, file.name);
    }
  };
  // Static user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA 12345",
  })

  // State to track if form is in edit mode
  const [isEditing, setIsEditing] = useState(false)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data to a backend
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto p-8 pt-24">
        {/* User Details Form */}
     
   <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              User Details
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => (isEditing ? handleSubmit : setIsEditing(true))}
              className="group"
            >
              {isEditing ? (
                <>
                  Save
                  <Save className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Edit
                  <Edit className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Textarea
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted h-[38px] py-2"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="mr-2">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            )}
          </form>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Droplet className="h-5 w-5 text-primary" />
            Medical Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="max-w-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <div className="flex gap-2 items-start">
                <Input
                  id="emergencyContact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="max-w-[300px]"
                />
                <Button size="icon" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Important Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label htmlFor="passport">Passport</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="passport"
                  type="file"
                  className="cursor-pointer"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'passport')}
                />
                <p className="text-sm text-muted-foreground">Supported formats: PDF, JPG, PNG</p>
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="aadhar">Aadhar Card</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="aadhar"
                  type="file"
                  className="cursor-pointer"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'aadhar')}
                />
                <p className="text-sm text-muted-foreground">Supported formats: PDF, JPG, PNG</p>
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="other">Other Documents</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="other"
                  type="file"
                  className="cursor-pointer"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'other')}
                />
                <p className="text-sm text-muted-foreground">Supported formats: PDF, JPG, PNG</p>
              </div>
            </div>
          </div>
        </Card>

        {/* User Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Total Sites</h3>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <History className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Navigation Sessions</h3>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Time Saved</h3>
                <p className="text-2xl font-bold">3.5h</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recently Visited Sites */}
        <Card className="mt-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recently Visited Sites
            </h2>
            <Button variant="outline" size="sm" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentSites.map((site, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">{site.name}</h3>
                    <p className="text-sm text-muted-foreground">{site.url}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{site.visits} visits</p>
                  <p className="text-sm text-muted-foreground">{site.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Frequently Visited Pages */}
        <Card className="mt-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Frequently Visited Pages
            </h2>
            <Button variant="outline" size="sm" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {frequentPages.map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">{page.name}</h3>
                    <p className="text-sm text-muted-foreground">{page.url}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{page.visits} visits</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

