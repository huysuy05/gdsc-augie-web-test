import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { EventsTable } from "@/components/dashboard/events-table"
import { supabase } from "@/lib/supabase"

export default async function EventsPage() {
  const { data: events } = await supabase.from("events").select("*").order("date", { ascending: false })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        <Button asChild>
          <Link href="/dashboard/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg">
        <EventsTable events={events || []} />
      </div>
    </div>
  )
}
