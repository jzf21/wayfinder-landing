"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Navigation2, Brain, Compass, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--primary-light,#6d109f),transparent)]"></div>
          {/* <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div> */}
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8 px-4">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Navigation2 className="h-16 w-16 text-secondary animate-float" />
              <div className="absolute inset-0 animate-ping-slow opacity-50">
                {/* <Navigation2 className="h-16 w-16 text-secondary" /> */}
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r  animate-gradient  from-purple-300 to-secondary">
              AI-Powered Navigation
            </span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-secondary">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto backdrop-blur-sm">
            Navigate complex websites effortlessly with our intelligent AI assistant. 
            Get step-by-step guidance and natural language interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="group relative overflow-hidden bg-violet-400 hover:bg-primary/90 transition-colors">
                <span className="relative z-10 flex items-center">
                  Try Now <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-foreground/10 via-primary-foreground/5 to-transparent translate-x-[-100%] group-hover:animate-shimmer-fast"></div>
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="group backdrop-blur-sm">
              Learn More
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </header>

      {/* Features Section */}


      {/* Video Section */}
      <section className="py-24 px-4 bg-background relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-200">
              See It In Action
            </span>
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qAjkCsmiHnA"
              title="AI Navigation Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      <section id="features" className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"></div>
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-200">
              Key Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Navigation"
              description="Natural language processing for intuitive website exploration"
            />
            <FeatureCard
              icon={<Compass className="h-8 w-8" />}
              title="Real-time Guidance"
              description="Step-by-step instructions to help you find what you need"
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="User Feedback"
              description="Continuous improvement through user interaction and feedback"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative p-6 bg-card/50 backdrop-blur-sm rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative">
        <div className="text-purple-300 mb-4 transform transition-transform group-hover:scale-110">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}