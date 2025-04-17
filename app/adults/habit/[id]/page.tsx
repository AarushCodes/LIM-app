"use client"
import { useState } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Play, BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoModal } from "@/components/video-modal"
import { StoryModal } from "@/components/story-modal"
import { HabitTracker } from "@/components/habit-tracker"
import { WeeklyPlanner } from "@/components/weekly-planner"
import { MissionStatement } from "@/components/mission-statement"
import { PhotoGallery } from "@/components/photo-gallery"
import videos from "@/lib/videos.json"
import resources from "@/lib/resources.json"

export default function HabitPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params)
  const habitId = Number.parseInt(resolvedParams.id)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [reflections, setReflections] = useState<Record<string, string>>({})

  const habits = [
    { id: 1, name: "Be Proactive", tagline: "Take Initiative!" },
    { id: 2, name: "Begin With the End in Mind", tagline: "Set Your Vision" },
    { id: 3, name: "Put First Things First", tagline: "Prioritize What Matters" },
    { id: 4, name: "Think Win-Win", tagline: "Mutual Benefit" },
    { id: 5, name: "Seek First to Understand", tagline: "Empathic Listening" },
    { id: 6, name: "Synergize", tagline: "Collaborate for Success" },
    { id: 7, name: "Sharpen the Saw", tagline: "Renew Yourself" },
  ]

  const habit = habits.find((h) => h.id === habitId) || habits[0]
  const videoData = videos.adults[habitId as keyof typeof videos.adults] || videos.adults["1"]
  const storyData = resources.adults.stories[habitId as keyof typeof resources.adults.stories] || resources.adults.stories["1"]

  // Adult-oriented content for each habit
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
      description: "Being proactive means taking responsibility for your actions and choices, not blaming circumstances or others. Proactive adults focus on solutions and take initiative in their personal and professional lives.",
      benefits: [
        "Greater control over outcomes",
        "Improved relationships at work and home",
        "Reduced stress from external events",
        "Increased confidence and self-efficacy",
      ],
      examples: [
        "Addressing a workplace issue directly with a colleague",
        "Starting a new healthy habit without waiting for motivation",
        "Taking charge of your finances by budgeting proactively",
        "Volunteering for a challenging project at work",
      ],
      activities: [
        "Identify an area in your life where you can be more proactive and take the first step today.",
        "Replace a reactive phrase you use with a proactive one for a week.",
        "List things you can control in a current challenge and focus your energy there.",
      ],
      reflection: [
        "When did you last take initiative to solve a problem?",
        "How do you react to unexpected challenges?",
        "What is one area where you can be more proactive this month?",
      ],
    },
    2: {
      description: "Begin with the end in mind by setting clear goals and envisioning your desired outcomes. Adults use this habit to align daily actions with long-term values and ambitions.",
      benefits: [
        "Clarity in decision-making",
        "Motivation to achieve goals",
        "Better time management",
        "Greater sense of purpose",
      ],
      examples: [
        "Creating a personal or family mission statement",
        "Setting career advancement goals and mapping a plan",
        "Visualizing a successful outcome before a big meeting",
        "Planning retirement with specific milestones",
      ],
      activities: [
        "Write down your top 3 long-term goals and the first step for each.",
        "Draft a personal mission statement.",
        "Visualize a successful outcome for an upcoming challenge.",
      ],
      reflection: [
        "What does success look like for you in 5 years?",
        "How do your daily actions align with your values?",
        "What is one goal you want to start working toward now?",
      ],
    },
    3: {
      description: "Put first things first by prioritizing important tasks over urgent distractions. Adults use this habit to manage time, reduce stress, and achieve meaningful progress.",
      benefits: [
        "Improved productivity",
        "Less stress from last-minute tasks",
        "More time for what matters most",
        "Greater work-life balance",
      ],
      examples: [
        "Blocking time for exercise before checking emails",
        "Completing a key project before attending to minor requests",
        "Scheduling family time in your calendar",
        "Saying no to non-essential meetings",
      ],
      activities: [
        "List your top priorities for the week and schedule them first.",
        "Identify and eliminate one time-wasting activity.",
        "Practice saying no to a request that doesn't align with your goals.",
      ],
      reflection: [
        "What are your biggest time-wasters?",
        "How do you ensure your priorities come first?",
        "What is one thing you can do to improve your time management?",
      ],
    },
    4: {
      description: "Think win-win by seeking solutions that benefit everyone involved. Adults use this habit to build trust, resolve conflicts, and create lasting partnerships.",
      benefits: [
        "Stronger relationships",
        "Better negotiation outcomes",
        "Increased collaboration",
        "Greater satisfaction in agreements",
      ],
      examples: [
        "Negotiating a contract that benefits both parties",
        "Finding a compromise with a partner or spouse",
        "Collaborating with colleagues for mutual success",
        "Sharing credit for a team achievement",
      ],
      activities: [
        "Identify a current conflict and brainstorm a win-win solution.",
        "Acknowledge someone else's contribution in a group project.",
        "Practice active listening in your next negotiation.",
      ],
      reflection: [
        "When did you last create a win-win outcome?",
        "How do you handle disagreements at work or home?",
        "What is one relationship that could benefit from more win-win thinking?",
      ],
    },
    5: {
      description: "Seek first to understand, then to be understood by practicing empathic listening. Adults use this habit to improve communication and resolve misunderstandings.",
      benefits: [
        "Deeper connections with others",
        "Fewer conflicts and misunderstandings",
        "Greater influence and trust",
        "Improved problem-solving",
      ],
      examples: [
        "Listening to a colleague's concerns before offering advice",
        "Asking clarifying questions in a disagreement",
        "Reflecting back what you heard in a conversation",
        "Pausing to understand your partner's feelings",
      ],
      activities: [
        "Have a conversation where you only listen and ask questions.",
        "Practice summarizing what someone said before responding.",
        "Notice your urge to interrupt and resist it.",
      ],
      reflection: [
        "How well do you listen to others?",
        "What gets in the way of understanding first?",
        "How can you improve your listening skills?",
      ],
    },
    6: {
      description: "Synergize by working collaboratively to achieve better results than you could alone. Adults use this habit to leverage diverse strengths and foster innovation.",
      benefits: [
        "More creative solutions",
        "Stronger teams",
        "Greater appreciation for diversity",
        "Enhanced productivity",
      ],
      examples: [
        "Participating in a cross-functional team at work",
        "Combining ideas with a partner to solve a problem",
        "Encouraging input from all team members",
        "Celebrating group achievements",
      ],
      activities: [
        "Work with someone different from you on a project.",
        "List the unique strengths of your team or family.",
        "Brainstorm solutions with a group and choose the best one together.",
      ],
      reflection: [
        "When did teamwork help you achieve more?",
        "How do you handle differences in a group?",
        "What can you do to foster more synergy at work or home?",
      ],
    },
    7: {
      description: "Sharpen the saw by regularly renewing your body, mind, heart, and spirit. Adults use this habit to maintain balance, prevent burnout, and sustain long-term effectiveness.",
      benefits: [
        "Increased energy and resilience",
        "Better health and well-being",
        "Greater creativity and focus",
        "Improved relationships",
      ],
      examples: [
        "Taking regular breaks during work",
        "Scheduling time for hobbies and relaxation",
        "Practicing mindfulness or meditation",
        "Spending quality time with loved ones",
      ],
      activities: [
        "Plan a self-care activity for each area: body, mind, heart, spirit.",
        "Try a new hobby or class this month.",
        "Reflect on what renews you and schedule it weekly.",
      ],
      reflection: [
        "How do you recharge after a busy week?",
        "What area of your life needs more renewal?",
        "What is one habit you can start to sharpen your saw?",
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

  const getPreviousHabitId = () => (habitId > 1 ? habitId - 1 : 7)
  const getNextHabitId = () => (habitId < 7 ? habitId + 1 : 1)

  return (
    <main className="flex min-h-screen flex-col p-4 bg-gradient-to-b from-purple-50 to-indigo-50">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/adults">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-purple-600">
            Habit {habit.id}: {habit.name}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-indigo-500">{habit.tagline}</h2>
            <Image
              src="/pro_penguin.webp?height=60&width=60"
              width={60}
              height={60}
              alt="Frosty McFlap"
              className="rounded-full border-4 border-purple-400"
            />
          </div>

          <p className="text-gray-600 mb-4">{currentHabit.description}</p>

          <div className="bg-indigo-100 rounded-lg p-3 mb-4 flex items-center">
            <Image
              src="/pro_bunny.webp?height=50&width=50"
              width={50}
              height={50}
              alt="Hopper"
              className="rounded-full border-2 border-indigo-400 mr-3"
            />
            <p className="text-sm text-indigo-700">"Here's how you can use this habit in your adult life!"</p>
          </div>
        </div>

        <Tabs defaultValue="learn" className="mb-6">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="track">Track</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="reflect">Reflect</TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-purple-600 mb-3">Why This Habit Matters</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {currentHabit.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-purple-600 mb-3">Examples</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {currentHabit.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-20 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-purple-600 hover:to-indigo-500 shadow-md flex flex-col items-center justify-center"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="h-6 w-6 mb-1" />
                <span className="text-sm">Watch Video</span>
              </Button>
              <Button
                className="h-20 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-400 hover:from-indigo-600 hover:to-purple-500 shadow-md flex flex-col items-center justify-center"
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
                <h3 className="text-lg font-bold text-purple-600 mb-3">Practice Activities</h3>
                <ul className="space-y-3">
                  {currentHabit.activities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold text-indigo-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track" className="space-y-4">
            <HabitTracker 
              habitId={habitId} 
              habitName={habit.name}
              ageGroup="adults" 
            />
            <WeeklyPlanner 
              habitId={habitId}
              ageGroup="adults"
            />
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <MissionStatement ageGroup="adults" />
            <PhotoGallery 
              habitId={habitId}
              ageGroup="adults"
            />
          </TabsContent>

          <TabsContent value="reflect" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-purple-600 mb-3">Reflect On These Questions</h3>
                <ul className="space-y-4">
                  {currentHabit.reflection.map((question, index) => (
                    <li key={index} className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-indigo-800 mb-2">{question}</p>
                      <textarea
                        className="bg-white rounded border border-indigo-200 p-2 w-full min-h-[60px] text-gray-700"
                        placeholder="Write your thoughts here..."
                        value={reflections[`${habitId}-${index}`] || ""}
                        onChange={(e) => handleReflectionChange(index, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md">
              Save My Thoughts
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Link href={`/adults/habit/${getPreviousHabitId()}`}>
            <Button variant="outline" className="border-purple-300 text-purple-600">
              Previous Habit
            </Button>
          </Link>
          <Link href={`/adults/habit/${getNextHabitId()}`}>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md">
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

