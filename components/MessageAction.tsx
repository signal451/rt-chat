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

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

import { useMessageStore } from "@/lib/hooks/useMessages";
import { supabaseBrowserClient } from "@/utils/supabase/client";

import { toast } from "sonner";



// export const UpdateAction = () => {
  
//   return (
//     <Dialog>
//     <DialogTrigger asChild>
//       <button id="trigger-update">  </button>
//     </DialogTrigger>
//     <DialogContent className="sm:max-w-md">
//       <DialogHeader>
//         <DialogTitle>Edit message</DialogTitle>
//         <DialogDescription>
//           Anyone who has this link will be able to view this.
//         </DialogDescription>
//       </DialogHeader>
//       <div className="flex items-center space-x-2">
//         <div className="grid flex-1 gap-2">
//           <Input
//             id="link"
//             defaultValue="https://ui.shadcn.com/docs/installation"
//             readOnly
//           />
//         </div>
//       </div>
//     </DialogContent>
//   </Dialog>
//   )

// }



export const DeleteAction = () => {

  const message = useMessageStore((state) => state.actionMsg)
  const deleteMessage = useMessageStore((state) => state.deleteMsg)

  const handleDeleteMessage = async () => {
    const supabase = supabaseBrowserClient()
    const {data, error} = await supabase.from('messages').delete().eq("id", message?.id!)

    if(error) {
      return toast.error("Failed to delete message", {
        description: new Date().toLocaleString(),
        position: 'top-center'
      })
    }
    else {

      deleteMessage(message?.id!)

      toast.success("Successfully deleted message", {
        position: 'top-center'
      })
    }

  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id="trigger-delete">  </button>
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
  )
}


