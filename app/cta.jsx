"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";



export function Cta({title, description, btn1, btn2}) {
    const [ showModal, setShowModal ] = useState(false);


    const handleSignUpEmail = () => {
        setShowModal(false);
        alert("Email submited successfully, our team will talk to you soon!");
    }

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";

        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        }
    }, [showModal])

    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-blue-600 text-black">
            <div className="container mx-auto max-w-6xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{title}</h2>
                <p className="text-lg text-white max-w-2xl mx-auto mb-8">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="outline" className="border-white bg-red hover:bg-blue-700 hover:text-white text-white" onClick={() => {
                        setShowModal(true)
                    }}>
                        {btn1}
                    </Button>
                    {showModal && (
                        <div 
                            onClick={() => {setShowModal(false)}}
                            className="fixed min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0"
                        >
                            <div 
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white p-4 "
                            >
                                <div className="flex flex-col gap-4 max-w-[400px] text-black">
                                    <h3>Your Full Name: </h3>
                                    <Input id="name" type="name" placeholder="Type your name here" />
                                    <h3>Enter your email here</h3>
                                    <Input id="email" type="email" placeholder="your.email@augustana.edu" />
                                    <div className="flex gap-4 mt-5">
                                        <Button variant="default" className="!bg-blue-700 text-white px-4 py-2 rounded !hover:bg-blue-500" onClick={handleSignUpEmail}>Submit</Button>
                                        <Button
                                                variant="destructive"
                                                className="!bg-gray-500 !text-black px-4 py-2 rounded !hover:bg-gray-600"
                                                onClick={() => setShowModal(false)}
                                        >
                                        Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Link href="/contact">
                        <Button variant="outline" className="border-white bg-black text-white hover:bg-blue-700 hover:text-white">
                        {btn2}
                        </Button>
                    </Link>
                    
                </div>
            </div>
        </section>
    )
}