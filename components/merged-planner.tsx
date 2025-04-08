"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"
import { format, isToday } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PlannerItem = {
  id: string
  date: Date
  time: string
  activity: string
  completed: boolean
  recurring: string | null  // e.g., "daily", "weekly", "fortnightly", "M/W/F"
}

type MergedPlannerProps = {
  habitId?: number
  ageGroup: "kids" | "teens" | "adults"
}

const RECURRING_OPTIONS = [
  { value: "", label: "None" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "fortnightly", label: "Every 2 Weeks" },
  { value: "M/W/F", label: "Mon/Wed/Fri" }
]

export function MergedPlanner({ habitId = 0, ageGroup }: MergedPlannerProps) {
  const [plannerItems, setPlannerItems] = useState<PlannerItem[]>([])
  const [addingNew, setAddingNew] = useState(false)
  const [newItemDate, setNewItemDate] = useState(new Date())
  const [newItemTime, setNewItemTime] = useState("08:00")
  const [newItemActivity, setNewItemActivity] = useState("")
  const [newItemRecurring, setNewItemRecurring] = useState("")

  // Load items from localStorage (simplified for demo)
  useEffect(() => {
    const saved = localStorage.getItem(`merged-planner-${ageGroup}-${habitId}`)
    if (saved) {
      try {
        const items = JSON.parse(saved).map((item: any) => ({
          ...item,
          date: new Date(item.date)
        }))
        setPlannerItems(items)
      } catch (error) {}
    }
  }, [ageGroup, habitId])

  const saveItems = (items: PlannerItem[]) => {
    localStorage.setItem(`merged-planner-${ageGroup}-${habitId}`, JSON.stringify(items))
  }

  const addNewItem = () => {
    if (!newItemActivity.trim()) return
    const newItem: PlannerItem = {
      id: `item-${Date.now()}`,
      date: newItemDate,
      time: newItemTime,
      activity: newItemActivity,
      completed: false,
      recurring: newItemRecurring || null
    }
    const updated = [...plannerItems, newItem]
    setPlannerItems(updated)
    saveItems(updated)
    setNewItemActivity("")
    setNewItemTime("08:00")
    setNewItemRecurring("")
    setAddingNew(false)
  }

  const toggleCompleted = (id: string) => {
    const item = plannerItems.find(i => i.id === id)
    if (!item) return
    // Only allow toggling for today's items
    if (!isToday(item.date)) {
      alert("You can only mark tasks as complete for today.")
      return
    }
    const updated = plannerItems.map(i => i.id === id ? { ...i, completed: !i.completed } : i)
    setPlannerItems(updated)
    saveItems(updated)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Merged Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plannerItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-medium">{format(item.date, 'MMM d, yyyy')} at {item.time}</p>
                <p>{item.activity} {item.recurring && <span className="text-sm text-gray-500">({item.recurring})</span>}</p>
              </div>
              <Button variant="ghost" onClick={() => toggleCompleted(item.id)}>
                <CheckCircle className={`h-5 w-5 ${item.completed ? "text-green-500" : "text-gray-300"}`} />
              </Button>
            </div>
          ))}
          {addingNew ? (
            <div className="border p-4 rounded space-y-3">
              <Input
                type="date"
                value={format(newItemDate, 'yyyy-MM-dd')}
                onChange={e => setNewItemDate(new Date(e.target.value))}
              />
              <Input
                type="time"
                value={newItemTime}
                onChange={e => setNewItemTime(e.target.value)}
              />
              <Input
                type="text"
                placeholder="What is your activity?"
                value={newItemActivity}
                onChange={e => setNewItemActivity(e.target.value)}
              />
              <Select onValueChange={(value) => setNewItemRecurring(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Recurring?" />
                </SelectTrigger>
                <SelectContent>
                  {RECURRING_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setAddingNew(false)}>Cancel</Button>
                <Button onClick={addNewItem}>Add Task</Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setAddingNew(true)}>+ New Task</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
