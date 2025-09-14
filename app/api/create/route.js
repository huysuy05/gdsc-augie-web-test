export async function POST(req) {
    try {
        const data = await req.json()
        console.log("Received data:", data)

        const body = await fetch("http://127.0.0.1:8000/workshops", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        if (!body.ok) {
            const errorText = await body.text()
            console.error("Backend error:", errorText)
            return new Response(JSON.stringify({message: "Cannot create workshop", error: errorText}), {status: body.status})
        }

        return new Response(JSON.stringify({message: "Create workshop successfully"}), {status: 200})
    } catch (error) {
        console.error("API route error:", error)
        return new Response(JSON.stringify({message: "Internal server error", error: error.message}), {status: 500})
    }
}