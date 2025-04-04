"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Globe, Star, ArrowRight, History } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function UserProfile() {
  const recentSites = [
    { name: "Example.com", url: "https://example.com", visits: 25, lastVisit: "2 hours ago" },
    { name: "Test Site", url: "https://test.com", visits: 18, lastVisit: "5 hours ago" },
    { name: "Demo App", url: "https://demo.app", visits: 12, lastVisit: "1 day ago" },
  ];

  const frequentPages = [
    { name: "Dashboard", url: "/dashboard", visits: 150 },
    { name: "Settings", url: "/settings", visits: 89 },
    { name: "Profile", url: "/profile", visits: 67 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto p-8 pt-24">
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
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent/50 transition-colors">
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
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent/50 transition-colors">
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
  );
}