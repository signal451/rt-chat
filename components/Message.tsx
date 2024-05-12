
import { MessageProps } from "@/lib/hooks/useMessages"
import { useUserStore } from "@/lib/hooks/useUser"
import Image from "next/image"
import { MessageMenu } from "./Action"


export const Message = ({ props }: { props: MessageProps }) => {

  const user = useUserStore((state) => state.user)

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
          {props.user_id === user?.id && (<MessageMenu />)}
        </div>
        <p className="text-gray-300 "> {props.content}</p>
      </div>
    </div>
  )
}

