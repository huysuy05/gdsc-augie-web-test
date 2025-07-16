import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkshopCard } from "@/components/workshop-card"
// import { useAuth } from "@/contexts/AuthContext"




type WorkshopFromAPI = {
  id: number
  title: string
  date: Date
  image: string
  description: string
  // created_at : Date
  attendees?: number
}

//This page is using Server Side Rendering, which is rendered in the server befo
export default async function WorkshopsPage() {
  // const {isAdmin} = useAuth();
  const URL = "http://127.0.0.1:8000/workshops";
  
  const data = await fetch(URL, {cache: "no-store"})
  if (!data) {
    console.error("Failed to fetch workshops data!");
    return <div className="p-6">Failed to fetch workshops data</div>
  }
    const workshopsFromAPI: (WorkshopFromAPI & { date: string })[] = await data.json();

  // Convert date strings to Date objects
  const workshops: WorkshopFromAPI[] = workshopsFromAPI.map(workshop => ({
    ...workshop,
    date: new Date(workshop.date),
  }));

  console.log(workshops);


  return (
    <div className="p-6">
      <div className="grid gap-6 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
        {workshops && workshops.map((workshop) => (
          <WorkshopCard 
              key={workshop.id}
              title={workshop.title}
              date={workshop.date}
              image="Not available"
              description={workshop.description}
              attendees={workshop.attendees && workshop.attendees >= 0 ? workshop.attendees : 1}
          />
        ))}
      </div>
    </div>
  )
}


//title, date, image, description, tags, presenter, attendees 