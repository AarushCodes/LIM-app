"use client"
import { useState } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Play, CheckCircle, BookOpen, BarChart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoModal } from "@/components/video-modal"
import { StoryModal } from "@/components/story-modal"
import { HabitTracker } from "@/components/habit-tracker"
import { WeeklyPlanner } from "@/components/weekly-planner"
import { MissionStatement } from "@/components/mission-statement"
import { HabitGames } from "@/components/habit-games"
import { PhotoGallery } from "@/components/photo-gallery"
import videos from "@/lib/videos.json"
import resources from "@/lib/resources.json"

export default function HabitPage({ params }: { params: { id: string } }) {
  // Simply access params directly in client components
  const resolvedParams = React.use(params)
  const habitId = Number.parseInt(resolvedParams.id)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [reflections, setReflections] = useState<Record<string, string>>({})

  const habits = [
    { id: 1, name: "Be Proactive", tagline: "You're in Charge!" },
    { id: 2, name: "Begin With the End in Mind", tagline: "Have a Plan" },
    { id: 3, name: "Put First Things First", tagline: "Work First, Then Play" },
    { id: 4, name: "Think Win-Win", tagline: "Everyone Can Win" },
    { id: 5, name: "Seek First to Understand", tagline: "Listen Before You Talk" },
    { id: 6, name: "Synergize", tagline: "Together Is Better" },
    { id: 7, name: "Sharpen the Saw", tagline: "Balance Feels Best" },
  ]

  const habit = habits.find((h) => h.id === habitId) || habits[0]
  const videoData = videos.kids[habitId as keyof typeof videos.kids] || videos.kids["1"]
  const storyData =
    resources.kids.stories[habitId as keyof typeof resources.kids.stories] || resources.kids.stories["1"]

  // Content specific to each habit
  const habitContent: Record<
    number,
    {
      description: string
      benefits: string[]
      examples: string[]
      activities: string[]
      reflection: string[]
    }
  > = {
    1: {
      description:
        "Being proactive means you're in charge of yourself! Instead of blaming others or making excuses, you can choose how to act when things happen.",
      benefits: [
        "You take charge of your choices",
        "You focus on what you can change",
        "You don't blame others",
        "You say 'I can do it!' instead of 'I can't'",
      ],
      examples: [
        "Cleaning up your toys without being asked",
        "Saying sorry when you make a mistake",
        "Doing your homework without reminders",
        "Helping a friend who is sad",
      ],
      activities: [
        "Draw a picture of a time you were proactive",
        "Practice saying 'I will' instead of 'I can't'",
        "Make a list of things you can control",
      ],
      reflection: [
        "When did you make a good choice this week?",
        "What's something hard that you can try to do?",
        "How do you feel when you take charge of your choices?",
      ],
    },
    2: {
      description:
        "Beginning with the end in mind means thinking about what you want to happen before you start! It's like planning a trip - you need to know where you're going before you start walking.",
      benefits: [
        "You know what you're trying to do",
        "You can make better choices",
        "You don't get lost or confused",
        "You feel proud when you reach your goal",
      ],
      examples: [
        "Drawing a picture before you start coloring",
        "Planning what to pack for a sleepover",
        "Thinking about what you want to be when you grow up",
        "Making a list before going to the store",
      ],
      activities: [
        "Draw a picture of what you want to be when you grow up",
        "Make a plan for your next school project",
        "Plan a fun activity with your family",
      ],
      reflection: [
        "What's something you want to do really well?",
        "What steps will help you reach your goal?",
        "How does planning ahead help you?",
      ],
    },
    3: {
      description:
        "Putting first things first means doing the important things before the fun things. It's like eating your vegetables before dessert - it might not be as fun, but it's better for you!",
      benefits: [
        "You finish important tasks on time",
        "You don't get in trouble for forgetting things",
        "You can enjoy fun activities without worry",
        "You feel proud of yourself for being responsible",
      ],
      examples: [
        "Doing homework before watching TV",
        "Making your bed before playing",
        "Helping with chores before asking for screen time",
        "Saving money for something special instead of spending it right away",
      ],
      activities: [
        "Make a chart of your daily tasks in order of importance",
        "Practice doing one important thing before a fun activity",
        "Create a special place for homework or chores",
      ],
      reflection: [
        "What important things do you sometimes forget to do?",
        "How do you feel when you finish all your work before playing?",
        "What's one thing you'll do first tomorrow?",
      ],
    },
    4: {
      description:
        "Thinking win-win means finding solutions where everyone is happy! Instead of wanting to win while others lose, you look for ways where everyone can win together.",
      benefits: [
        "You make more friends",
        "People want to play with you",
        "You solve problems peacefully",
        "Everyone feels good about the solution",
      ],
      examples: [
        "Taking turns with a favorite toy",
        "Choosing a game everyone enjoys",
        "Sharing treats equally with friends",
        "Finding a compromise when you disagree",
      ],
      activities: [
        "Practice sharing something you really like",
        "Find a solution to a problem where everyone wins",
        "Make a list of games that everyone enjoys",
      ],
      reflection: [
        "When did you find a win-win solution recently?",
        "How do you feel when everyone wins?",
        "What's a problem you could solve with win-win thinking?",
      ],
    },
    5: {
      description:
        "Seeking first to understand means listening carefully before you talk. It's like being a detective who gathers all the clues before solving the mystery!",
      benefits: [
        "You understand how others feel",
        "You make fewer mistakes",
        "People feel that you care about them",
        "You learn new things from others",
      ],
      examples: [
        "Listening to a friend's whole story before responding",
        "Asking questions when you don't understand",
        "Paying attention to how someone feels by their face and voice",
        "Trying to see things from someone else's point of view",
      ],
      activities: [
        "Practice listening without interrupting",
        "Ask questions to understand better",
        "Draw a picture showing how someone else might feel",
      ],
      reflection: [
        "When did you really listen to someone this week?",
        "How can you tell when someone isn't listening to you?",
        "Why is it important to understand before being understood?",
      ],
    },
    6: {
      description:
        "Synergizing means working together to create something better than you could alone. It's like when different musical instruments play together to make beautiful music!",
      benefits: [
        "You create better ideas together",
        "You make friends with different kinds of people",
        "You solve problems more easily",
        "You have more fun working in teams",
      ],
      examples: [
        "Building a fort together with friends",
        "Working as a team in sports",
        "Combining ideas for a school project",
        "Helping each other with different strengths",
      ],
      activities: [
        "Work with someone different from you on a project",
        "List the special talents in your family or friend group",
        "Create something with at least one other person",
      ],
      reflection: [
        "When did working with others help you do something great?",
        "What special skills do you bring to a group?",
        "How does everyone being different help a team?",
      ],
    },
    7: {
      description:
        "Sharpening the saw means taking care of yourself - your body, brain, heart, and soul. Just like a saw works better when it's sharp, you do better when you take care of yourself!",
      benefits: [
        "You have more energy",
        "You feel happier and healthier",
        "You do better in school and activities",
        "You can help others better",
      ],
      examples: [
        "Getting enough sleep every night",
        "Eating healthy foods and drinking water",
        "Reading books and learning new things",
        "Spending time with family and friends",
        "Playing outside and exercising",
      ],
      activities: [
        "Try a new healthy food or exercise",
        "Spend time doing something that makes you happy",
        "Learn something new just for fun",
      ],
      reflection: [
        "What do you do to take care of your body?",
        "What activities make you feel happy and peaceful?",
        "How do you feel when you're well-rested versus tired?",
      ],
    },
  }

  const currentHabit = habitContent[habitId] || habitContent[1]

  const handleReflectionChange = (index: number, value: string) => {
    setReflections({
      ...reflections,
      [`${habitId}-${index}`]: value,
    })
  }

  const getPreviousHabitId = () => {
    return habitId > 1 ? habitId - 1 : 7
  }

  const getNextHabitId = () => {
    return habitId < 7 ? habitId + 1 : 1
  }

  return (
    <main className="flex min-h-screen flex-col p-4 bg-gradient-to-b from-pink-50 to-orange-50">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/kids">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-pink-600">
            Habit {habit.id}: {habit.name}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-orange-500">{habit.tagline}</h2>
            <Image
              src="/kids_penguin.webp?height=60&width=60"
              width={60}
              height={60}
              alt="Frosty McFlap"
              className="rounded-full border-4 border-pink-400"
            />
          </div>

          <p className="text-gray-600 mb-4">{currentHabit.description}</p>

          <div className="bg-pink-100 rounded-lg p-3 mb-4 flex items-center">
            <Image
              src="/kids_bunny.webp?height=50&width=50"
              width={50}
              height={50}
              alt="Hopper"
              className="rounded-full border-2 border-pink-400 mr-3"
            />
            <p className="text-sm text-pink-700">"Let me show you how to use this habit in your everyday life!"</p>
          </div>
        </div>

        <Tabs defaultValue="learn" className="mb-6">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="track">Track</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="reflect">Think</TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-pink-600 mb-3">Why This Habit Matters</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {currentHabit.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-pink-600 mb-3">Examples</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {currentHabit.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-20 rounded-xl bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 shadow-md flex flex-col items-center justify-center"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="h-6 w-6 mb-1" />
                <span className="text-sm">Watch Video</span>
              </Button>
              <Button
                className="h-20 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 shadow-md flex flex-col items-center justify-center"
                onClick={() => setIsStoryModalOpen(true)}
              >
                <BookOpen className="h-6 w-6 mb-1" />
                <span className="text-sm">Story Time</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-pink-600 mb-3">Fun Activities to Try</h3>
                <ul className="space-y-3">
                  {currentHabit.activities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold text-orange-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <HabitGames 
                habitId={habitId} 
                habitName={habit.name}
                ageGroup="kids" 
              />
            </div>
          </TabsContent>

          <TabsContent value="track" className="space-y-4">
            <HabitTracker 
              habitId={habitId} 
              habitName={habit.name}
              ageGroup="kids" 
            />
            
            <WeeklyPlanner 
              habitId={habitId}
              ageGroup="kids"
            />
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <MissionStatement ageGroup="kids" />
            
            <PhotoGallery 
              habitId={habitId}
              ageGroup="kids"
            />
          </TabsContent>

          <TabsContent value="reflect" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-pink-600 mb-3">Think About These Questions</h3>
                <ul className="space-y-4">
                  {currentHabit.reflection.map((question, index) => (
                    <li key={index} className="bg-pink-50 p-3 rounded-lg">
                      <p className="text-pink-800 mb-2">{question}</p>
                      <textarea
                        className="bg-white rounded border border-pink-200 p-2 w-full min-h-[60px] text-gray-700"
                        placeholder="Write your thoughts here..."
                        value={reflections[`${habitId}-${index}`] || ""}
                        onChange={(e) => handleReflectionChange(index, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 shadow-md">
              Save My Thoughts
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Link href={`/kids/habit/${getPreviousHabitId()}`}>
            <Button variant="outline" className="border-pink-300 text-pink-600">
              Previous Habit
            </Button>
          </Link>
          <Link href={`/kids/habit/${getNextHabitId()}`}>
            <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 shadow-md">
              Next Habit
            </Button>
          </Link>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoData.url}
        videoTitle={videoData.title}
      />

      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        title={storyData.title}
        content={storyData.content}
      />
    </main>
  )
}

