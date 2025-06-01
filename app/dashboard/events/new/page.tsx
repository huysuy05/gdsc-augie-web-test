import { EventForm } from "@/components/dashboard/event-form"

export default function NewEventPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Create New Event</h2>
      <EventForm />
    </div>
  )
}
