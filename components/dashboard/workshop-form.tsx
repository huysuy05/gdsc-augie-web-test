"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Workshop } from "@/lib/types"


interface WorkshopFormProps {
  workshop?: Workshop
}

export function WorkshopForm({ workshop }: WorkshopFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(workshop ? new Date(workshop.date) : undefined)
  // const [tag, setTag] = useState("")

  const [formData, setFormData] = useState({
    title: workshop?.title || "",
    description: workshop?.description || "",
    date: workshop?.date || "",
    location: workshop?.location || "",
    // image_url: workshop?.image_url || "/placeholder.svg?height=200&width=300",
    // tags: workshop?.tags || [],
    // resources_url: workshop?.resources_url || "",
    // recording_url: workshop?.recording_url || "",
    // presenter: workshop?.presenter || "",
    // attendees_count: workshop?.attendees || 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date) {
      alert("Please select a date")
      return
    }

    setLoading(true)
  }

    

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Workshop Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="presenter">Presenter</Label>
          <Input id="presenter" name="presenter" value={formData.presenter} onChange={handleChange} required />
        </div> */}

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

        {/* <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g. 4:00 PM - 6:00 PM"
            required
          />
        </div> */}

        {/* <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div> */}

        {/* <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resources_url">Resources URL</Label>
          <Input id="resources_url" name="resources_url" value={formData.resources_url} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recording_url">Recording URL</Label>
          <Input id="recording_url" name="recording_url" value={formData.recording_url} onChange={handleChange} />
        </div> */}

        
        
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
          {workshop ? "Update Workshop" : "Create Workshop"}
        </Button>
      </div>
    </form>
  )
}

