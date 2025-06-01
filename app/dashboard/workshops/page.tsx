import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { WorkshopsTable } from "@/components/dashboard/workshops-table"
import { supabase } from "@/lib/supabase"

export default async function WorkshopsPage() {
  const { data: workshops } = await supabase.from("workshops").select("*").order("date", { ascending: false })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workshops</h2>
        <Button asChild>
          <Link href="/dashboard/workshops/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Workshop
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg">
        <WorkshopsTable workshops={workshops || []} />
      </div>
    </div>
  )
}
