"use client"
import { useMessageStore } from "@/lib/hooks/useMessages"
import { Message } from "./Message"
import {DeleteAction} from "./MessageAction"

export default function ListMessages() {

  const messages = useMessageStore((state) => state.message)

  // useless section

    return (
      <div>  
      {messages.map((value, index) => {
        return (
          <Message props={value} key={index} />
        )
      })}
      <DeleteAction/>
      {/* <UpdateAction/> */}
      </div>
    )
}