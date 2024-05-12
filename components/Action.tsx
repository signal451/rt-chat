import {
    Pencil,
    Trash2,
    Ellipsis,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export function DropdownActionMenu() {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button size={"sm_icon"} variant="ghost"><Ellipsis/>  </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuGroup>
          <DropdownMenuItem className="justify-between">
              <span className="mr-10">Edit message</span>
              <Pencil className=" h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-between">
              <span className="text-red-500 mr-10">Delete message</span>
              <Trash2 className="h-4 w-4 text-red-500"/>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  