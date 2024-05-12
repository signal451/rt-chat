"use client"
import { User } from "@supabase/supabase-js"
import { useEffect, useRef } from "react"
import { useUserStore } from "../hooks/useUser"


// questionable code for sure
export default function InitUser ({user} : {user : User | null})  {
    
    const initState = useRef(false)

    useEffect(() => {
        if(!initState.current) {
            useUserStore.setState({ user })
        }
        initState.current = true
        // eslint-disable-next-line
    }, [])
    
    return (
        <></>
    )
}