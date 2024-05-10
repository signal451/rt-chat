import { MessageType } from "@/lib/store/messages"
import Image from "next/image"

export const Message = ({props}: {props: MessageType}) => {
    return (
        <div className="flex gap-x-2">
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
          <div className="flex items-center gap-x-2">
            <p className="font-bold"> {props.users?.username} </p>
            <p className="text-xs  text-gray-400 pt-1"> {new Date(props.created_at).toLocaleString()} </p>
          </div>
          <p className="text-gray-300 "> {props.content}</p>
        </div>
       </div> 
    )
}