"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Play, CheckCircle, BookOpen, BarChart, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoModal } from "@/components/video-modal"
import { CaseStudyModal } from "@/components/case-study-modal"
import videos from "@/lib/videos.json"
import resources from "@/lib/resources.json"

export default function HabitPage({ params }: { params: { id: string } }) {
  const habitId = Number.parseInt(params.id)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false)
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
  const videoData = videos.teens[habitId as keyof typeof videos.teens] || videos.teens["1"]
  const caseStudyData =
    resources.teens.caseStudies[habitId as keyof typeof resources.teens.caseStudies] || resources.teens.caseStudies["1"]
  const resourceLinks = resources.resources[habitId as keyof typeof resources.resources] || resources.resources["1"]

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
        "Being proactive means taking responsibility for your life and choices. Instead of reacting to or worrying about conditions over which you have little or no control, proactive people focus their time and energy on things they can control.",
      benefits: [
        "You take ownership of your decisions",
        "You focus on what you can change, not what you can't",
        "You choose your response to situations",
        "You're less likely to blame others or make excuses",
      ],
      examples: [
        "Studying for a test in advance instead of cramming the night before",
        "Speaking up when you see someone being bullied",
        "Taking initiative on a group project without being asked",
        "Apologizing when you make a mistake instead of making excuses",
      ],
      activities: [
        "Keep a 'Circle of Influence' journal for a week - note what you can and cannot control",
        "Practice using proactive language ('I will' instead of 'I might')",
        "Set a goal to take initiative in one area this week",
      ],
      reflection: [
        "When was a time you reacted poorly to a situation? How could you have responded differently?",
        "What areas of your life do you tend to blame others for?",
        "What's one thing you've been putting off that you could take action on today?",
      ],
    },
    2: {
      description:
        "Beginning with the end in mind means to start with a clear understanding of your destination. It means knowing where you're going so that the steps you take are always in the right direction.",
      benefits: [
        "You make better decisions aligned with your goals",
        "You waste less time on activities that don't matter",
        "You can create a personal mission statement",
        "You develop long-term thinking skills",
      ],
      examples: [
        "Creating a study schedule at the start of the semester",
        "Thinking about college requirements before choosing high school classes",
        "Considering the consequences before posting on social media",
        "Planning out steps to make the sports team",
      ],
      activities: [
        "Write a personal mission statement about what matters most to you",
        "Create a vision board for your goals",
        "Plan a project backward from the end result to the first step",
      ],
      reflection: [
        "What do you want to be remembered for by your friends and family?",
        "What are your most important goals for the next year?",
        "How do your daily activities align with your long-term goals?",
      ],
    },
    3: {
      description:
        "Putting first things first means organizing and executing around your most important priorities. It's living and being driven by the principles you value most, not by the agendas and forces around you.",
      benefits: [
        "You accomplish what matters most",
        "You reduce stress by avoiding procrastination",
        "You learn to say no to unimportant activities",
        "You develop better time management skills",
      ],
      examples: [
        "Finishing homework before checking social media",
        "Prioritizing sleep over late-night gaming",
        "Saving money for something important instead of impulse buying",
        "Making time for family and close friends",
      ],
      activities: [
        "Create a time management matrix for your activities (urgent/important grid)",
        "Plan your week ahead of time, scheduling important tasks first",
        "Practice saying no to one low-priority activity this week",
      ],
      reflection: [
        "What activities take up most of your time but don't add much value?",
        "What important tasks do you tend to procrastinate on?",
        "How could you rearrange your schedule to focus on high-priority activities?",
      ],
    },
    4: {
      description:
        "Thinking win-win means seeking mutual benefit in all human interactions. It's not about being nice, nor is it a quick-fix technique. It's a character-based approach to human interaction.",
      benefits: [
        "You build stronger relationships based on trust",
        "You find solutions that benefit everyone",
        "You avoid unnecessary competition and conflict",
        "You develop collaboration skills valued in school and work",
      ],
      examples: [
        "Studying with friends so everyone improves their grades",
        "Finding compromise when you disagree with parents on rules",
        "Dividing group project work based on each person's strengths",
        "Resolving conflicts where both sides feel heard and respected",
      ],
      activities: [
        "Practice negotiating a win-win solution to a disagreement",
        "Look for ways to help classmates succeed without sacrificing your own success",
        "Identify a situation where you can turn a competition into a collaboration",
      ],
      reflection: [
        "When have you experienced a win-win situation? How did it feel?",
        "Do you tend to compete or collaborate with others? Why?",
        "What relationships in your life could benefit from more win-win thinking?",
      ],
    },
    5: {
      description:
        "Seeking first to understand, then to be understood means listening with the intent to understand others, not with the intent to reply. It involves developing empathy and genuine understanding of others' perspectives.",
      benefits: [
        "You develop deeper, more meaningful friendships",
        "You avoid misunderstandings and conflicts",
        "You learn more from others' perspectives",
        "You become a better communicator",
      ],
      examples: [
        "Listening to a friend's problem without immediately offering advice",
        "Trying to understand why parents set certain rules",
        "Asking questions to clarify when you don't understand someone's point",
        "Considering different viewpoints in a class discussion",
      ],
      activities: [
        "Practice reflective listening in conversations (paraphrasing what others say)",
        "Have a conversation where you ask twice as many questions as statements you make",
        "Try to understand someone you usually disagree with",
      ],
      reflection: [
        "Do you listen to respond or listen to understand?",
        "When was the last time you changed your mind after truly listening to someone?",
        "Which relationships could improve if you listened more effectively?",
      ],
    },
    6: {
      description:
        "Synergizing is the habit of creative cooperation. It's teamwork, open-mindedness, and finding new solutions to old problems. Synergy is about valuing differences and building on strengths.",
      benefits: [
        "You discover creative solutions to problems",
        "You value and leverage different strengths and perspectives",
        "You accomplish more as part of a team than alone",
        "You develop leadership and collaboration skills",
      ],
      examples: [
        "Brainstorming ideas with friends for a school project",
        "Combining different talents in a band or sports team",
        "Working with classmates who have different strengths than you",
        "Finding creative compromises in family decisions",
      ],
      activities: [
        "Form a study group with classmates who have different learning styles",
        "Collaborate on a creative project with someone very different from you",
        "Practice brainstorming without judging ideas initially",
      ],
      reflection: [
        "When have you experienced the power of teamwork?",
        "What unique strengths do you bring to a group?",
        "How can you better appreciate differences in others?",
      ],
    },
    7: {
      description:
        "Sharpening the saw means preserving and enhancing your greatest asset: you. It means having a balanced program for self-renewal in the four areas of your life: physical, social/emotional, mental, and spiritual.",
      benefits: [
        "You maintain balance and prevent burnout",
        "You perform better in school and activities",
        "You develop resilience to handle stress",
        "You build a foundation for lifelong well-being",
      ],
      examples: [
        "Getting enough sleep before exams instead of all-night cramming",
        "Taking breaks from social media to protect mental health",
        "Balancing academics with physical activity and social time",
        "Making time for hobbies and activities you enjoy",
      ],
      activities: [
        "Create a self-care plan that addresses physical, mental, social, and spiritual needs",
        "Try a new stress-reduction technique (meditation, journaling, exercise)",
        "Schedule regular breaks and downtime in your weekly routine",
      ],
      reflection: [
        "Which area of your life (physical, mental, social, spiritual) needs more attention?",
        "What activities help you feel renewed and energized?",
        "How does taking care of yourself affect your ability to handle challenges?",
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

  const openResourceLink = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <main className="flex min-h-screen flex-col p-4 bg-gradient-to-b from-blue-50 to-teal-50">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/teens">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-blue-600">
            Habit {habit.id}: {habit.name}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-teal-500">{habit.tagline}</h2>
            <Image
              src="/cool_penguin.webp?height=60&width=60"
              width={60}
              height={60}
              alt="Frosty McFlap"
              className="rounded-full border-4 border-blue-400"
            />
          </div>

          <p className="text-gray-600 mb-4">{currentHabit.description}</p>

          <div className="bg-blue-100 rounded-lg p-3 mb-4 flex items-center">
            <Image
              src="/cool_bunny.webp?height=50&width=50"
              width={50}
              height={50}
              alt="Hopper"
              className="rounded-full border-2 border-blue-400 mr-3"
            />
            <p className="text-sm text-blue-700">
              "This habit can really change how you handle challenges in school and with friends!"
            </p>
          </div>
        </div>

        <Tabs defaultValue="learn" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="reflect">Reflect</TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-blue-600 mb-3">Why This Matters</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {currentHabit.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-blue-600 mb-3">Real-Life Examples</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  {currentHabit.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-20 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 shadow-md flex flex-col items-center justify-center"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="h-6 w-6 mb-1" />
                <span className="text-sm">Watch Video</span>
              </Button>
              <Button
                className="h-20 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 shadow-md flex flex-col items-center justify-center"
                onClick={() => setIsCaseStudyModalOpen(true)}
              >
                <BookOpen className="h-6 w-6 mb-1" />
                <span className="text-sm">Case Study</span>
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-blue-600 mb-3">Additional Resources</h3>
                <div className="space-y-2">
                  {resourceLinks.map((resource, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-between text-left border-blue-200 hover:border-blue-400"
                      onClick={() => openResourceLink(resource.url)}
                    >
                      <span>{resource.title}</span>
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-blue-600 mb-3">Activities to Try</h3>
                <ul className="space-y-3">
                  {currentHabit.activities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold text-teal-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 shadow-md flex flex-col items-center justify-center">
                <CheckCircle className="h-6 w-6 mb-1" />
                <span className="text-sm">Challenge</span>
              </Button>
              <Button className="h-20 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 shadow-md flex flex-col items-center justify-center">
                <BarChart className="h-6 w-6 mb-1" />
                <span className="text-sm">Track Progress</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reflect" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-blue-600 mb-3">Reflection Questions</h3>
                <ul className="space-y-4">
                  {currentHabit.reflection.map((question, index) => (
                    <li key={index} className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-800 mb-2">{question}</p>
                      <textarea
                        className="bg-white rounded border border-blue-200 p-2 w-full min-h-[60px] text-gray-700"
                        placeholder="Write your thoughts here..."
                        value={reflections[`${habitId}-${index}`] || ""}
                        onChange={(e) => handleReflectionChange(index, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-md">
              Save Reflections
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Link href={`/teens/habit/${getPreviousHabitId()}`}>
            <Button variant="outline" className="border-blue-300 text-blue-600">
              Previous Habit
            </Button>
          </Link>
          <Link href={`/teens/habit/${getNextHabitId()}`}>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-md">
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

      <CaseStudyModal
        isOpen={isCaseStudyModalOpen}
        onClose={() => setIsCaseStudyModalOpen(false)}
        title={caseStudyData.title}
        content={caseStudyData.content}
      />
    </main>
  )
}

