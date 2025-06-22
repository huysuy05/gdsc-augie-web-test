import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cta({title, description, btn1, btn2}) {
    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-blue-600 text-white">
            <div className="container mx-auto max-w-6xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">{title}</h2>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="outline" className="border-white bg-red hover:bg-blue-700 hover:text-white">
                        {btn1}
                    </Button>
                    <Link href="/contact">
                        <Button variant="outline" className="border-white bg-black text-red-700 hover:bg-blue-700 hover:text-white">
                        {btn2}
                        </Button>
                    </Link>
                    
                </div>
            </div>
        </section>
    )
}