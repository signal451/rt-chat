"use client"
import { Input } from "@/components/ui/input"
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export default function ChatInput() {

    const handleSendMessage =  async (message : string) => {
        // inserts messages to supabase --> 

        const supabase = supabaseBrowserClient()
        const { error } = await supabase.from('messages').insert({content: message})

        if (error) {
            toast.error(error.message, {
                description: new Date().toLocaleString(),
                position: 'top-right'
            })
        }
    }

    return (
        <div className="p-5">
        <Input placeholder="Send messages" onKeyDown={(e) => {
            if (e.key === "Enter") {
                handleSendMessage(e.currentTarget.value)
                e.currentTarget.value = " "
            }
        }}/>    
        </div>
    )
}