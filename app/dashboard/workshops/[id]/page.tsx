import { notFound } from "next/navigation"
import { WorkshopForm } from "@/components/dashboard/workshop-form"
import { supabase } from "@/lib/supabase"

interface WorkshopPageProps {
  params: {
    id: string
  }
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { data: workshop } = await supabase.from("workshops").select("*").eq("id", params.id).single()

  if (!workshop) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit Workshop</h2>
      <WorkshopForm workshop={workshop} />
    </div>
  )
}
