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
  const cloudinary_cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_NAME ?? "";
  const [date, setDate] = useState<Date | undefined>(workshop ? new Date(workshop.date) : undefined)

  // const [tag, setTag] = useState("")

  const [formData, setFormData] = useState({
    title: workshop?.title || "",
    description: workshop?.description || "",
    date: workshop?.date || "",
    location: workshop?.location || "",
    start_time: workshop?.start_time,
    image_url:workshop?.image_url || "",
    end_time: workshop?.start_time || ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    console.log(formData.image_url);
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setLoading(true);
    if (!file) return
    const data = new FormData();
    data.append("file", file)
    data.append("upload_preset", "gdg-photos")
    data.append("cloud_name", cloudinary_cloud_name)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/image/upload`, {
      method:"POST",
      body: data
    })

    const uploadedImageURL = await res.json()
    setFormData((prev) => ({...prev, image_url: uploadedImageURL.url}))
    console.log(uploadedImageURL.url)
    setLoading(false)
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

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            type="time"
            id="time"
            name="time"
            value={formData.start_time?.toISOString().substring(11,16)}
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
          <Input type="file" id="image_url" name="image_url" onChange={handleImageUpload} accept="image/*" />
          {loading ? "Uploading....." : formData.image_url ? <img src={formData.image_url} alt="" width="200px" height="200px"/> : null}
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

