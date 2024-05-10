"use client"

import { useEffect, useRef } from "react"
import { MessageType, useMessageStore } from "./messages"


export default function InitMessage ({message} : {message: MessageType[]}) {

    const initState = useRef(false)

    useEffect(() => {
        if(!initState.current) {
            useMessageStore.setState({message})    
        }

        initState.current = true
        // eslint-disable-next-line
    }, [])

    return (
        <></>
    )

}