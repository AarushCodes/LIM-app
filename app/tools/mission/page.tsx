"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MissionStatement } from "@/components/mission-statement"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MissionPage() {
  const [ageGroup, setAgeGroup] = useState<"kids" | "teens" | "adults">("kids")
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/tools">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Mission Statement Builder</h1>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">
            Create a personal mission statement that reflects your values and guides your life decisions.
          </p>
          
          <div className="mt-4">
            <Tabs 
              defaultValue="kids" 
              value={ageGroup} 
              onValueChange={(value) => setAgeGroup(value as "kids" | "teens" | "adults")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="kids">Kids</TabsTrigger>
                <TabsTrigger value="teens">Teens</TabsTrigger>
                <TabsTrigger value="adults">Adults</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <MissionStatement ageGroup={ageGroup} />
      </div>
    </main>
  )
}
