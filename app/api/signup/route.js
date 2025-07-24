export async function POST(req) {
    const data =await req.json();
    
    const {full_name, email} = data  

    const body = await fetch("http://127.0.0.1:8000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },        
        body: JSON.stringify({ full_name, email }),
    });
    

    if (!body.ok) {
        return new Response(JSON.stringify({message: "Signup Failed, contact admin!"}), {status: 500})
    }
    console.log(body);
    return new Response(JSON.stringify({message: "Signup Failed, contact admin!"}), {status: 200})
}   