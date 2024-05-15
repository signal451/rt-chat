"use client"
import { MessageProps, useMessageStore } from "@/lib/hooks/useMessages"
import { Message } from "./Message"
import { DeleteAction } from "./MessageAction"
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

export default function ListMessages() {

  interface Payload {
    content: string;
    created_at: string;
    id: number;
    is_edit: boolean;
    user_id: string;
  }

  const { message, addMessage, deleteMsg, updateMsg } = useMessageStore((state) => state)
  const supabase = supabaseBrowserClient()

  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const channel = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages'}, payload => {

        const user_id = payload.new.user_id
        const fetchInsert = async () => {
          const { data, error } = await supabase.from("users").select('*').eq('id', user_id).single()

          if (error) {
            toast.error(error.message, {
              position: 'top-center'
            })
          }
          else {
            const rt_message = {
              ...payload.new,
              user_id: data.id,
              users: data
            }
            addMessage(rt_message as MessageProps)
          }
        }
        fetchInsert()
      })
      .on('postgres_changes',  { event: 'DELETE', schema: 'public', table: 'messages'}, payload => {
        deleteMsg(payload.old.id)
      })
      .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'messages'}, payload => {
        const fetchUpdate = async () => {
          const { data, error } = await supabase.from("users").select('*').eq('id', payload.new.user_id).single()
          const rt_message = {
            ...payload.new,
            users: data
          }
          updateMsg(rt_message as MessageProps) 
        }
        fetchUpdate()
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }

  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      })
    }

    // useEffect added hiij baigaa tohioldol deer l scroll to bottom hiimeer bn ?
  

  }, [message])

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto" ref={scrollRef}>
      <div className="flex-1"> </div>
      <div>
        {message.map((value, index) => {
          return (
            <Message props={value} key={index} />
          )
        })}
        <DeleteAction />
      </div>
    </div>
  )
}