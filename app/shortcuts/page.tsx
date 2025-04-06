"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Star, Info, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/shared/navbar"

// Types
type Shortcut = {
  id: string
  name: string
  url: string
  logo: string
  description: string
  category: string
  instructions: string
}

export default function ShortcutsPage() {
  // Sample data - in a real app, this would come from a database
  const shortcuts: Shortcut[] = [
    {
      id: "amazon",
      name: "Amazon",
      url: "https://amazon.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Shop online for electronics, clothes, and more",
      category: "Shopping",
      instructions:
        "Browse products, add items to your cart, and check out securely. You can track your orders from your account page.",
    },
    {
      id: "walmart",
      name: "Walmart",
      url: "https://walmart.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Everyday low prices on groceries and household items",
      category: "Shopping",
      instructions: "Search for products, check store availability, or order for delivery or pickup.",
    },
    {
      id: "chase",
      name: "Chase Bank",
      url: "https://chase.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Check your account balance and pay bills",
      category: "Banking",
      instructions:
        "Log in with your username and password. Use the menu to view accounts, transfer money, or pay bills.",
    },
    {
      id: "bankofamerica",
      name: "Bank of America",
      url: "https://bankofamerica.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Manage your accounts and credit cards",
      category: "Banking",
      instructions:
        "Enter your Online ID and Passcode to access your accounts. You can view balances, transfer funds, and pay bills.",
    },
    {
      id: "nytimes",
      name: "New York Times",
      url: "https://nytimes.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Read the latest news and articles",
      category: "News",
      instructions:
        "Browse headlines on the homepage or use the sections menu to find specific topics. Click any headline to read the full article.",
    },
    {
      id: "cnn",
      name: "CNN",
      url: "https://cnn.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Breaking news and current events",
      category: "News",
      instructions:
        "Scroll through the latest headlines or use the menu to browse by topic. Videos will play automatically when clicked.",
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://facebook.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Connect with friends and family",
      category: "Social",
      instructions:
        "Log in with your email and password. Scroll through your feed to see updates from friends, or use the search bar to find specific people or groups.",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Share photos and videos with friends",
      category: "Social",
      instructions:
        "Log in to see photos from people you follow. Tap the plus icon to share your own photos or videos.",
    },
    {
      id: "gmail",
      name: "Gmail",
      url: "https://gmail.com",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Check and send emails",
      category: "Communication",
      instructions:
        "Enter your email and password to log in. Click Compose to write a new email. Click on any email in your inbox to read it.",
    },
    {
      id: "zoom",
      name: "Zoom",
      url: "https://zoom.us",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Join or host video meetings",
      category: "Communication",
      instructions:
        "Sign in or click 'Join a Meeting' to enter a meeting ID. Allow access to your camera and microphone when prompted.",
    },
  ]

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentlyVisited, setRecentlyVisited] = useState<string[]>([])
  const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(null)
  const [instructionsOpen, setInstructionsOpen] = useState(false)

  // Load favorites and recently visited from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    const storedRecent = localStorage.getItem("recentlyVisited")
    if (storedRecent) {
      setRecentlyVisited(JSON.parse(storedRecent))
    }
  }, [])

  // Save favorites and recently visited to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("recentlyVisited", JSON.stringify(recentlyVisited))
  }, [recentlyVisited])

  // Filter shortcuts based on search query
  const filteredShortcuts = shortcuts.filter(
    (shortcut) =>
      shortcut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get unique categories
  const categories = Array.from(new Set(shortcuts.map((shortcut) => shortcut.category)))

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  // Add to recently visited
  const addToRecentlyVisited = (id: string) => {
    setRecentlyVisited((prev) => {
      const filtered = prev.filter((recentId) => recentId !== id)
      return [id, ...filtered].slice(0, 5) // Keep only the 5 most recent
    })
  }

  // Show instructions
  const showInstructions = (shortcut: Shortcut) => {
    setSelectedShortcut(shortcut)
    setInstructionsOpen(true)
  }

  // Get favorite shortcuts
  const favoriteShortcuts = shortcuts.filter((shortcut) => favorites.includes(shortcut.id))

  // Get recently visited shortcuts
  const recentShortcuts = shortcuts
    .filter((shortcut) => recentlyVisited.includes(shortcut.id))
    .sort((a, b) => {
      return recentlyVisited.indexOf(a.id) - recentlyVisited.indexOf(b.id)
    })

  return (
    <div className="container mx-auto px-4 py-8">
        <Navbar />
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">My Shortcuts</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search shortcuts..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="text-lg">
            All Shortcuts
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-lg">
            Favorites
          </TabsTrigger>
          <TabsTrigger value="recent" className="text-lg">
            Recently Visited
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {searchQuery ? (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredShortcuts.map((shortcut) => (
                  <ShortcutCard
                    key={shortcut.id}
                    shortcut={shortcut}
                    isFavorite={favorites.includes(shortcut.id)}
                    onFavoriteToggle={toggleFavorite}
                    onVisit={addToRecentlyVisited}
                    onShowInstructions={showInstructions}
                  />
                ))}
              </div>
              {filteredShortcuts.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No shortcuts found matching your search.</p>
              )}
            </div>
          ) : (
            <>
              {categories.map((category) => (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {shortcuts
                      .filter((shortcut) => shortcut.category === category)
                      .map((shortcut) => (
                        <ShortcutCard
                          key={shortcut.id}
                          shortcut={shortcut}
                          isFavorite={favorites.includes(shortcut.id)}
                          onFavoriteToggle={toggleFavorite}
                          onVisit={addToRecentlyVisited}
                          onShowInstructions={showInstructions}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </TabsContent>

        <TabsContent value="favorites">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
            {favoriteShortcuts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteShortcuts.map((shortcut) => (
                  <ShortcutCard
                    key={shortcut.id}
                    shortcut={shortcut}
                    isFavorite={true}
                    onFavoriteToggle={toggleFavorite}
                    onVisit={addToRecentlyVisited}
                    onShowInstructions={showInstructions}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                You haven't added any favorites yet. Click the star icon on any shortcut to add it here.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recently Visited</h2>
            {recentShortcuts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recentShortcuts.map((shortcut) => (
                  <ShortcutCard
                    key={shortcut.id}
                    shortcut={shortcut}
                    isFavorite={favorites.includes(shortcut.id)}
                    onFavoriteToggle={toggleFavorite}
                    onVisit={addToRecentlyVisited}
                    onShowInstructions={showInstructions}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Your recently visited shortcuts will appear here.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Instructions Dialog */}
      <Dialog open={instructionsOpen} onOpenChange={setInstructionsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedShortcut && (
                <>
                  <Image
                    src={selectedShortcut.logo || "/placeholder.svg"}
                    alt={selectedShortcut.name}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  <span>How to use {selectedShortcut.name}</span>
                </>
              )}
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <DialogDescription>{selectedShortcut && selectedShortcut.instructions}</DialogDescription>
          <div className="flex justify-end">
            <Button asChild>
              <Link
                href={selectedShortcut?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => selectedShortcut && addToRecentlyVisited(selectedShortcut.id)}
              >
                Go to {selectedShortcut?.name}
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Shortcut Card Component
function ShortcutCard({
  shortcut,
  isFavorite,
  onFavoriteToggle,
  onVisit,
  onShowInstructions,
}: {
  shortcut: Shortcut
  isFavorite: boolean
  onFavoriteToggle: (id: string) => void
  onVisit: (id: string) => void
  onShowInstructions: (shortcut: Shortcut) => void
}) {
  return (
    <div className="relative flex flex-col border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <Button
        variant="ghost"
        size="icon"
        className={cn("absolute top-2 right-2 z-10", isFavorite ? "text-yellow-500" : "text-muted-foreground")}
        onClick={() => onFavoriteToggle(shortcut.id)}
      >
        <Star className={cn("h-5 w-5", isFavorite && "fill-yellow-500")} />
        <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
      </Button>

      <Link
        href={shortcut.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onVisit(shortcut.id)}
        className="flex flex-col items-center p-6 flex-grow hover:bg-muted/50 transition-colors"
      >
        <div className="w-20 h-20 mb-4 relative">
          <Image src={shortcut.logo || "/placeholder.svg"} alt={shortcut.name} fill className="object-contain" />
        </div>
        <h3 className="text-xl font-medium mb-2">{shortcut.name}</h3>
        <p className="text-muted-foreground text-center text-sm">{shortcut.description}</p>
      </Link>

      <Button
        variant="ghost"
        className="flex items-center justify-center gap-1 py-2 border-t w-full rounded-none"
        onClick={() => onShowInstructions(shortcut)}
      >
        <Info className="h-4 w-4" />
        <span>How to use</span>
      </Button>
    </div>
  )
}

