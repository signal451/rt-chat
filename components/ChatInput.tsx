"use client"
import { Input } from "@/components/ui/input"
import { MessageProps, useMessageStore } from "@/lib/hooks/useMessages";
import { useUserStore } from "@/lib/hooks/useUser";
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { toast } from "sonner"


export default function ChatInput() {
    const user = useUserStore((state) => state.user)
    const addMessage = useMessageStore((state) => state.addMessage)
    
    const handleSendMessage =  async (message : string) => {

        if(message.trim()) {
        const supabase = supabaseBrowserClient()
        const { data, error } = await supabase.from('messages').insert({content: message}).select('id')

        if (error) {
            return toast.error(error.message, {
                description: new Date().toLocaleString(),
                position: 'top-center'
            })
        }

    }
    else {
        return toast.error("Message cannot be empty", {
            position: 'top-center'
        })
    }}

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