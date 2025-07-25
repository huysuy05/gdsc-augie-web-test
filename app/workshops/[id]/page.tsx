
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
    const data = await res.json();
    const new_data = await {...data, date: new Date(data.date)};
    
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>{new_data.title}</h1>
            <h2>{new_data.description}</h2>
            <h2>{new_data.date.toDateString()}</h2>
        </div>
    )
}   