"use client"
import { Input } from "@/components/ui/input"
import { MessageType, useMessageStore } from "@/lib/store/messages";
import { useUserStore } from "@/lib/store/user";
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { toast } from "sonner"



export default function ChatInput() {

    const user = useUserStore((state) => state.user)
    const addMessage = useMessageStore((state) => state.addMessage)
    const message = useMessageStore((state) => state.message)
    
    const handleSendMessage =  async (message : string) => {
        // inserts messages to supabase --> 

        if(message.trim()) {
        const supabase = supabaseBrowserClient()

        const newMessage = {
            id: message.length + 1,
            content: message,
            is_edit: false,
            user_id: user?.id,
            created_at: new Date().toISOString(),
            users: {
                id: user?.id,
                avatar_url: user?.user_metadata.avatar_url,
                username: user?.user_metadata.user_name,
                created_at: new Date().toISOString()
            }
        }

        const { error } = await supabase.from('messages').insert({content: message})

        if (error) {
            return toast.error(error.message, {
                description: new Date().toLocaleString(),
                position: 'top-center'
            })
        }


        addMessage(newMessage as MessageType)
    }
    else {
        return toast.error("Message cannot be empty", {
            position: 'top-center'
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