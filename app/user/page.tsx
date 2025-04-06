"use client"

import type React from "react"

import { useState,useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Globe, Star, ArrowRight, History, User, Save, Edit ,Droplet,Phone,FileText} from "lucide-react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { createClient } from "@supabase/supabase-js"
export default function UserProfile() {
    const [bloodGroup, setBloodGroup] = useState("A+");
  const [emergencyContact, setEmergencyContact] = useState("+1 234-567-8900");
  // Static data for sites and pages
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for metadata
type MetadataItem = {
  key: string;
  value: string;
}
  
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

  const userDataToMetadata = (data: typeof userData): MetadataItem[] => {
  return Object.entries(data).map(([key, value]) => ({
    key,
    value: String(value)
  }));
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const metadata = userDataToMetadata(userData);

    // Use upsert to insert or update the user metadata
    const { error } = await supabase
      .from('users')
      .upsert({
      id: "8bf45060-87a9-4b26-ab23-00e404b1a4a5",
      user_name: userData.name, // Keep the user_name for consistency with your fetch query
      metadata: metadata
      });

    if (error) throw error;
    
    setIsEditing(false);
    console.log('User metadata saved successfully');
  } catch (error) {
    console.error('Error saving user metadata:', error);
  }
};

useEffect(() => {
  const loadUserMetadata = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('metadata')
        .eq('id ,' , '8bf45060-87a9-4b26-ab23-00e404b1a4a5')
        .single();

      if (error) throw error;
      
      if (data?.metadata) {
        const metadataObject = data.metadata.reduce((acc: any, item: MetadataItem) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setUserData(metadataObject);
      }
    } catch (error) {
      console.error('Error loading user metadata:', error);
    }
  };

  loadUserMetadata();
}, []);
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
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // Here you would typically save the data to a backend
  //   setIsEditing(false)
  // }

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
                <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
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
        

        {/* Recently Visited Sites */}
  
      </main>

      <Footer />
    </div>
  )
}

