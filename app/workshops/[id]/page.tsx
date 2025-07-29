"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleSignUp } from "@/lib/functions";
import { useInView } from "react-intersection-observer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Defines an expected type that we want for the id attribute
//It expects an object params which has an id attribute.
// This is how NextJS passes URL route parameters for dynamic routes. 
// interface SingleWorkshopProps {
//     params: {
//         id: string;
//     };

// }

export default function ViewWorkshop (){
    // const { id } =  await params;
    // const URL = "http://127.0.0.1:8000/workshops/" + id;
    // const res = await fetch(URL)
    // if (!res) {
    //     console.error("Cannot fetch a single workshop")
    // }
    // const data: (Workshop & { date: string} ) = await res.json();
    // const new_data: Workshop = await {...data, date: new Date(data.date)};
    const [form ,setForm] = useState({name: "", email: ""})
    const [status, setStatus] = useState("")
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const {ref: heroRef, inView: heroInView} = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    const { ref: formRef, inView: formInView} = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: [e.target.value]})
    }

    const handleSubmit  = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await handleSignUp(e, "register");
        if (!response) {
            setError("Failed to register, contact GDG admin for support");
            setTimeout(() => setError(null), 5000)
        }
    }

    


    
    return (
        <div className="flex flex-col min-h-screen items-center">
            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error Siging up for this workshop</AlertTitle>
                    <AlertDescription>Contact GDG Admin to fix this issue</AlertDescription>
                </Alert>
            )}
            {/* Hero Section  */}
            <section className="py-20 px-10 md:px-6 lg:px-8 ">
                <div ref={heroRef} className="container text-center mx-auto max-w-6xl">
                    <h1 className={`text-4xl font-bold ${heroInView ? "animate-pulse ": "opacity-0"}`}><span className="text-blue-600">Register</span> for this workshop right now!!</h1>
                    <p className={`text-l text-gray-600 ${heroInView ? "animate-fade-up animate-delay-100 ": "opacity-0"}`}>Have questions? Email GDG Admins for answers</p>
                </div>

                {/* Register Form */}
                <div ref={formRef} className={`max-w-6xl p-10 mt-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100`}>
                    <div className="grid grid-cols-1  gap-12 ">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold  ">Register here</h2>
                            <div className="space-y-2">
                                <label className="text-md font-bold">Your Full Name:</label>
                                <Input type="name" name="name" placeholder="Enter your full name here" required></Input>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-md font-bold">Your Email:</label>
                                <Input type ="email" name="email" placeholder="Enter your email here" required></Input>
                            </div>
                            <Button className="w-full">Register</Button>
                            {status && (<p>{status}</p>)}
                        </form>
                    </div>
                    
                
                </div>
            </section>
            
                
        </div>
    )
}   