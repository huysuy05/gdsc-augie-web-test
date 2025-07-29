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