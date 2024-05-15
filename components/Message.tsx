import Image from "next/image"
import { MessageProps, useMessageStore } from "@/lib/hooks/useMessages"
import { useUserStore } from "@/lib/hooks/useUser"
import { MessageMenu } from "./Action"
import { Input } from "./ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export const Message = ({ props }: { props: MessageProps }) => {

  const user = useUserStore((state) => state.user)
  const message = useMessageStore((state) => state.actionMsg)
  const optimisticUpdateMsg = useMessageStore((state) => state.updateMsg)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleUpdateMessage = async (newMessage: string) => {
    // let's check if message is changed first
    if(newMessage.trim().length === 0) {
      setIsEdit(true)
      return toast.error("You can't send empty message ", {
        position: 'top-center'
      })
    }

    const supabase = supabaseBrowserClient()
    const {error} = await supabase.from('messages').update({content: newMessage.trim()}).eq('id', message?.id!)

    if(error) {
      console.error(error);
      setIsEdit(true)
      return toast.error("Failed to update message", {
        description: new Date().toLocaleString(),
        position: 'top-center'
      })
    }
    else {
      setIsEdit(false)
      optimisticUpdateMsg({
        ...props,
        content: newMessage.trim(),
        is_edit: true
      })
      
    }

  }

  const handleWhenEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateMessage(e.currentTarget.value)
    }
  }

  return (
    <div className="flex gap-x-2 hover:bg-neutral-900 hover:rounded-md p-3">
      <div>
        <Image
          src={props.users?.avatar_url || ''}
          alt={props.users?.username || ''}
          width={40}
          height={40}
          className="object-contain rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <p className="font-bold"> {props.users?.username} </p>
            <p className="text-xs  text-gray-400 pt-1"> {new Date(props.created_at).toLocaleString()} </p>
          </div>
          {props.user_id === user?.id && (<MessageMenu actionProps={props} update={setIsEdit} />)}
        </div>
        <div className={cn("pt-0", isEdit && "pt-2")}>
          {isEdit ? (<Input id="message" defaultValue={props.content} onKeyDown={handleWhenEdit} />) : (<p className="text-gray-300 "> {props.content}</p>)}
        </div>
      </div>
    </div>
  )
}

