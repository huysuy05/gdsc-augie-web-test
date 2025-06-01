export interface User {
  id: string
  email: string
  full_name: string
  role: "member" | "exec" | "admin"
  created_at: string
  updated_at: string
}

export interface Workshop {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image_url: string
  tags: string[]
  resources_url?: string
  recording_url?: string
  presenter: string
  attendees_count: number
  created_at: string
  updated_at: string
}

export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  image_url: string
  category: string
  registration_url?: string
  max_attendees?: number
  current_attendees: number
  is_active: boolean
  created_at: string
  updated_at: string
}
