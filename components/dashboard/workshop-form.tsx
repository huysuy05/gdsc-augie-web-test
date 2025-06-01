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
import { CalendarIcon, Loader2, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Workshop } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface WorkshopFormProps {
  workshop?: Workshop
}

export function WorkshopForm({ workshop }: WorkshopFormProps) {
  const router = useRouter()
  const supabase = createClientSupabase()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(workshop ? new Date(workshop.date) : undefined)
  const [tag, setTag] = useState("")

  const [formData, setFormData] = useState({
    title: workshop?.title || "",
    description: workshop?.description || "",
    time: workshop?.time || "",
    location: workshop?.location || "",
    image_url: workshop?.image_url || "/placeholder.svg?height=200&width=300",
    tags: workshop?.tags || [],
    resources_url: workshop?.resources_url || "",
    recording_url: workshop?.recording_url || "",
    presenter: workshop?.presenter || "",
    attendees_count: workshop?.attendees_count || 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const addTag = () => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag.trim()],
      }))
      setTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date) {
      alert("Please select a date")
      return
    }

    setLoading(true)

    try {
      const workshopData = {
        ...formData,
        date: format(date, "yyyy-MM-dd"),
      }

      if (workshop) {
        // Update existing workshop
        await supabase.from("workshops").update(workshopData).eq("id", workshop.id)
      } else {
        // Create new workshop
        await supabase.from("workshops").insert([workshopData])
      }

      router.push("/dashboard/workshops")
      router.refresh()
    } catch (error) {
      console.error("Error saving workshop:", error)
      alert("Failed to save workshop")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Workshop Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="presenter">Presenter</Label>
          <Input id="presenter" name="presenter" value={formData.presenter} onChange={handleChange} required />
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
          <Label htmlFor="resources_url">Resources URL</Label>
          <Input id="resources_url" name="resources_url" value={formData.resources_url} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recording_url">Recording URL</Label>
          <Input id="recording_url" name="recording_url" value={formData.recording_url} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attendees_count">Attendees Count</Label>
          <Input
            id="attendees_count"
            name="attendees_count"
            type="number"
            value={formData.attendees_count}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex space-x-2">
            <Input
              id="tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add a tag and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
            />
            <Button type="button" onClick={addTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((t, i) => (
              <Badge key={i} variant="secondary" className="flex items-center gap-1">
                {t}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(t)} />
              </Badge>
            ))}
          </div>
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
          {workshop ? "Update Workshop" : "Create Workshop"}
        </Button>
      </div>
    </form>
  )
}
