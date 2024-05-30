import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Trash2,
    Ellipsis,
    Pencil
} from "lucide-react"

import { MessageProps, useMessageStore } from "@/lib/hooks/useMessages"
import React, { Dispatch, SetStateAction } from "react"
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { toast } from "sonner";
import { useState } from "react"


interface MessageMenuProp {
    actionProps: MessageProps,
    update: Dispatch<SetStateAction<boolean>>
}


export const MessageMenu: React.FC<MessageMenuProp> = ({ actionProps, update }) => {

    const [isOpen, setIsOpen] = useState(false)

    const setActionMsg = useMessageStore((state) => state.addActionMsg)
    const deleteMessage = useMessageStore((state) => state.deleteMsg)

    const handleDeleteMessage = async () => {
        const supabase = supabaseBrowserClient()
        const {data, error} = await supabase.from("messages").delete().eq("id", actionProps.id)
        
        if(error) {
            return toast.error("Failed to delete message", {
              description: new Date().toLocaleString(),
              position: 'top-center'
            })
          }
          else {
            setIsOpen(false)
            deleteMessage(actionProps.id)
          }
    }


    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                    <DropdownMenuItem className="justify-between"  onClick={() => {
                        setActionMsg(actionProps)
                        update(true)
                    }}>
                        <span>Edit message </span>
                        <Pencil className=" h-4 w-4" />
                    </DropdownMenuItem>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="justify-between">
                            <span className="text-red-500 pr-5">Delete message </span>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete message</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure about want to delete this message ?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteMessage}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}