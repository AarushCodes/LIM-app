"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Trophy, RotateCcw, ChevronRight, CheckCircle, XCircle } from "lucide-react"

type HabitGamesProps = {
  habitId: number
  habitName: string
  ageGroup: "kids" | "teens" | "adults"
}

type Question = {
  text: string
  options: string[]
  correctAnswer: number
}

type MatchingItem = {
  term: string
  definition: string
}

export function HabitGames({ habitId, habitName, ageGroup }: HabitGamesProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<number[]>([])
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null)
  const [selectedDefinition, setSelectedDefinition] = useState<number | null>(null)
  const [showMatchResult, setShowMatchResult] = useState(false)
  const [isMatchCorrect, setIsMatchCorrect] = useState(false)
  const [incorrectAttempts, setIncorrectAttempts] = useState<{term: number, definition: number}[]>([])

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

  // Questions for each habit
  const quizQuestions: Record<number, Question[]> = {
    1: [ // Be Proactive
      {
        text: "Being proactive means...",
        options: [
          "Waiting for things to happen",
          "Taking responsibility for your choices and actions",
          "Blaming others when things go wrong",
          "Always following the rules"
        ],
        correctAnswer: 1
      },
      {
        text: "Which is a proactive statement?",
        options: [
          "I can't do this",
          "That's just the way I am",
          "Let me try a different approach",
          "It's not my fault"
        ],
        correctAnswer: 2
      },
      {
        text: "The Circle of Influence contains...",
        options: [
          "Things we worry about but can't change",
          "Things we can do something about",
          "Other people's opinions about us",
          "Past mistakes"
        ],
        correctAnswer: 1
      },
    ],
    2: [ // Begin with the End in Mind
      {
        text: "Beginning with the end in mind means...",
        options: [
          "Always focusing on the past",
          "Planning how to achieve your goals",
          "Living each day without a plan",
          "Focusing only on short-term results"
        ],
        correctAnswer: 1
      },
      {
        text: "A personal mission statement helps you...",
        options: [
          "Impress other people",
          "Make more money",
          "Define your values and purpose",
          "Know what others think of you"
        ],
        correctAnswer: 2
      },
      {
        text: "Visualization is a technique where you...",
        options: [
          "Watch lots of TV shows",
          "Mentally rehearse important events before they occur",
          "Write down everything you do",
          "Tell others about your plans"
        ],
        correctAnswer: 1
      },
    ],
    3: [ // Put First Things First
      {
        text: "Putting first things first involves...",
        options: [
          "Doing whatever is most urgent",
          "Prioritizing activities based on importance",
          "Multitasking as much as possible",
          "Working on easy tasks first"
        ],
        correctAnswer: 1
      },
      {
        text: "Which activity would be in Quadrant II (important but not urgent)?",
        options: [
          "Responding to an emergency",
          "Planning your week",
          "Watching TV",
          "Answering a ringing phone"
        ],
        correctAnswer: 1
      },
      {
        text: "The 'big rocks' metaphor teaches us to...",
        options: [
          "Collect large stones as a hobby",
          "Handle the heaviest tasks first",
          "Schedule important priorities before filling time with less important activities",
          "Break large tasks into small ones"
        ],
        correctAnswer: 2
      },
    ],
    4: [ // Think Win-Win
      {
        text: "Thinking win-win means...",
        options: [
          "Always getting your way",
          "Compromising so everyone loses a little",
          "Seeking solutions that benefit all parties",
          "Letting others win all the time"
        ],
        correctAnswer: 2
      },
      {
        text: "An abundance mentality believes that...",
        options: [
          "There's not enough for everyone",
          "There's plenty for everyone",
          "You should keep all your good ideas to yourself",
          "Competition is always better than cooperation"
        ],
        correctAnswer: 1
      },
      {
        text: "Which is a win-win approach?",
        options: [
          "Insisting on getting your way",
          "Giving in to keep the peace",
          "Creating a solution that addresses everyone's concerns",
          "Competing to be the best"
        ],
        correctAnswer: 2
      },
    ],
    5: [ // Seek First to Understand
      {
        text: "Seeking first to understand means...",
        options: [
          "Giving advice quickly",
          "Listening with the intent to respond",
          "Listening with the intent to understand",
          "Interrupting with your opinion"
        ],
        correctAnswer: 2
      },
      {
        text: "Empathic listening involves...",
        options: [
          "Waiting for your turn to speak",
          "Understanding both content and feeling",
          "Thinking about what you'll say next",
          "Agreeing with everything said"
        ],
        correctAnswer: 1
      },
      {
        text: "The principle of 'psychological air' means...",
        options: [
          "Taking deep breaths while listening",
          "Understanding others before seeking to be understood",
          "Having lots of space to yourself",
          "Speaking loudly and clearly"
        ],
        correctAnswer: 1
      },
    ],
    6: [ // Synergize
      {
        text: "Synergy means...",
        options: [
          "Working independently",
          "The whole is greater than the sum of its parts",
          "Compromising so everyone gets less",
          "Avoiding conflict"
        ],
        correctAnswer: 1
      },
      {
        text: "Valuing differences is important because...",
        options: [
          "It's polite to include everyone",
          "Differences create opportunities for creative solutions",
          "Everyone should think the same way",
          "It avoids all conflicts"
        ],
        correctAnswer: 1
      },
      {
        text: "A 'third alternative' refers to...",
        options: [
          "Having a backup plan",
          "A solution better than what individuals would propose alone",
          "The third person in a group",
          "Taking a vote on options"
        ],
        correctAnswer: 1
      },
    ],
    7: [ // Sharpen the Saw
      {
        text: "Sharpening the saw means...",
        options: [
          "Working harder all the time",
          "Taking regular breaks to avoid burnout",
          "Preserving and enhancing your greatest asset: yourself",
          "Learning woodworking skills"
        ],
        correctAnswer: 2
      },
      {
        text: "The four dimensions of renewal are...",
        options: [
          "North, South, East, West",
          "Mind, Body, Heart, Spirit",
          "Physical, Mental, Social/Emotional, Spiritual",
          "Spring, Summer, Fall, Winter"
        ],
        correctAnswer: 2
      },
      {
        text: "Physical renewal involves...",
        options: [
          "Reading books",
          "Meditation",
          "Exercise, nutrition, and rest",
          "Writing in a journal"
        ],
        correctAnswer: 2
      },
    ],
  }

  // Matching game items for each habit
  const matchingPairs: Record<number, MatchingItem[]> = {
    1: [ // Be Proactive
      { term: "Proactive Language", definition: "I can choose my response" },
      { term: "Reactive Language", definition: "There's nothing I can do" },
      { term: "Circle of Concern", definition: "Things we worry about" },
      { term: "Circle of Influence", definition: "Things we can affect" },
    ],
    2: [ // Begin with the End in Mind
      { term: "Personal Mission", definition: "What you want to be in life" },
      { term: "Visualization", definition: "Mental rehearsal of goals" },
      { term: "Roles", definition: "Different areas of responsibility" },
      { term: "Goals", definition: "Specific targets aligned with values" },
    ],
    3: [ // Put First Things First
      { term: "Quadrant I", definition: "Urgent and important" },
      { term: "Quadrant II", definition: "Important but not urgent" },
      { term: "Big Rocks", definition: "Your most important priorities" },
      { term: "Weekly Planning", definition: "Scheduling based on priorities" },
    ],
    4: [ // Think Win-Win
      { term: "Win-Win", definition: "Everyone benefits" },
      { term: "Abundance Mentality", definition: "There's plenty for all" },
      { term: "Courage", definition: "Standing up for your needs" },
      { term: "Consideration", definition: "Caring about others' needs" },
    ],
    5: [ // Seek First to Understand
      { term: "Empathic Listening", definition: "Listening with heart and ears" },
      { term: "Autobiographical Response", definition: "Filtering through your experience" },
      { term: "Ethos", definition: "Your personal credibility" },
      { term: "Psychological Air", definition: "Understanding before being understood" },
    ],
    6: [ // Synergize
      { term: "Synergy", definition: "The whole is greater than the parts" },
      { term: "Valuing Differences", definition: "Seeing diversity as strength" },
      { term: "Creative Cooperation", definition: "Working together to innovate" },
      { term: "Third Alternative", definition: "A solution better than compromise" },
    ],
    7: [ // Sharpen the Saw
      { term: "Physical Dimension", definition: "Exercise, nutrition, rest" },
      { term: "Mental Dimension", definition: "Reading, learning, writing" },
      { term: "Social/Emotional", definition: "Relationships and feelings" },
      { term: "Spiritual Dimension", definition: "Purpose, value, commitment" },
    ],
  }

  const questions = quizQuestions[habitId] || quizQuestions[1]
  const matchingItems = matchingPairs[habitId] || matchingPairs[1]
  
  // Shuffle the matching items for the game
  const [shuffledTerms, setShuffledTerms] = useState<(MatchingItem & {id: number})[]>([])
  const [shuffledDefinitions, setShuffledDefinitions] = useState<(MatchingItem & {id: number})[]>([])
  
  useEffect(() => {
    const items = matchingItems.map((item, index) => ({...item, id: index}))
    setShuffledTerms([...items].sort(() => Math.random() - 0.5))
    setShuffledDefinitions([...items].sort(() => Math.random() - 0.5))
    
    // Reset game state
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedOption(null)
    setShowResult(false)
    setGameComplete(false)
    setMatchedPairs([])
    setSelectedItem(null)
    setSelectedTerm(null)
    setSelectedDefinition(null)
    setShowMatchResult(false)
    setIncorrectAttempts([])
  }, [habitId])
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }
  
  const checkAnswer = () => {
    if (selectedOption === null) return
    
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1)
    }
    
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1)
      setSelectedOption(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedOption(null)
    setShowResult(false)
    setGameComplete(false)
  }
  
  const handleTermSelect = (id: number) => {
    if (matchedPairs.includes(id)) return
    if (showMatchResult) return
    
    setSelectedTerm(id)
    
    // If a definition is already selected, check for a match
    if (selectedDefinition !== null) {
      checkMatch(id, selectedDefinition)
    }
  }
  
  const handleDefinitionSelect = (id: number) => {
    if (matchedPairs.includes(id)) return
    if (showMatchResult) return
    
    setSelectedDefinition(id)
    
    // If a term is already selected, check for a match
    if (selectedTerm !== null) {
      checkMatch(selectedTerm, id)
    }
  }
  
  const checkMatch = (termId: number, defId: number) => {
    // Get the actual items
    const termItem = shuffledTerms.find(item => item.id === termId)
    const defItem = shuffledDefinitions.find(item => item.id === defId)
    
    setShowMatchResult(true)
    
    // Check if they match by their original ID
    const isCorrect = termItem && defItem && termItem.id === defItem.id
    setIsMatchCorrect(isCorrect)
    
    setTimeout(() => {
      if (isCorrect) {
        // If correct, add to matched pairs and increase score
        setMatchedPairs(prev => [...prev, termItem!.id])
        setScore(prev => prev + 1)
      } else {
        // Track incorrect attempts
        setIncorrectAttempts(prev => [...prev, {term: termId, definition: defId}])
      }
      
      // Reset selection state
      setSelectedTerm(null)
      setSelectedDefinition(null)
      setShowMatchResult(false)
    }, 1000)
  }
  
  const wasIncorrectAttempt = (termId: number, defId: number) => {
    return incorrectAttempts.some(attempt => 
      attempt.term === termId && attempt.definition === defId
    )
  }
  
  const resetMatching = () => {
    const items = matchingItems.map((item, index) => ({...item, id: index}))
    setShuffledTerms([...items].sort(() => Math.random() - 0.5))
    setShuffledDefinitions([...items].sort(() => Math.random() - 0.5))
    setMatchedPairs([])
    setSelectedTerm(null)
    setSelectedDefinition(null)
    setShowMatchResult(false)
    setScore(0)
    setGameComplete(false)
    setIncorrectAttempts([])
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <Gamepad2 className="h-5 w-5 mr-2" />
          Habit Games: {habitName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quiz">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="quiz">Quiz Challenge</TabsTrigger>
            <TabsTrigger value="matching">Matching Game</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quiz" className="space-y-4">
            {gameComplete ? (
              <div className={`${colors.light} p-4 rounded-md text-center`}>
                <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-2" />
                <h3 className="text-xl font-bold mb-2">Quiz Complete!</h3>
                <p className="text-gray-700 mb-4">
                  You scored {score} out of {questions.length}
                </p>
                {score === questions.length ? (
                  <p className={`${colors.text} font-bold mb-4`}>Perfect score! Great job!</p>
                ) : (
                  <p className="text-gray-600 mb-4">Try again to get all questions right!</p>
                )}
                <Button
                  onClick={resetQuiz}
                  className={`bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Play Again
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={colors.text}>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="font-bold">Score: {score}</span>
                </div>
                
                <div className={`${colors.light} p-4 rounded-md mb-4`}>
                  <h3 className="text-lg font-semibold mb-3">
                    {questions[currentQuestionIndex].text}
                  </h3>
                  <div className="space-y-2">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <div 
                        key={index}
                        onClick={() => !showResult && handleOptionSelect(index)}
                        className={`p-3 rounded-md cursor-pointer ${
                          selectedOption === index
                            ? showResult
                              ? index === questions[currentQuestionIndex].correctAnswer
                                ? 'bg-green-100 border-green-500'
                                : 'bg-red-100 border-red-500'
                              : 'bg-white border-blue-500'
                            : 'bg-white hover:bg-gray-50'
                        } border ${selectedOption === index ? 'border-2' : 'border'}`}
                      >
                        <div className="flex items-center">
                          {showResult && index === questions[currentQuestionIndex].correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          )}
                          {showResult && selectedOption === index && index !== questions[currentQuestionIndex].correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {!showResult ? (
                  <Button
                    onClick={checkAnswer}
                    disabled={selectedOption === null}
                    className={`w-full bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className={`w-full bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                  >
                    Next Question
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="matching" className="space-y-4">
            {matchedPairs.length === matchingItems.length ? (
              <div className={`${colors.light} p-4 rounded-md text-center`}>
                <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-2" />
                <h3 className="text-xl font-bold mb-2">Game Complete!</h3>
                <p className="text-gray-700 mb-4">
                  You successfully matched all pairs!
                </p>
                <Button
                  onClick={resetMatching}
                  className={`bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Play Again
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={colors.text}>
                    Match the terms with their definitions
                  </span>
                  <span className="font-bold">Matched: {matchedPairs.length}/{matchingItems.length}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${colors.text}`}>Terms</h4>
                    <div className="space-y-2">
                      {shuffledTerms.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => !matchedPairs.includes(item.id) && handleTermSelect(item.id)}
                          className={`p-3 rounded-md ${
                            matchedPairs.includes(item.id)
                              ? 'bg-green-100 border-green-500'
                              : showMatchResult && selectedTerm === item.id
                              ? isMatchCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                              : selectedTerm === item.id
                              ? 'bg-blue-100 border-blue-500'
                              : 'bg-white hover:bg-gray-50 cursor-pointer'
                          } border ${
                            (matchedPairs.includes(item.id) || selectedTerm === item.id) ? 'border-2' : 'border'
                          }`}
                        >
                          <span className={
                            matchedPairs.includes(item.id) 
                              ? 'text-green-700'
                              : showMatchResult && selectedTerm === item.id && isMatchCorrect
                              ? 'text-green-700'
                              : showMatchResult && selectedTerm === item.id && !isMatchCorrect
                              ? 'text-red-700'
                              : ''
                          }>
                            {item.term}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${colors.text}`}>Definitions</h4>
                    <div className="space-y-2">
                      {shuffledDefinitions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => !matchedPairs.includes(item.id) && handleDefinitionSelect(item.id)}
                          className={`p-3 rounded-md ${
                            matchedPairs.includes(item.id)
                              ? 'bg-green-100 border-green-500'
                              : showMatchResult && selectedDefinition === item.id
                              ? isMatchCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                              : selectedDefinition === item.id
                              ? 'bg-blue-100 border-blue-500'
                              : 'bg-white hover:bg-gray-50 cursor-pointer'
                          } border ${
                            (matchedPairs.includes(item.id) || selectedDefinition === item.id) ? 'border-2' : 'border'
                          }`}
                        >
                          <span className={
                            matchedPairs.includes(item.id) 
                              ? 'text-green-700'
                              : showMatchResult && selectedDefinition === item.id && isMatchCorrect
                              ? 'text-green-700'
                              : showMatchResult && selectedDefinition === item.id && !isMatchCorrect
                              ? 'text-red-700'
                              : ''
                          }>
                            {item.definition}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={resetMatching}
                  className={`mt-4 bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset Game
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}