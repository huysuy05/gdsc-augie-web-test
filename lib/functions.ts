import { Workshop } from "./types";

export async function handleSignUp(e: any, endpoint:string)  {
    e.preventDefault();
    const full_name = e.target.name.value;
    const email = e.target.email.value;
    const endpoints = "/api/"+ endpoint
    const response = await fetch(endpoints, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email }),
        }) 
    return response;
}
export async function handleRegister(e: any, endpoint:string, workshop_id: string)  {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const endpoints = "/api/"+ endpoint
    const response = await fetch(endpoints, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, workshop_id}),
        }) 
    return response;
}
export async function get_all_workshops() {
    const URL = "http://127.0.0.1:8000/workshops";
      
      const data = await fetch(URL, {cache: "no-store"})
      if (!data) {
        console.error("Failed to fetch workshops data!");
        return [];
      }
        const workshopsFromAPI: (Workshop & { date: string })[] = await data.json();
    
      // Convert date strings to Date objects
      return workshopsFromAPI.map(workshop => ({
        ...workshop,
        date: new Date(workshop.date),
      }));
}

// export async function get_single_regis() {
//     const UR
// }