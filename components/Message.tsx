import { MessageType } from "@/lib/store/messages"
import Image from "next/image"
import { DropdownActionMenu } from "./Action"

export const Message = ({props}: {props: MessageType}) => {


  // date formation (5/12/2024 4:55PM) Basically local string but minus seconds

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
            <DropdownActionMenu/>
          </div>
          <p className="text-gray-300 "> {props.content}</p>
        </div>
       </div> 
    )
}