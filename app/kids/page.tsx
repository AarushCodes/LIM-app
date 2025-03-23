import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

export default function KidsPage() {
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
    <main className="flex min-h-screen flex-col p-4 bg-gradient-to-b from-pink-50 to-orange-50">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/kids_penguin.webp?height=50&width=50"
              width={50}
              height={50}
              alt="Frosty McFlap"
              className="rounded-full border-4 border-pink-400"
            />
            <h1 className="text-3xl font-bold text-pink-600">Kids Zone</h1>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Image
              src="/kids_penguin.webp?height=200&width=300"
              width={300}
              height={200}
              alt="Kids learning"
              className="rounded-xl shadow-md"
            />
            <div className="absolute -bottom-5 right-5">
              <Image
                src="/kids_bunny.webp?height=60&width=60"
                width={60}
                height={60}
                alt="Hopper"
                className="rounded-full border-4 border-orange-400"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Choose a Habit to Learn</h2>

        <div className="grid grid-cols-1 gap-4">
          {habits.map((habit) => (
            <Link key={habit.id} href={`/kids/habit/${habit.id}`}>
              <Card className="hover:shadow-lg transition-shadow border-2 border-pink-200 hover:border-pink-400">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 text-orange-600 font-bold">
                    {habit.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-pink-600">{habit.name}</h3>
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

