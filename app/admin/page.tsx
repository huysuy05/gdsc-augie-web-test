import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { WorkshopsTable } from "@/components/dashboard/workshops-table";
import { get_all_workshops } from "@/lib/functions";
export default async function Admin() {
    const all_workshops = await get_all_workshops();
    if (all_workshops.length === 0) {
        return <div>There is no workshop!</div>
    }
    return (
        <div>
            {/* <DashboardNav/> */}
            <WorkshopsTable workshops={all_workshops}/>

        </div>
        
    )
}