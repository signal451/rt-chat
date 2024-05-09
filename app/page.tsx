import { ChatHeader } from "@/components/ChatHeader";
import InitUser from "@/lib/store/initUser";
import ChatInput from "@/components/ChatInput";
import { supabaseServerClient } from "@/utils/supabase/server";


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
          <div className="flex-1 flex flex-col p-5 overflow-y-auto">
            <div className="flex-1"> </div>
            <div className="space-y-5">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((value) => {
                return (
                  <div className="flex gap-x-2" key={value}>
                  <div className="h-8 w-8 bg-green-700 rounded-full">{/* image */} </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-x-2">
                      <p className="font-bold"> Mizu </p>
                      <p className="text-xs  text-gray-400 pt-1"> {new Date().toLocaleString()} </p>
                    </div>
                    <p className="text-gray-300"> Hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type</p>
                  </div>
                 </div>
                )
              })}
             
            </div>
          </div>
          <ChatInput/>
        </div>
      </main>
      <InitUser user={data} />
    </>
  );
}
