import { supabase } from "./supabase"
import type { Workshop, Event } from "./types"

export async function getWorkshops(): Promise<Workshop[]> {
  const { data, error } = await supabase.from("workshops").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching workshops:", error)
    return []
  }

  return data || []
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data || []
}

export async function getWorkshopById(id: number): Promise<Workshop | null> {
  const { data, error } = await supabase.from("workshops").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching workshop:", error)
    return null
  }

  return data
}

export async function getEventById(id: number): Promise<Event | null> {
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching event:", error)
    return null
  }

  return data
}
