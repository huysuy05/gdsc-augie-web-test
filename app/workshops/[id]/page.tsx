

export default async function ViewWorkshop (){
    const URL = "http://127.0.0.1:8000/workshops/2"
    const res = await fetch(URL)
    if (!res) {
        console.error("Cannot fetch a single workshop")
    }
    const data = await res.json()
    
    return (
        <div className="flex justify-center items-center">
            <h1>{data.title}</h1>
            <h2>{data.description}</h2>
        </div>
    )
}