"use client"

import { useEffect, useRef } from "react"
import { MessageProps, useMessageStore } from "../hooks/useMessages"


export default function InitMessage ({message} : {message: MessageProps[]}) {

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