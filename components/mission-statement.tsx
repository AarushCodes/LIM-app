"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollText, Save, Lightbulb, RefreshCw } from "lucide-react"

type MissionStatementProps = {
  ageGroup: "kids" | "teens" | "adults"
}

export function MissionStatement({ ageGroup }: MissionStatementProps) {
  const [statement, setStatement] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Color schemes based on age group
  const colorSchemes = {
    kids: {
      primary: "from-pink-500 to-orange-400",
      hover: "hover:from-pink-600 hover:to-orange-500",
      light: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
    },
    teens: {
      primary: "from-blue-500 to-teal-400",
      hover: "hover:from-blue-600 hover:to-teal-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
    },
    adults: {
      primary: "from-purple-500 to-indigo-400",
      hover: "hover:from-purple-600 hover:to-indigo-500",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
    }
  }
  
  const colors = colorSchemes[ageGroup]

  // Prompts to inspire mission statement writing
  const prompts = {
    kids: [
      "I want to be someone who...",
      "The most important things to me are...",
      "I want to help others by...",
      "When I grow up, I want to be...",
      "My special talents are...",
    ],
    teens: [
      "What I stand for is...",
      "The values most important to me are...",
      "I make a difference by...",
      "My goals for the future include...",
      "The person I want to become is...",
    ],
    adults: [
      "My core purpose in life is to...",
      "The principles that guide my decisions are...",
      "I contribute value by...",
      "My most important roles in life are...",
      "The legacy I want to leave is...",
    ]
  }

  useEffect(() => {
    // Load saved mission statement
    const savedStatement = localStorage.getItem(`mission-statement-${ageGroup}`)
    if (savedStatement) {
      setStatement(savedStatement)
    }
  }, [ageGroup])

  const saveStatement = () => {
    localStorage.setItem(`mission-statement-${ageGroup}`, statement)
    setIsEditing(false)
  }

  const getRandomPrompt = () => {
    const agePrompts = prompts[ageGroup]
    const randomIndex = Math.floor(Math.random() * agePrompts.length)
    return agePrompts[randomIndex]
  }

  const addPrompt = () => {
    setStatement(prev => {
      if (prev && !prev.endsWith("\n\n") && !prev.endsWith("\n")) {
        return `${prev}\n\n${getRandomPrompt()}`
      }
      return `${prev}${getRandomPrompt()}`
    })
  }

  return (
    <Card className={colors.border}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <ScrollText className="h-5 w-5 mr-2" />
          Personal Mission Statement
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Write your personal mission statement here..."
            className={`min-h-[200px] ${colors.border}`}
          />
        ) : (
          <div className={`min-h-[200px] ${colors.light} p-4 rounded-md whitespace-pre-wrap`}>
            {statement ? (
              <p className="text-gray-700">{statement}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Lightbulb className="h-10 w-10 mb-2" />
                <p>You haven't created your mission statement yet.</p>
                <p>Click edit to start writing!</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button 
              variant="outline"
              onClick={addPrompt}
              className={colors.border}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Add Prompt
            </Button>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className={colors.border}
              >
                Cancel
              </Button>
              <Button
                onClick={saveStatement}
                className={`bg-gradient-to-r ${colors.primary} ${colors.hover}`}
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className={`ml-auto bg-gradient-to-r ${colors.primary} ${colors.hover}`}
          >
            Edit Mission Statement
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}