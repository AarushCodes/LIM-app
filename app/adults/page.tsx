import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

export default function AdultsPage() {
  const habits = [
    { id: 1, name: "Be Proactive", tagline: "You're in Charge!" },
    { id: 2, name: "Begin With the End in Mind", tagline: "Have a Plan" },
    { id: 3, name: "Put First Things First", tagline: "Work First, Then Play" },
    { id: 4, name: "Think Win-Win", tagline: "Everyone Can Win" },
    { id: 5, name: "Seek First to Understand", tagline: "Listen Before You Talk" },
    { id: 6, name: "Synergize", tagline: "Together Is Better" },
    { id: 7, name: "Sharpen the Saw", tagline: "Balance Feels Best" },
  ]

  return (
    <main className="flex min-h-screen flex-col p-4 bg-gradient-to-b from-purple-50 to-indigo-50">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/pro_penguin.webp?height=50&width=50"
              width={50}
              height={50}
              alt="Frosty McFlap"
              className="rounded-full border-4 border-purple-400"
            />
            <h1 className="text-3xl font-bold text-purple-600">Adult Section</h1>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Image
              src="/pro_penguin.webp?height=200&width=300"
              width={300}
              height={200}
              alt="Adults learning"
              className="rounded-xl shadow-md"
            />
            <div className="absolute -bottom-5 right-5">
              <Image
                src="/pro_bunny.webp?height=60&width=60"
                width={60}
                height={60}
                alt="Hopper"
                className="rounded-full border-4 border-indigo-400"
              />
            </div>
          </div>
        </div>
        
        <Card className="mb-8 border-2 border-indigo-200">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-indigo-600 mb-3">Welcome to Waddle2Wellness!</h2>
            <div className="bg-purple-100 rounded-lg p-3 mb-4 flex items-center">
              <Image
                src="/pro_penguin.webp?height=40&width=40"
                width={40}
                height={40}
                alt="Frosty McFlap"
                className="rounded-full border-2 border-purple-400 mr-3"
              />
              <p className="text-sm text-purple-700">
                "The 7 Habits offer a holistic approach to both personal and professional effectiveness."
              </p>
            </div>
            <p className="text-gray-700 mb-3">
              Stephen Covey's 7 Habits of Highly Effective People presents a principle-centered approach to both personal and professional challenges.
            </p>
            <p className="text-gray-700 mb-3">
              These habits create a progression from dependence to independence (self-mastery) and then to 
              interdependence (working with others). By mastering these habits, you can transform your approach to 
              leadership, relationships, communication, and personal growth.
            </p>
            <p className="text-gray-700">
              Each habit below contains in-depth content tailored for adults, with professional applications, 
              personal applications, and practical exercises to integrate these principles into your daily life.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Master the 7 Habits</h2>

        <div className="grid grid-cols-1 gap-4">
          {habits.map((habit) => (
            <Link key={habit.id} href={`/adults/habit/${habit.id}`}>
              <Card className="hover:shadow-lg transition-shadow border-2 border-purple-200 hover:border-purple-400">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 text-indigo-600 font-bold">
                    {habit.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-600">{habit.name}</h3>
                    <p className="text-sm text-gray-600">{habit.tagline}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

