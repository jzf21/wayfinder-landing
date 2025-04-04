"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Brain, Users, Star, ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import axios from "axios";
import { set } from "date-fns";
export default function Dashboard() {
  const [command, setCommand] = useState("");
  const [steps, setSteps] = useState("");

 const convertInstructionToSteps = async () => {
    

    const {data, status} = await axios.post('http://localhost:3001/legit-sites', {
         "instruction": command
    }, {
        headers: {
            'Content-Type': 'application/json', 'Authorization': 'Bearer ' + 'allen'
        }
    });

    if (status !== 200) {
        alert(data.error);
        return;
    }
    if (data.error) {
        alert(data.error);
        return;
    }
    setSteps(data.stepsText);
    return
};

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-8 pt-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Active Users</span>
            </div>
            <p className="text-2xl font-bold">1,234</p>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Success Rate</span>
            </div>
            <p className="text-2xl font-bold">95%</p>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Commands Today</span>
            </div>
            <p className="text-2xl font-bold">5,678</p>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Avg. Response Time</span>
            </div>
            <p className="text-2xl font-bold">0.8s</p>
          </Card>
        </div>

        {/* Command Interface */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Navigation Assistant
          </h2>
          <div className="flex gap-4">
            <Input
              placeholder="Enter your navigation command..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => convertInstructionToSteps()} className="gap-2 group">
              Send
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg min-h-[500px] h-auto">
            <p className="text-muted-foreground">
              AI responses will appear here...
            </p>
            {steps && (
              <div className="mt-4">
                <h3 className="font-semibold ">Steps:</h3>
                <div className="mt-2 text-sm">{steps}</div>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Navigation Request #{i}</p>
                  <p className="text-sm text-muted-foreground">
                    Help me find the settings page
                  </p>
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