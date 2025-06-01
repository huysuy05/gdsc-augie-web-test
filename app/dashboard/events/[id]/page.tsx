import { notFound } from "next/navigation"
import { EventForm } from "@/components/dashboard/event-form"
import { supabase } from "@/lib/supabase"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { data: event } = await supabase.from("events").select("*").eq("id", params.id).single()

  if (!event) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit Event</h2>
      <EventForm event={event} />
    </div>
  )
}
