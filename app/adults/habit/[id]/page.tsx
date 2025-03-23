"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Play, BookOpen, Download, Calendar, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { VideoModal } from "@/components/video-modal"
import videos from "@/lib/videos.json"
import resources from "@/lib/resources.json"

export default function HabitPage({ params }: { params: { id: string } }) {
  const habitId = Number.parseInt(params.id)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
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
  const videoData = videos.adults[habitId as keyof typeof videos.adults] || videos.adults["1"]
  const resourceLinks = resources.resources[habitId as keyof typeof resources.resources] || resources.resources["1"]

  // Content specific to each habit
  const habitContent: Record<
    number,
    {
      description: string
      quote: string
      keyPrinciples: { title: string; description: string }[]
      professionalApplications: string[]
      personalApplications: string[]
      commonChallenges: { challenge: string; solution: string }[]
      exercises: { title: string; description: string }[]
    }
  > = {
    1: {
      description:
        "Being proactive is about taking responsibility for your life. It's about recognizing that your decisions, more than your conditions, determine your destiny. Proactive people recognize that they are 'response-able' – they don't blame circumstances, conditions, or conditioning for their behavior.",
      quote:
        '"Between stimulus and response, there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom." - Viktor Frankl',
      keyPrinciples: [
        {
          title: "Circle of Concern vs. Circle of Influence",
          description:
            "Focus your energy on things you can actually do something about, rather than worrying about conditions over which you have little or no control.",
        },
        {
          title: "Proactive Language",
          description:
            "Use proactive language ('I can', 'I will', 'I prefer') rather than reactive language ('I can't', 'I have to', 'If only').",
        },
        {
          title: "Taking Initiative",
          description:
            "Don't wait for things to happen or for others to take care of problems. Recognize your responsibility to make things happen.",
        },
      ],
      professionalApplications: [
        "Taking ownership of projects and outcomes without being asked",
        "Addressing conflicts directly rather than complaining to others",
        "Anticipating problems and developing contingency plans",
        "Proposing solutions rather than just identifying problems",
      ],
      personalApplications: [
        "Taking responsibility for your health through diet and exercise",
        "Building financial security through planning and discipline",
        "Addressing relationship issues directly and constructively",
        "Creating the life you want rather than waiting for circumstances to change",
      ],
      commonChallenges: [
        {
          challenge: "Feeling victimized by circumstances",
          solution: "Identify what aspects you can control, even if it's just your response.",
        },
        {
          challenge: "Blaming others for problems",
          solution: "Ask 'What can I do differently?' rather than 'Why did they do that?'",
        },
        {
          challenge: "Procrastination and avoidance",
          solution: "Break tasks into smaller steps and commit to taking the first step.",
        },
      ],
      exercises: [
        {
          title: "30-Day Language Challenge",
          description: "Monitor your language for 30 days. Replace reactive phrases with proactive alternatives.",
        },
        {
          title: "Circle of Influence Analysis",
          description:
            "List your concerns, then identify which ones you can directly influence. Focus your energy there.",
        },
        {
          title: "Proactive Response Practice",
          description: "Identify a challenging situation and write down multiple proactive responses you could take.",
        },
      ],
    },
    2: {
      description:
        "Beginning with the end in mind means approaching any role you have in life with your values and directions clear. It's about connecting with your own uniqueness and the significant contribution that is yours to make. It's about defining the personal, moral, and ethical guidelines within which you can most happily express yourself.",
      quote:
        '"If the ladder is not leaning against the right wall, every step we take just gets us to the wrong place faster." - Stephen R. Covey',
      keyPrinciples: [
        {
          title: "Personal Mission Statement",
          description: "Create a personal mission statement that articulates your values and vision for your life.",
        },
        {
          title: "Visualization",
          description: "Mentally create and rehearse important events before they occur to align actions with values.",
        },
        {
          title: "Roles and Goals",
          description: "Identify your key roles in life and set goals for each that align with your personal mission.",
        },
      ],
      professionalApplications: [
        "Creating a clear vision for your team or organization",
        "Developing strategic plans with clear outcomes in mind",
        "Setting meaningful career goals aligned with your values",
        "Making decisions based on long-term vision rather than short-term convenience",
      ],
      personalApplications: [
        "Planning major life decisions with your values in mind",
        "Creating a family mission statement to guide parenting decisions",
        "Setting personal development goals aligned with your life purpose",
        "Making financial decisions based on long-term priorities",
      ],
      commonChallenges: [
        {
          challenge: "Lack of clarity about personal values",
          solution: "Reflect on peak experiences and what made them meaningful to identify core values.",
        },
        {
          challenge: "Getting caught up in day-to-day urgencies",
          solution: "Schedule regular time to review your mission statement and long-term goals.",
        },
        {
          challenge: "Difficulty translating vision into concrete goals",
          solution: "Use the SMART framework to create specific, measurable goals aligned with your vision.",
        },
      ],
      exercises: [
        {
          title: "Personal Mission Statement Workshop",
          description: "Create a personal mission statement that reflects your values, purpose, and vision.",
        },
        {
          title: "Roles and Goals Exercise",
          description: "Identify your key roles and create specific goals for each that align with your mission.",
        },
        {
          title: "Eulogy Exercise",
          description: "Write the eulogy you would want at your funeral. What legacy do you want to leave?",
        },
      ],
    },
    3: {
      description:
        "Putting first things first is about organizing and executing around your most important priorities. It's living and being driven by the principles you value most, not by the agendas and forces around you. It's allocating your time based on priorities rather than allowing urgency to dictate your schedule.",
      quote:
        '"The key is not to prioritize what\'s on your schedule, but to schedule your priorities." - Stephen R. Covey',
      keyPrinciples: [
        {
          title: "Time Management Matrix",
          description:
            "Categorize activities based on importance and urgency, focusing on important but not urgent activities (Quadrant II).",
        },
        {
          title: "Big Rocks First",
          description:
            "Schedule your most important priorities (big rocks) before filling time with less important activities (sand).",
        },
        {
          title: "Weekly Planning",
          description:
            "Plan weekly rather than daily to maintain perspective and ensure alignment with your roles and goals.",
        },
      ],
      professionalApplications: [
        "Prioritizing strategic work over constant firefighting",
        "Setting boundaries around your time and learning to say no",
        "Delegating tasks that others can handle to focus on your unique contribution",
        "Creating systems to handle recurring tasks efficiently",
      ],
      personalApplications: [
        "Prioritizing health and relationships over less important activities",
        "Creating family routines that reflect your values",
        "Setting boundaries around technology use to focus on what matters",
        "Scheduling time for personal development and renewal",
      ],
      commonChallenges: [
        {
          challenge: "Constant interruptions and distractions",
          solution: "Create dedicated focus time and communicate boundaries clearly.",
        },
        {
          challenge: "Difficulty saying no to requests",
          solution: "Evaluate requests against your mission and priorities before committing.",
        },
        {
          challenge: "Procrastination on important but not urgent tasks",
          solution: "Schedule specific time blocks for important activities and protect that time.",
        },
      ],
      exercises: [
        {
          title: "Time Management Matrix Analysis",
          description:
            "Track your activities for a week and categorize them in the four quadrants. Identify patterns and opportunities to shift to Quadrant II.",
        },
        {
          title: "Weekly Planning Process",
          description:
            "Implement a weekly planning routine that starts with reviewing your mission and roles before scheduling tasks.",
        },
        {
          title: "Delegation Audit",
          description:
            "Identify tasks you're currently doing that could be delegated or eliminated to focus on higher priorities.",
        },
      ],
    },
    4: {
      description:
        "Thinking win-win is a frame of mind and heart that constantly seeks mutual benefit in all human interactions. It's not about being nice, nor is it a quick-fix technique. It's a character-based approach to human interaction that seeks agreements or solutions that are mutually beneficial and satisfying.",
      quote:
        "\"Win-win is a belief in the Third Alternative. It's not your way or my way; it's a better way, a higher way.\" - Stephen R. Covey",
      keyPrinciples: [
        {
          title: "Abundance Mentality",
          description:
            "Operate from a belief that there is plenty for everyone, rather than seeing life as a zero-sum game.",
        },
        {
          title: "Balancing Courage and Consideration",
          description:
            "Seek solutions that require both the courage to express your needs and the consideration to understand others' needs.",
        },
        {
          title: "Win-Win Agreements",
          description:
            "Create explicit agreements that clarify expectations, results, resources, accountability, and consequences.",
        },
      ],
      professionalApplications: [
        "Negotiating contracts that benefit all parties",
        "Creating compensation systems that reward both individual and team performance",
        "Resolving conflicts by seeking solutions that address all parties' concerns",
        "Building partnerships based on mutual benefit rather than competition",
      ],
      personalApplications: [
        "Approaching marriage and family relationships with a win-win mindset",
        "Teaching children to resolve conflicts through mutual benefit",
        "Negotiating household responsibilities fairly",
        "Building friendships based on mutual support and growth",
      ],
      commonChallenges: [
        {
          challenge: "Competitive environments that encourage win-lose thinking",
          solution: "Demonstrate how win-win solutions create better long-term results and relationships.",
        },
        {
          challenge: "Difficulty identifying others' needs and wants",
          solution: "Practice empathic listening to understand others' perspectives before proposing solutions.",
        },
        {
          challenge: "Fear that seeking mutual benefit means compromising your needs",
          solution:
            "Distinguish between positions (what you want) and interests (why you want it) to find creative solutions.",
        },
      ],
      exercises: [
        {
          title: "Win-Win Negotiation Practice",
          description:
            "Identify a current conflict and brainstorm solutions that would meet all parties' key interests.",
        },
        {
          title: "Abundance Mentality Journal",
          description: "Record instances of scarcity thinking and reframe them from an abundance perspective.",
        },
        {
          title: "Win-Win Agreement Template",
          description:
            "Create a template for win-win agreements that clarifies expectations, results, resources, accountability, and consequences.",
        },
      ],
    },
    5: {
      description:
        "Seeking first to understand, then to be understood is the principle of empathic communication. It involves listening with the intent to understand, not with the intent to reply. It means getting inside another person's frame of reference to see the world as they see it and understand their paradigm and concerns.",
      quote:
        '"Most people do not listen with the intent to understand; they listen with the intent to reply." - Stephen R. Covey',
      keyPrinciples: [
        {
          title: "Empathic Listening",
          description:
            "Listen with your ears, eyes, and heart to understand both the content and the feeling behind communication.",
        },
        {
          title: "Psychological Air",
          description: "Give others 'psychological air' by understanding them first before seeking to be understood.",
        },
        {
          title: "Diagnose Before Prescribing",
          description:
            "Understand the problem thoroughly before attempting to provide solutions, just as a doctor diagnoses before prescribing.",
        },
      ],
      professionalApplications: [
        "Improving customer service by truly understanding customer needs",
        "Building trust with team members through empathic leadership",
        "Resolving conflicts by understanding all perspectives before seeking solutions",
        "Creating products and services that truly meet market needs",
      ],
      personalApplications: [
        "Strengthening marriage and family relationships through deeper understanding",
        "Parenting effectively by understanding children's perspectives",
        "Building meaningful friendships based on mutual understanding",
        "Resolving interpersonal conflicts through empathic communication",
      ],
      commonChallenges: [
        {
          challenge: "Tendency to prepare a response while others are speaking",
          solution: "Practice focusing completely on understanding before even thinking about your response.",
        },
        {
          challenge: "Filtering what others say through your own paradigms",
          solution: "Recognize your biases and consciously set them aside to understand others' perspectives.",
        },
        {
          challenge: "Rushing to provide solutions before understanding the problem",
          solution: "Ask clarifying questions and reflect back what you've heard before offering advice.",
        },
      ],
      exercises: [
        {
          title: "Empathic Listening Practice",
          description:
            "Have a conversation where you focus solely on understanding the other person. Reflect back what you hear before responding.",
        },
        {
          title: "Perspective-Taking Exercise",
          description:
            "For a current conflict, write a description of the situation from the other person's perspective as fairly as possible.",
        },
        {
          title: "Communication Audit",
          description:
            "Record yourself in conversations and analyze how much time you spend trying to understand versus trying to be understood.",
        },
      ],
    },
    6: {
      description:
        "Synergizing is the habit of creative cooperation. It's teamwork, open-mindedness, and finding new solutions to old problems. Synergy catalyzes, unifies, and unleashes the greatest powers within people. It's about valuing differences and bringing different perspectives together.",
      quote: '"Strength lies in differences, not in similarities." - Stephen R. Covey',
      keyPrinciples: [
        {
          title: "Value Differences",
          description:
            "See differences in perspective as opportunities for creative solutions, not as obstacles to overcome.",
        },
        {
          title: "Third Alternative",
          description: "Seek solutions that are better than what any individual would propose on their own.",
        },
        {
          title: "Creative Cooperation",
          description:
            "Work together to create something new, rather than simply compromising between existing positions.",
        },
      ],
      professionalApplications: [
        "Building diverse teams that leverage different strengths and perspectives",
        "Facilitating brainstorming sessions that generate innovative solutions",
        "Creating collaborative partnerships across departments or organizations",
        "Developing products and services through interdisciplinary approaches",
      ],
      personalApplications: [
        "Strengthening family relationships by valuing each member's unique contribution",
        "Resolving conflicts through creative solutions that meet everyone's needs",
        "Combining different parenting styles to create a balanced approach",
        "Building community through collaborative projects",
      ],
      commonChallenges: [
        {
          challenge: "Homogeneous teams or social circles that limit perspective",
          solution: "Intentionally seek out and include diverse perspectives in decision-making.",
        },
        {
          challenge: "Defensiveness when ideas are challenged",
          solution: "View different perspectives as adding to, not threatening, your understanding.",
        },
        {
          challenge: "Rushing to compromise rather than seeking synergy",
          solution: "Take time to fully understand all perspectives before seeking a solution.",
        },
      ],
      exercises: [
        {
          title: "Synergistic Problem-Solving",
          description:
            "Identify a challenge and bring together people with different perspectives to find a creative solution.",
        },
        {
          title: "Strength Mapping",
          description:
            "Map the different strengths in your team or family and identify how they can complement each other.",
        },
        {
          title: "Third Alternative Practice",
          description:
            "For a current disagreement, practice saying 'I seek a solution that's better than either of us has thought of yet.'",
        },
      ],
    },
    7: {
      description:
        "Sharpening the saw is about preserving and enhancing your greatest asset: yourself. It means having a balanced program for self-renewal in the four areas of your life: physical, social/emotional, mental, and spiritual. It's taking time to renew yourself regularly to create sustainable, long-term effectiveness.",
      quote: '"We must never become too busy sawing to take time to sharpen the saw." - Stephen R. Covey',
      keyPrinciples: [
        {
          title: "Four Dimensions of Renewal",
          description: "Maintain balance across physical, social/emotional, mental, and spiritual dimensions of life.",
        },
        {
          title: "Continuous Improvement",
          description: "Commit to ongoing growth and development in all areas of life.",
        },
        {
          title: "Sustainable Pace",
          description: "Work at a pace that can be maintained over the long term, avoiding burnout.",
        },
      ],
      professionalApplications: [
        "Creating a sustainable work-life balance",
        "Investing in ongoing professional development and learning",
        "Building resilience to handle workplace stress and challenges",
        "Developing leadership capacity through personal growth",
      ],
      personalApplications: [
        "Maintaining physical health through proper nutrition, exercise, and rest",
        "Nurturing important relationships through quality time and attention",
        "Stimulating mental growth through reading, learning, and creative activities",
        "Developing spiritual dimension through meditation, reflection, or religious practice",
      ],
      commonChallenges: [
        {
          challenge: "Feeling too busy to take time for renewal",
          solution: "Recognize that renewal increases effectiveness and actually saves time in the long run.",
        },
        {
          challenge: "Focusing on one dimension while neglecting others",
          solution: "Create a balanced renewal plan that addresses all four dimensions.",
        },
        {
          challenge: "Inconsistency in renewal practices",
          solution: "Schedule renewal activities as non-negotiable appointments with yourself.",
        },
      ],
      exercises: [
        {
          title: "Personal Renewal Assessment",
          description:
            "Evaluate your current practices in each of the four dimensions and identify areas for improvement.",
        },
        {
          title: "Weekly Renewal Planning",
          description:
            "Schedule specific activities for physical, social/emotional, mental, and spiritual renewal each week.",
        },
        {
          title: "Renewal Habits Development",
          description:
            "Identify and implement one new habit in each dimension that will contribute to your overall effectiveness.",
        },
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

        <Card className="mb-6 border-purple-200">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-indigo-600">{habit.tagline}</CardTitle>
              <Image
                src="/pro_penguin.webp?height=50&width=50"
                width={50}
                height={50}
                alt="Frosty McFlap"
                className="rounded-full border-2 border-purple-400"
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{currentHabit.description}</p>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 italic text-indigo-700 text-sm mb-4">
              {currentHabit.quote}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center">
                <span className="mr-2">Progress:</span>
                <Progress value={33} className="w-24 h-2" />
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Updated: Mar 22</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="principles" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="principles">Principles</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="principles" className="space-y-4">
            {currentHabit.keyPrinciples.map((principle, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-purple-600 mb-2">{principle.title}</h3>
                  <p className="text-gray-700">{principle.description}</p>
                </CardContent>
              </Card>
            ))}

            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Video Explanation
            </Button>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-bold text-purple-600">Professional Applications</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {currentHabit.professionalApplications.map((app, index) => (
                    <li key={index}>{app}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-bold text-purple-600">Personal Applications</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {currentHabit.personalApplications.map((app, index) => (
                    <li key={index}>{app}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <textarea
              className="w-full p-3 border border-purple-200 rounded-md min-h-[100px] text-gray-700"
              placeholder="Reflect on how you can apply this habit in your own life..."
              // value={reflections[`${habitId}-application`] || ""}
              // onChange={(e) => handleReflectionChange(0, e.target.value)}
            />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            {currentHabit.commonChallenges.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="text-md font-bold text-purple-600 mb-1">{item.challenge}</h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Solution:</span> {item.solution}
                  </p>
                </CardContent>
              </Card>
            ))}

            <textarea
              className="w-full p-3 border border-purple-200 rounded-md min-h-[100px] text-gray-700"
              placeholder="What challenges do you face with this habit? How might you overcome them?"
              // value={reflections[`${habitId}-challenges`] || ""}
              // onChange={(e) => handleReflectionChange(1, e.target.value)}
            />
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {currentHabit.exercises.map((exercise, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-md font-bold text-purple-600 mb-1">{exercise.title}</h3>
                        <p className="text-gray-700 text-sm">{exercise.description}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-purple-200 text-purple-600">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="text-md font-bold text-purple-600 mb-3">Additional Resources</h3>
              <div className="grid grid-cols-1 gap-2">
                {resourceLinks.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-purple-100"
                  >
                    <div className="flex items-center">
                      {resource.type === "Article" && <BookOpen className="h-4 w-4 text-indigo-500 mr-2" />}
                      {resource.type === "Video" && <Play className="h-4 w-4 text-indigo-500 mr-2" />}
                      {resource.type === "Download" && <Download className="h-4 w-4 text-indigo-500 mr-2" />}
                      {resource.type === "Workshop" && <Calendar className="h-4 w-4 text-indigo-500 mr-2" />}
                      <span className="text-gray-700 text-sm">{resource.title}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-indigo-600"
                      onClick={() => openResourceLink(resource.url)}
                    >
                      <span className="mr-1">{resource.type === "Download" ? "Download" : "View"}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
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
    </main>
  )
}

