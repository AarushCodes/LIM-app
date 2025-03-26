"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  BarChart2,
  Trophy
} from "lucide-react"
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns"

type HabitTrackerProps = {
  habitId: number
  ageGroup: "kids" | "teens" | "adults"
}

export function HabitTracker({ habitId, ageGroup }: HabitTrackerProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [trackedDays, setTrackedDays] = useState<Date[]>([])
  const [streakCount, setStreakCount] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [completionRate, setCompletionRate] = useState(0)
  
  // Color schemes based on age group
  const colorSchemes = {
    kids: {
      primary: "from-pink-500 to-orange-400",
      hover: "hover:from-pink-600 hover:to-orange-500",
      light: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
      accent: "text-orange-500"
    },
    teens: {
      primary: "from-blue-500 to-teal-400",
      hover: "hover:from-blue-600 hover:to-teal-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600", 
      accent: "text-teal-500"
    },
    adults: {
      primary: "from-purple-500 to-indigo-400",
      hover: "hover:from-purple-600 hover:to-indigo-500",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      accent: "text-indigo-500"
    }
  }
  
  const colors = colorSchemes[ageGroup]
  
  // Load tracked days from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`habit-tracker-${ageGroup}-${habitId}`)
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Convert string dates back to Date objects
        const dates = parsedData.map((dateString: string) => new Date(dateString))
        setTrackedDays(dates)
      } catch (error) {
        console.error("Error parsing saved habit tracker data:", error)
      }
    }
  }, [habitId, ageGroup])
  
  // Calculate statistics whenever tracked days change
  useEffect(() => {
    calculateStreaks()
    calculateCompletionRate()
  }, [trackedDays])
  
  // Calculate current streak and best streak
  const calculateStreaks = () => {
    if (trackedDays.length === 0) {
      setStreakCount(0)
      setBestStreak(0)
      return
    }

    // Sort dates in ascending order
    const sortedDates = [...trackedDays].sort((a, b) => a.getTime() - b.getTime())
    
    // Calculate current streak
    let currentStreak = 0
    const today = new Date()
    const yesterday = addDays(today, -1)
    
    // Check if today or yesterday is tracked (streak is still current)
    const hasRecentActivity = sortedDates.some(date => 
      isSameDay(date, today) || isSameDay(date, yesterday)
    )
    
    if (hasRecentActivity) {
      // Count consecutive days
      let tempDate = new Date(today)
      
      // Start with today and go backwards
      while (sortedDates.some(date => isSameDay(date, tempDate))) {
        currentStreak++
        tempDate = addDays(tempDate, -1)
      }
    }
    
    // Calculate best streak
    let bestStreak = 0
    let currentBestStreak = 0
    
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        currentBestStreak = 1
      } else {
        const prevDate = addDays(sortedDates[i-1], 1)
        if (isSameDay(prevDate, sortedDates[i])) {
          currentBestStreak++
        } else {
          currentBestStreak = 1
        }
      }
      
      bestStreak = Math.max(bestStreak, currentBestStreak)
    }
    
    setStreakCount(currentStreak)
    setBestStreak(bestStreak)
  }
  
  // Calculate completion rate for the current month
  const calculateCompletionRate = () => {
    const start = startOfMonth(currentDate)
    const end = new Date() < endOfMonth(currentDate) ? new Date() : endOfMonth(currentDate)
    
    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const completedDays = trackedDays.filter(date => 
      isSameMonth(date, currentDate) && date <= end
    ).length
    
    const rate = totalDays > 0 ? (completedDays / totalDays) * 100 : 0
    setCompletionRate(Math.round(rate))
  }
  
  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })
  
  // Previous month
  const prevMonth = () => {
    const prevMonthDate = new Date(currentDate)
    prevMonthDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(prevMonthDate)
  }
  
  // Next month
  const nextMonth = () => {
    const nextMonthDate = new Date(currentDate)
    nextMonthDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(nextMonthDate)
  }
  
  // Toggle day tracking
  const toggleDay = (date: Date) => {
    const todayDate = new Date()
    
    // Only allow tracking days up to today (prevent tracking future days)
    if (date > todayDate) return
    
    const isDayTracked = trackedDays.some(trackedDate => 
      isSameDay(trackedDate, date)
    )
    
    let newTrackedDays: Date[]
    
    if (isDayTracked) {
      newTrackedDays = trackedDays.filter(trackedDate => 
        !isSameDay(trackedDate, date)
      )
    } else {
      newTrackedDays = [...trackedDays, date]
    }
    
    // Save to state and localStorage
    setTrackedDays(newTrackedDays)
    localStorage.setItem(
      `habit-tracker-${ageGroup}-${habitId}`, 
      JSON.stringify(newTrackedDays.map(d => d.toISOString()))
    )
  }
  
  // Calendar day rendering
  const renderDay = (date: Date) => {
    const isTracked = trackedDays.some(trackedDate => 
      isSameDay(trackedDate, date)
    )
    
    return (
      <Button
        key={date.toISOString()}
        variant="ghost"
        className={`
          w-8 h-8 p-0 m-0.5 
          ${isTracked ? `${colors.light} text-gray-900` : 'text-gray-500'} 
          ${isToday(date) ? `border ${colors.border}` : ''}
        `}
        disabled={date > new Date()}
        onClick={() => toggleDay(date)}
      >
        <span className="text-xs">
          {format(date, 'd')}
          {isTracked && <CheckCircle className="h-3 w-3 absolute top-0 right-0 text-green-500" />}
        </span>
      </Button>
    )
  }

  return (
    <Card className={`${colors.border} overflow-hidden`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <BarChart2 className="h-5 w-5 mr-2" />
          Habit Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className={`${colors.light} rounded-md p-2 text-center`}>
            <div className="text-xs text-gray-600">Current Streak</div>
            <div className="flex items-center justify-center mt-1">
              <CheckCircle className={`h-4 w-4 mr-1 ${colors.accent}`} />
              <span className="text-lg font-bold">{streakCount}</span>
            </div>
          </div>
          <div className={`${colors.light} rounded-md p-2 text-center`}>
            <div className="text-xs text-gray-600">Best Streak</div>
            <div className="flex items-center justify-center mt-1">
              <Trophy className={`h-4 w-4 mr-1 ${colors.accent}`} />
              <span className="text-lg font-bold">{bestStreak}</span>
            </div>
          </div>
          <div className={`${colors.light} rounded-md p-2 text-center`}>
            <div className="text-xs text-gray-600">This Month</div>
            <div className="flex items-center justify-center mt-1">
              <span className="text-lg font-bold">{completionRate}%</span>
            </div>
          </div>
        </div>
        
        {/* Month navigation */}
        <div className="flex justify-between items-center mb-2">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className={`text-sm font-medium ${colors.text}`}>
            {format(currentDate, "MMMM yyyy")}
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={nextMonth}
            disabled={isSameMonth(currentDate, new Date())}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Calendar grid */}
        <div className="text-center">
          <div className="grid grid-cols-7 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="text-xs text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7">
            {/* Fill in empty spaces for first week */}
            {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
              <div key={`empty-start-${i}`} className="w-8 h-8 m-0.5"></div>
            ))}
            
            {/* Render days */}
            {daysInMonth.map(day => renderDay(day))}
            
            {/* Fill in empty spaces for last week */}
            {Array.from({ 
              length: 6 - endOfMonth(currentDate).getDay() 
            }).map((_, i) => (
              <div key={`empty-end-${i}`} className="w-8 h-8 m-0.5"></div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center text-xs text-gray-500 mt-2">
          <div className="flex items-center mr-3">
            <div className={`w-3 h-3 ${colors.light} rounded mr-1`}></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border rounded mr-1"></div>
            <span>Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}