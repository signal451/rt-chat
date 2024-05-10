"use client"

import { useMessageStore } from "@/lib/store/messages"
import { Message } from "./Message"

export default function ListMessages() {

  const messages = useMessageStore((state) => state.message)

    return (
      messages.map((value, index) => {
        return (
          <Message props={value} key={index} />
        )
      })
    )
}