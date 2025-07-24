
// Defines an expected type that we want for the id attribute
//It expects an object params which has an id attribute.
// This is how NextJS passes URL route parameters for dynamic routes. 
interface SingleWorkshopProps {
    params: {
        id: string;
    };
}

export default async function ViewWorkshop ({params}: SingleWorkshopProps){
    const { id } = params;
    const URL = "http://127.0.0.1:8000/workshops/" + id;
    const res = await fetch(URL)
    if (!res) {
        console.error("Cannot fetch a single workshop")
    }
    const data = await res.json()
    
    return (
        <div className="flex justify-center items-center">
            <h1>{data.title}</h1>
            <h2>{data.description}</h2>
            <h2>{data.date}</h2>
        </div>
    )
}   