"use client"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { supabaseBrowserClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export const ChatHeader = ({ user }: { user: User | null }) => {

  const router = useRouter()

  const handleLogIn = async () => {
    const supabase = supabaseBrowserClient()
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback"
      }
    })
  }

  const handleLogOut = async () => {
    const supabase = supabaseBrowserClient()
    const { error } = await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex p-5 justify-between border-b-[1px]">
      <div className="flex items-center">
      <div className="flex-col">
          <h1 className="font-semibold text-lg"> Kizuna Chat </h1>
          </div>
      </div>
      {user ? (
        <Button className="mt-1" onClick={handleLogOut}> <Github className="mr-2" /> logout </Button>
      )
        : (
          <Button className="mt-1" onClick={handleLogIn}> <Github className="mr-2" /> login </Button>
        )}

    </div>
  )
}