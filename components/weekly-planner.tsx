"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  Plus, 
  Clock, 
  Trash2, 
  Save, 
  Edit, 
  CheckCircle,
  CalendarDays
} from "lucide-react"
import { format, startOfWeek, addDays } from "date-fns"

type WeeklyPlannerProps = {
  habitId: number
  ageGroup: "kids" | "teens" | "adults"
}

type PlannerItem = {
  id: string
  day: string
  time: string
  activity: string
  completed: boolean
}

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function WeeklyPlanner({ habitId, ageGroup }: WeeklyPlannerProps) {
  const [plannerItems, setPlannerItems] = useState<PlannerItem[]>([])
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [newItemDay, setNewItemDay] = useState(DAYS_OF_WEEK[0])
  const [newItemTime, setNewItemTime] = useState("08:00")
  const [newItemActivity, setNewItemActivity] = useState("")
  const [addingNew, setAddingNew] = useState(false)

  // Color schemes based on age group
  const colorSchemes = {
    kids: {
      primary: "from-pink-500 to-orange-400",
      hover: "hover:from-pink-600 hover:to-orange-500",
      light: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
      accent: "text-pink-500"
    },
    teens: {
      primary: "from-blue-500 to-teal-400",
      hover: "hover:from-blue-600 hover:to-teal-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      accent: "text-blue-500"
    },
    adults: {
      primary: "from-purple-500 to-indigo-400",
      hover: "hover:from-purple-600 hover:to-indigo-500",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      accent: "text-purple-500"
    }
  }
  
  const colors = colorSchemes[ageGroup]
  
  // Load planner data from local storage
  useEffect(() => {
    const savedItems = localStorage.getItem(`weekly-planner-${ageGroup}-${habitId}`)
    
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems)
        setPlannerItems(parsedItems)
      } catch (error) {
        console.error("Error parsing saved planner items:", error)
        generateSampleItems()
      }
    } else {
      // Generate sample items for demo purposes
      generateSampleItems()
    }
  }, [habitId, ageGroup])
  
  // Generate sample planner items
  const generateSampleItems = () => {
    const itemsByAgeGroup = {
      kids: [
        { day: "Monday", time: "15:30", activity: "Practice being proactive by cleaning my room without being asked" },
        { day: "Wednesday", time: "16:00", activity: "Make a goal chart for the week" },
        { day: "Saturday", time: "10:00", activity: "Family activity: practice listening to each other" }
      ],
      teens: [
        { day: "Monday", time: "16:00", activity: "Study session with focus on most important subjects first" },
        { day: "Thursday", time: "17:30", activity: "Practice active listening with a friend" },
        { day: "Saturday", time: "09:00", activity: "Work on personal mission statement" }
      ],
      adults: [
        { day: "Monday", time: "07:30", activity: "Morning planning session for the week" },
        { day: "Wednesday", time: "12:00", activity: "Lunch meeting focusing on win-win solutions" },
        { day: "Friday", time: "17:00", activity: "Review weekly accomplishments and plan for improvement" }
      ]
    }
    
    const sampleItems = (itemsByAgeGroup[ageGroup] || []).map((item, index) => ({
      id: `sample-${index}`,
      day: item.day,
      time: item.time,
      activity: item.activity,
      completed: false
    }))
    
    setPlannerItems(sampleItems)
    localStorage.setItem(`weekly-planner-${ageGroup}-${habitId}`, JSON.stringify(sampleItems))
  }
  
  // Save planner items to local storage
  const savePlannerItems = (items: PlannerItem[]) => {
    localStorage.setItem(`weekly-planner-${ageGroup}-${habitId}`, JSON.stringify(items))
  }
  
  // Add new planner item
  const addNewItem = () => {
    if (!newItemActivity.trim()) return
    
    const newItem: PlannerItem = {
      id: `item-${Date.now()}`,
      day: newItemDay,
      time: newItemTime,
      activity: newItemActivity,
      completed: false
    }
    
    const updatedItems = [...plannerItems, newItem]
    setPlannerItems(updatedItems)
    savePlannerItems(updatedItems)
    
    // Reset form
    setNewItemDay(DAYS_OF_WEEK[0])
    setNewItemTime("08:00")
    setNewItemActivity("")
    setAddingNew(false)
  }
  
  // Delete planner item
  const deleteItem = (id: string) => {
    const updatedItems = plannerItems.filter(item => item.id !== id)
    setPlannerItems(updatedItems)
    savePlannerItems(updatedItems)
    
    if (editingItemId === id) {
      setEditingItemId(null)
    }
  }
  
  // Toggle completion status
  const toggleCompleted = (id: string) => {
    const updatedItems = plannerItems.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }
      }
      return item
    })
    
    setPlannerItems(updatedItems)
    savePlannerItems(updatedItems)
  }
  
  // Update item
  const updateItem = (id: string, updatedValues: Partial<PlannerItem>) => {
    const updatedItems = plannerItems.map(item => {
      if (item.id === id) {
        return { ...item, ...updatedValues }
      }
      return item
    })
    
    setPlannerItems(updatedItems)
    savePlannerItems(updatedItems)
    setEditingItemId(null)
  }
  
  // Group items by day
  const itemsByDay = DAYS_OF_WEEK.map(day => {
    return {
      day,
      items: plannerItems
        .filter(item => item.day === day)
        .sort((a, b) => a.time.localeCompare(b.time))
    }
  })

  return (
    <Card className={`${colors.border}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          Weekly Habit Planner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current week indicator */}
          <div className={`${colors.light} p-2 rounded-md text-center text-sm`}>
            <p>Week of {format(startOfWeek(new Date()), 'MMM d, yyyy')}</p>
          </div>
          
          {/* Weekly plan */}
          <div>
            {itemsByDay.map(dayGroup => (
              <div key={dayGroup.day} className="mb-3">
                {dayGroup.items.length > 0 && (
                  <>
                    <h3 className={`text-sm font-medium mb-1 ${colors.text}`}>{dayGroup.day}</h3>
                    <div className="space-y-2">
                      {dayGroup.items.map(item => (
                        <div 
                          key={item.id} 
                          className={`border ${colors.border} rounded-md p-2 ${item.completed ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          {editingItemId === item.id ? (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <select
                                    className="w-full p-1 text-sm border rounded"
                                    value={item.day}
                                    onChange={(e) => updateItem(item.id, { day: e.target.value })}
                                  >
                                    {DAYS_OF_WEEK.map(day => (
                                      <option key={day} value={day}>{day}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <input
                                    type="time"
                                    className="w-full p-1 text-sm border rounded"
                                    value={item.time}
                                    onChange={(e) => updateItem(item.id, { time: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  className="w-full p-1 text-sm border rounded"
                                  value={item.activity}
                                  onChange={(e) => updateItem(item.id, { activity: e.target.value })}
                                />
                              </div>
                              <div className="flex justify-between">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setEditingItemId(null)}
                                  className="text-xs h-7"
                                >
                                  Done
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => deleteItem(item.id)}
                                  className="text-xs h-7"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`p-0 h-6 w-6 mr-2 ${item.completed ? 'bg-green-100' : 'bg-gray-100'}`}
                                onClick={() => toggleCompleted(item.id)}
                              >
                                <CheckCircle className={`h-4 w-4 ${item.completed ? 'text-green-600' : 'text-gray-400'}`} />
                              </Button>
                              <div className="flex-grow">
                                <div className="flex items-center text-xs text-gray-500 mb-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{item.time}</span>
                                </div>
                                <p className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>
                                  {item.activity}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => setEditingItemId(item.id)}
                              >
                                <Edit className="h-3 w-3 text-gray-500" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {/* Add new item form */}
            {addingNew ? (
              <div className={`border ${colors.border} rounded-md p-3 mt-4`}>
                <h3 className={`text-sm font-medium mb-2 ${colors.text}`}>New Activity</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Day</label>
                      <select
                        className="w-full p-1.5 text-sm border rounded"
                        value={newItemDay}
                        onChange={(e) => setNewItemDay(e.target.value)}
                      >
                        {DAYS_OF_WEEK.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Time</label>
                      <input
                        type="time"
                        className="w-full p-1.5 text-sm border rounded"
                        value={newItemTime}
                        onChange={(e) => setNewItemTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Activity</label>
                    <input
                      type="text"
                      className="w-full p-1.5 text-sm border rounded"
                      placeholder="Enter your planned activity"
                      value={newItemActivity}
                      onChange={(e) => setNewItemActivity(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAddingNew(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className={`bg-gradient-to-r ${colors.primary} ${colors.hover}`}
                      size="sm"
                      onClick={addNewItem}
                      disabled={!newItemActivity.trim()}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                className={`w-full bg-gradient-to-r ${colors.primary} ${colors.hover} mt-4`}
                onClick={() => setAddingNew(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New Activity
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}