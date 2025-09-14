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
  date: Date    
  description: string
  location: string
  image_url: string
  start_time: Date
  end_time: Date
  attendees?: Array<string> 
}
export interface CreateWorkshop {
  title: string   
  date?: Date | string
  description: string
  location: string
  image_url: string
  start_time?: Date | string
  end_time?: Date | string
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
