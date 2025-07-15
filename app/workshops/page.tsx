import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkshopCard } from "@/components/workshop-card"

//This page is using Server Side Rendering, which is rendered in the server befo
export default async function WorkshopsPage() {
  
  const URL = "http://127.0.0.1:8000/workshops";
  
  const data = await fetch(URL, {cache: "no-store"})
  if (!data) {
    console.error("Failed to fetch workshops data!")
  }
  const res = await data.json();

  console.log(res);


  return (
    <div className="p-6">
      <div className="grid gap-6 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
        <WorkshopCard title="Test" date="Test" image="./everyone.jpg" description="Test" />
        <WorkshopCard title="Test" date="Test" image="Test" description="Test" />
        <WorkshopCard title="Test" date="Test" image="Test" description="Test" />
        <WorkshopCard title="Test" date="Test" image="Test" description="Test" />
        {/* Map your real data here */}
      </div>
    </div>
  )
}


//title, date, image, description, tags, presenter, attendees 