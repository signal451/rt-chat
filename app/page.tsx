import { ChatHeader } from "@/components/ChatHeader";
import InitUser from "@/lib/store/initUser";
import { supabaseServerClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input"


export default async function Home() {

  const getCurrentUser = async () => {
    const supabase = supabaseServerClient()
    // TODO - Error handler 
    const { data, error } = await supabase.auth.getUser()
    return data.user
  }

  const data = await getCurrentUser()

  return (
    <>
      <main className="md:py-10 md:max-w-xl h-screen mx-auto">
        <div className="h-full border rounded-md flex flex-col">
          <ChatHeader user={data} />    
          <div className="flex-1 flex flex-col p-5">
            <div className="flex-1"> </div>
            <div>
             <div className="flex gap-x-2">
              {/* User profile and name */}
              <div className="h-8 w-8 bg-green-700 rounded-full">{/* image */} </div>
              <div className="flex-1">
                <div className="flex items-center gap-x-2">
                  <p className="font-bold"> Mizu </p>
                  <p className="text-xs  text-gray-400 pt-1"> {new Date().toLocaleString()} </p>
                </div>

                <p> Hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type</p>
              </div>
             </div>
            </div>

          </div>
          <div className="p-5">
          <Input placeholder="Send messages" />    
          </div>
        </div>
      </main>
      <InitUser user={data} />
    </>
  );
}
