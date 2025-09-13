
import { WorkshopCard } from "@/components/workshop-card"
// import { WorkshopsTable } from "@/components/dashboard/workshops-table";

import { get_all_workshops } from "@/lib/functions";



//This page is using Server Side Rendering, which is rendered in the server befo
export default async function WorkshopsPage() {
  const workshops = await get_all_workshops();
  if (workshops.length == 0) {
    return <div className="p-6">Failed to fetch workshops data</div>
  }


  return (
    <div className="p-6">
      <div className="grid gap-6 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
        {workshops && workshops.map((workshop) => (
          <WorkshopCard 
              key={workshop.id}
              id={workshop.id}
              title={workshop.title}
              date={workshop.date}
              start_time={workshop.start_time}
              end_time={workshop.end_time}
              image_url=""
              description={workshop.description}
              attendees={workshop.attendees && workshop.attendees.length >= 0 ? workshop.attendees.length : 1}
              location={workshop.location}
          />
        ))}
        {/* <WorkshopsTable workshops={workshops}/> */}
      </div>
    </div>
  )
}


//title, date, image, description, tags, presenter, attendees 