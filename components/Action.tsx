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

export const MessageMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="justify-between">
                        <span>Edit message </span>
                        <Pencil className=" h-4 w-4" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="justify-between" onClick={() => {
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