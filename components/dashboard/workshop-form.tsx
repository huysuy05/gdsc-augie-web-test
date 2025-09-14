"use client"

import type React from "react"
import { handleCreateWorkshop } from "@/lib/functions"
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
import type { CreateWorkshop } from "@/lib/types"


interface WorkshopFormProps {
  workshop?: CreateWorkshop
}

export function WorkshopForm({ workshop }: WorkshopFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageloading, setimageLoading] = useState(false)
  const cloudinary_cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_NAME ?? "";
  const [date, setDate] = useState<Date | undefined>(
  workshop?.date ? new Date(workshop.date) : undefined
);

  // const [tag, setTag] = useState("")

  const [formData, setFormData] = useState({
    title: workshop?.title || "",
    description: workshop?.description || "",
    date: workshop?.date,
    location: workshop?.location || "",
    start_time: workshop?.start_time ? format(workshop.start_time, "HH:mm") : "",
    image_url:workshop?.image_url || "",
    end_time: workshop?.end_time ? format(workshop.end_time, "HH:mm") : ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    console.log(formData.image_url);
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setLoading(true);
    setimageLoading(true)
    if (!file) return;
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
    setimageLoading(false)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date) {
      alert("Please select a date")
      return
    }
    setLoading(true)
    
    // Combine date with start_time and end_time to create proper Date objects
    const startDateTime = new Date(date)
    const [startHours, startMinutes] = formData.start_time.split(':').map(Number)
    startDateTime.setHours(startHours, startMinutes, 0, 0)

    const endDateTime = new Date(date)
    const [endHours, endMinutes] = formData.end_time.split(':').map(Number)
    endDateTime.setHours(endHours, endMinutes, 0, 0)

    const workshopData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      image_url: formData.image_url,
      date: date.toISOString(),
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString()
    }
    
    const res = await handleCreateWorkshop(workshopData as CreateWorkshop);
    if (!res.ok) {
      alert("Cannot create new workshop")
      setLoading(false)
      console.log(workshopData)
      return
    }

    alert("Create workshop successfully!!!")
    setLoading(false)
    
    
    setFormData({
    title: workshop?.title || "",
    description: workshop?.description || "",
    date: workshop?.date,
    location: workshop?.location || "",
    start_time: workshop?.start_time ? format(workshop.start_time, "HH:mm") : "",
    image_url:workshop?.image_url || "",
    end_time: workshop?.end_time ? format(workshop.end_time, "HH:mm") : ""
  })
  router.push("/")

    
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
          <Label htmlFor="start_time">Start Time</Label>
          <Input
            type="time"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_time">End Time</Label>
          <Input
            type="time"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
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
          {imageloading ? "Uploading....." : formData.image_url ? <img src={formData.image_url} alt="" width="200px" height="200px"/> : null}
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

