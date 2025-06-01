"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabase } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types"

interface EventFormProps {
  event?: Event
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const supabase = createClientSupabase()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(event ? new Date(event.date) : undefined)

  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    time: event?.time || "",
    location: event?.location || "",
    image_url: event?.image_url || "/placeholder.svg?height=200&width=300",
    category: event?.category || "Workshop",
    registration_url: event?.registration_url || "",
    max_attendees: event?.max_attendees || 30,
    is_active: event?.is_active ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date) {
      alert("Please select a date")
      return
    }

    setLoading(true)

    try {
      const eventData = {
        ...formData,
        date: format(date, "yyyy-MM-dd"),
        current_attendees: event?.current_attendees || 0,
      }

      if (event) {
        // Update existing event
        await supabase.from("events").update(eventData).eq("id", event.id)
      } else {
        // Create new event
        await supabase.from("events").insert([eventData])
      }

      router.push("/dashboard/events")
      router.refresh()
    } catch (error) {
      console.error("Error saving event:", error)
      alert("Failed to save event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g. 4:00 PM - 6:00 PM"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registration_url">Registration URL</Label>
          <Input
            id="registration_url"
            name="registration_url"
            value={formData.registration_url}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_attendees">Maximum Attendees</Label>
          <Input
            id="max_attendees"
            name="max_attendees"
            type="number"
            value={formData.max_attendees}
            onChange={handleNumberChange}
          />
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
          <Label htmlFor="is_active">Active Event</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {event ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  )
}
