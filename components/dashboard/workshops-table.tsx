"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { createClientSupabase } from "@/lib/auth"
import type { Workshop } from "@/lib/types"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import Link from "next/link"

interface WorkshopsTableProps {
  workshops: Workshop[]
}

export function WorkshopsTable({ workshops }: WorkshopsTableProps) {
  const [selectedWorkshops, setSelectedWorkshops] = useState<number[]>([])
  const router = useRouter()
  // const supabase = createClientSupabase()

  const toggleWorkshop = (id: number) => {
    setSelectedWorkshops((prev) => (prev.includes(id) ? prev.filter((workshopId) => workshopId !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (selectedWorkshops.length === workshops.length) {
      setSelectedWorkshops([])
    } else {
      setSelectedWorkshops(workshops.map((workshop) => workshop.id))
    }
  }

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://127.0.0.1:8000/workshops/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setSelectedWorkshops((prev) => prev.filter((workshopId) => workshopId !== id))
      router.refresh()
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedWorkshops.length === workshops.length && workshops.length > 0}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            {/* <TableHead>Presenter</TableHead> */}
            <TableHead>Attendees</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workshops.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No workshops found. Create your first workshop.
              </TableCell>
            </TableRow>
          ) : (
            workshops.map((workshop) => (
              <TableRow key={workshop.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedWorkshops.includes(workshop.id)}
                    onCheckedChange={() => toggleWorkshop(workshop.id)}
                    aria-label={`Select workshop ${workshop.title}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{workshop.title}</TableCell>
                
                <TableCell>{format(new Date(workshop.date), "MMM d, yyyy")}</TableCell>
                <TableCell className="font-medium">{workshop.attendees?.length}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => router.push(`admin/workshop/edit/${workshop.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(workshop.id)} className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div>
        <Link href="/admin/workshop/create">
        <Button >+</Button>
        </Link>
        
      </div>
    </div>
  )
}
