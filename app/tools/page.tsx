import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ScrollText } from "lucide-react"

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Wellness Tools</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          These tools will help you track progress, plan activities, and develop your personal mission statement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-blue-500 mr-3" />
                <h2 className="text-2xl font-bold">Habit & Activity Planner</h2>
              </div>
              <p className="mb-6 text-gray-600">
                Plan and track your habits, set recurring activities, and monitor your progress over time.
              </p>
              <Link href="/tools/planner">
                <Button className="w-full">Open Planner</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <ScrollText className="h-8 w-8 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold">Mission Statement</h2>
              </div>
              <p className="mb-6 text-gray-600">
                Define your personal mission statement to guide your goals and actions in alignment with your values.
              </p>
              <Link href="/tools/mission">
                <Button className="w-full">Open Mission Statement Builder</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
