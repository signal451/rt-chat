"use client"
import { Input } from "@/components/ui/input"
import { MessageProps, useMessageStore } from "@/lib/hooks/useMessages";
import { useUserStore } from "@/lib/hooks/useUser";
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { toast } from "sonner"


export default function ChatInput() {

    const user = useUserStore((state) => state.user)
    const addMessage = useMessageStore((state) => state.addMessage)
    const messageStore = useMessageStore((state) => state.message)
    
    const handleSendMessage =  async (message : string) => {

        if(message.trim()) {
        const supabase = supabaseBrowserClient()

        const { data, error } = await supabase.from('messages').insert({content: message}).select('id')

        const newMessage = {
            id: data?.[0]?.id,
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


        if (error) {
            return toast.error(error.message, {
                description: new Date().toLocaleString(),
                position: 'top-center'
            })
        }

        addMessage(newMessage as MessageProps)
    }
    else {
        return toast.error("Message cannot be empty", {
            position: 'top-center'
        })
    }

    }

    return (
        <div className="px-5 pb-5">
        <Input placeholder="Send messages" onKeyDown={(e) => {
            if (e.key === "Enter") {
                handleSendMessage(e.currentTarget.value)
                e.currentTarget.value = " "
            }
        }}/>    
        </div>
    )
}