import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Trash2,
    Ellipsis,
    Pencil
} from "lucide-react"

import { MessageProps, useMessageStore } from "@/lib/hooks/useMessages"
import React, { Dispatch, SetStateAction } from "react"

interface MessageMenuProp {
    actionProps: MessageProps,
    update: Dispatch<SetStateAction<boolean>>
}


export const MessageMenu :React.FC<MessageMenuProp> = ({actionProps, update}) => {

    const setActionMsg = useMessageStore((state) => state.addActionMsg)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="justify-between" onClick={() => {
                        setActionMsg(actionProps)
                        update(true)
                    }}>
                        <span>Edit message </span>
                        <Pencil className=" h-4 w-4" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="justify-between" onClick={() => {
                        setActionMsg(actionProps)
                        document.getElementById("trigger-delete")?.click()
                    }}>
                        <span className="text-red-500 pr-5">Delete message </span>
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}