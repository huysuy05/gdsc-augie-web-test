"use client"

import React, { createContext, useContext, useState, useEffect, Children } from "react";

//Used to decode the JWT Token without having to verify them.
import { jwtDecode } from "jwt-decode";


// An Interface to define strictyly what the auth provider will contain.
interface AuthContextType  {
    user: any; // User info extracted from the JWT Token
    token : string | null; // JWT Token
    isAdmin: boolean;  // A boolean to check whether an user is an admin or not.
    login: (token: string) => void; // A function to save the JWT Token and to log in
    logout: () => void; // A function to log out and clear the JWT Token being stored
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


// This is a component with type Context that will eventually wrap around your application to pass the authorization information
// This is in need in the future so that only admin will be able to see specific details of the website. 
// All other users that are not admnin cannot be able to see those data.
export const AuthProvider = ({ children }: { children: React.ReactNode}) => {

    // The state variables are a common Typescript notation to set the type of a variale
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    // Used an initial useEffect to fetch the information about the JWT Token and extract user info if authorized. 
    useEffect(() => {
        const tokenData = localStorage.getItem("token"); // Look in the browser's local storage to see if there
                                                        // is any field called "token" (which is your JWT Token)
        if (tokenData) {
            setToken(tokenData);
            const decoded: any = jwtDecode(tokenData);
            setUser(decoded);
        }

    }, [])
    

    // A function when called will set the browser's locale storage with JWT Token
    const login = (token : string) => {
        localStorage.setItem("token", token);
        setToken(token);
        const decode: any = jwtDecode(token);
        setUser(decode);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }
    // Returns true if the admin is logged in and is assigned with the role admin
    const isAdmin = user?.role === "admin";

    // Wraps around all children components from the root tree and pass down the value of every auth contexts
    return (
        <AuthContext.Provider value={{ user, token, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )


}

