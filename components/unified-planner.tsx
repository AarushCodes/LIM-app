"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, Clock, Trash2, Save, Edit, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, addDays, isSameDay, isToday, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, isSameMonth } from "date-fns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type UnifiedPlannerProps = {
  ageGroup: "kids" | "teens" | "adults";
  habitId: number;
};

type PlannerItem = {
  id: string;
  date: Date;
  time: string;
  activity: string;
  completed: boolean;
  recurring: string | null; // "daily", "weekly", "fortnightly", or specific days like "M/W/F"
};

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function UnifiedPlanner({ ageGroup, habitId }: UnifiedPlannerProps) {
  const [plannerItems, setPlannerItems] = useState<PlannerItem[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [newItemDate, setNewItemDate] = useState(new Date());
  const [newItemTime, setNewItemTime] = useState("08:00");
  const [newItemActivity, setNewItemActivity] = useState("");
  const [newItemRecurring, setNewItemRecurring] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Color schemes based on age group
  const colorSchemes = {
    kids: {
      primary: "from-pink-500 to-orange-400",
      hover: "hover:from-pink-600 hover:to-orange-500",
      light: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
      accent: "text-pink-500",
    },
    teens: {
      primary: "from-blue-500 to-teal-400",
      hover: "hover:from-blue-600 hover:to-teal-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      accent: "text-teal-500",
    },
    adults: {
      primary: "from-purple-500 to-indigo-400",
      hover: "hover:from-purple-600 hover:to-indigo-500",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      accent: "text-indigo-500",
    },
  };

  const colors = colorSchemes[ageGroup];

  // Load planner items from local storage
  useEffect(() => {
    const savedItems = localStorage.getItem(`unified-planner-${ageGroup}-${habitId}`);

    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        // Convert date strings back to Date objects
        const itemsWithDates = parsedItems.map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }));
        setPlannerItems(itemsWithDates);
      } catch (error) {
        console.error("Error parsing saved planner items:", error);
        generateSampleItems();
      }
    } else {
      // Generate sample items for demo purposes
      generateSampleItems();
    }
  }, [ageGroup, habitId]);

  // Generate sample planner items
  const generateSampleItems = () => {
    const itemsByAgeGroup = {
      kids: [
        { date: addDays(startOfWeek(new Date()), 1), time: "15:30", activity: "Practice being proactive by cleaning my room without being asked", recurring: null },
        { date: addDays(startOfWeek(new Date()), 3), time: "16:00", activity: "Make a goal chart for the week", recurring: null },
        { date: addDays(startOfWeek(new Date()), 6), time: "10:00", activity: "Family activity: practice listening to each other", recurring: null },
      ],
      teens: [
        { date: addDays(startOfWeek(new Date()), 1), time: "16:00", activity: "Study session with focus on most important subjects first", recurring: null },
        { date: addDays(startOfWeek(new Date()), 4), time: "17:30", activity: "Practice active listening with a friend", recurring: null },
        { date: addDays(startOfWeek(new Date()), 6), time: "09:00", activity: "Work on personal mission statement", recurring: null },
      ],
      adults: [
        { date: addDays(startOfWeek(new Date()), 1), time: "07:30", activity: "Morning planning session for the week", recurring: null },
        { date: addDays(startOfWeek(new Date()), 3), time: "12:00", activity: "Lunch meeting focusing on win-win solutions", recurring: null },
        { date: addDays(startOfWeek(new Date()), 5), time: "17:00", activity: "Review weekly accomplishments and plan for improvement", recurring: null },
      ],
    };

    const sampleItems = (itemsByAgeGroup[ageGroup] || []).map((item, index) => ({
      id: `sample-${index}`,
      date: item.date,
      time: item.time,
      activity: item.activity,
      completed: false,
      recurring: item.recurring,
    }));

    setPlannerItems(sampleItems);
    savePlannerItems(sampleItems);
  };

  // Save planner items to local storage
  const savePlannerItems = (items: PlannerItem[]) => {
    localStorage.setItem(`unified-planner-${ageGroup}-${habitId}`, JSON.stringify(items));
  };

  // Add new planner item
  const addNewItem = () => {
    if (!newItemActivity.trim()) return;

    const newItem: PlannerItem = {
      id: `item-${Date.now()}`,
      date: newItemDate,
      time: newItemTime,
      activity: newItemActivity,
      completed: false,
      recurring: newItemRecurring,
    };

    const updatedItems = [...plannerItems, newItem];
    setPlannerItems(updatedItems);
    savePlannerItems(updatedItems);

    // Reset form
    setNewItemDate(new Date());
    setNewItemTime("08:00");
    setNewItemActivity("");
    setNewItemRecurring(null);
    setAddingNew(false);
  };

  // Delete planner item
  const deleteItem = (id: string) => {
    const updatedItems = plannerItems.filter((item) => item.id !== id);
    setPlannerItems(updatedItems);
    savePlannerItems(updatedItems);

    if (editingItemId === id) {
      setEditingItemId(null);
    }
  };

  // Toggle completion status
  const toggleCompleted = (id: string) => {
    const updatedItems = plannerItems.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setPlannerItems(updatedItems);
    savePlannerItems(updatedItems);
  };

  // Update item
  const updateItem = (id: string, updatedValues: Partial<PlannerItem>) => {
    const updatedItems = plannerItems.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedValues };
      }
      return item;
    });

    setPlannerItems(updatedItems);
    savePlannerItems(updatedItems);
    setEditingItemId(null);
  };

  // Group items by date
  const itemsByDate = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  }).map((date) => {
    return {
      date,
      items: plannerItems
        .filter((item) => isSameDay(item.date, date))
        .sort((a, b) => a.time.localeCompare(b.time)),
    };
  });

  // Previous week
  const prevWeek = () => {
    const prevWeekDate = addDays(currentDate, -7);
    setCurrentDate(prevWeekDate);
  };

  // Next week
  const nextWeek = () => {
    const nextWeekDate = addDays(currentDate, 7);
    setCurrentDate(nextWeekDate);
  };

  return (
    <Card className={`${colors.border} overflow-hidden`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          Unified Habit Planner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Week navigation */}
          <div className="flex justify-between items-center mb-2">
            <Button variant="ghost" size="sm" onClick={prevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className={`text-sm font-medium ${colors.text}`}>
              {format(startOfWeek(currentDate), "MMM d")} - {format(endOfWeek(currentDate), "MMM d, yyyy")}
            </h3>
            <Button variant="ghost" size="sm" onClick={nextWeek} disabled={endOfWeek(currentDate) < new Date()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Weekly plan */}
          <div>
            {itemsByDate.map((dateGroup) => (
              <div key={dateGroup.date.toISOString()} className="mb-3">
                <h3 className={`text-sm font-medium mb-1 ${colors.text}`}>
                  {format(dateGroup.date, "EEEE, MMM d")}
                </h3>
                <div className="space-y-2">
                  {dateGroup.items.map((item) => (
                    <div
                      key={item.id}
                      className={`border ${colors.border} rounded-md p-2 ${item.completed ? "bg-gray-50" : "bg-white"
                        }`}
                    >
                      {editingItemId === item.id ? (
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Time</label>
                            <Input
                              type="time"
                              className="w-full p-1 text-sm border rounded"
                              value={item.time}
                              onChange={(e) => updateItem(item.id, { time: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Activity</label>
                            <Input
                              type="text"
                              className="w-full p-1 text-sm border rounded"
                              value={item.activity}
                              onChange={(e) => updateItem(item.id, { activity: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Recurring</label>
                            <Select onValueChange={(value) => updateItem(item.id, { recurring: value })}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="None" defaultValue={item.recurring || undefined} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="fortnightly">Fortnightly</SelectItem>
                                <SelectItem value="M/W/F">M/W/F</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => setEditingItemId(null)}>
                              Done
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => deleteItem(item.id)}>
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
                            className={`p-0 h-6 w-6 mr-2 ${item.completed ? "bg-green-100" : "bg-gray-100"}`}
                            onClick={() => toggleCompleted(item.id)}
                            disabled={!isToday(dateGroup.date)}
                          >
                            <CheckCircle className={`h-4 w-4 ${item.completed ? "text-green-600" : "text-gray-400"}`} />
                          </Button>
                          <div className="flex-grow">
                            <div className="flex items-center text-xs text-gray-500 mb-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{item.time}</span>
                            </div>
                            <p className={`text-sm ${item.completed ? "line-through text-gray-500" : ""}`}>{item.activity}</p>
                            {item.recurring && <div className="text-xs text-gray-500">Recurring: {item.recurring}</div>}
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingItemId(item.id)}>
                            <Edit className="h-3 w-3 text-gray-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add new item form */}
          {addingNew ? (
            <div className={`border ${colors.border} rounded-md p-3 mt-4`}>
              <h3 className={`text-sm font-medium mb-2 ${colors.text}`}>New Activity</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Date</label>
                  <Input
                    type="date"
                    className="w-full p-1.5 text-sm border rounded"
                    value={format(newItemDate, "yyyy-MM-dd")}
                    onChange={(e) => setNewItemDate(new Date(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Time</label>
                  <Input
                    type="time"
                    className="w-full p-1.5 text-sm border rounded"
                    value={newItemTime}
                    onChange={(e) => setNewItemTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Activity</label>
                  <Input
                    type="text"
                    className="w-full p-1.5 text-sm border rounded"
                    placeholder="Enter your planned activity"
                    value={newItemActivity}
                    onChange={(e) => setNewItemActivity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Recurring</label>
                  <Select onValueChange={(value) => setNewItemRecurring(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="fortnightly">Fortnightly</SelectItem>
                      <SelectItem value="M/W/F">M/W/F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setAddingNew(false)}>
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
      </CardContent>
    </Card>
  );
}
