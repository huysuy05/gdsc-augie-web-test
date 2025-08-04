export async function POST(req) {
    const data = await req.json();
    const {name, email, workshop_id } = data;
    const workshop_int = parseInt(workshop_id, 10 )
    // console.log(typeof(workshop_int))
    const body = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, email, workshops_id:workshop_int }),
    })

    if (!body.ok) {
        return new Response(JSON.stringify({message: "Register failed!"}))
    }
    return new Response(JSON.stringify({message: "Register Successfully"}))
}