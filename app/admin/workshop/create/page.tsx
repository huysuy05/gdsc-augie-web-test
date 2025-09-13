"use client"
import React from "react"
import { WorkshopForm } from "@/components/dashboard/workshop-form"



//What should be in a workshop create form?
// - A Title + Image of the workshop
// - A Date that the workshop will happen -> Will integrate the Google Calendar API to send an invitation.
// - A location -> Will be added in the location of the GG Calendar API. 
// - A small description for people to know what the workshop will be about
// - A RSVP button that people will sign in. 
export default function Create() {
    return (
        <div>
            <h1>Testing</h1>
            <WorkshopForm/>
        </div>
    )
}