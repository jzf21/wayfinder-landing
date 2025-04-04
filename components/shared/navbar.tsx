"use client";

import { Navigation2, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Navigation2 className="h-6 w-6 text-primary animate-pulse" />
            <span className="font-bold text-lg">Wayfinder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/user">
              <Button variant="default" className="animate-shimmer bg-violet-400 ">
                My Profile
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 bg-background border-b",
            "transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Features
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Dashboard
            </Link>
            <Link
              href="/user"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}