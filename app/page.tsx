import { ChatHeader } from "@/components/ChatHeader";
import InitUser from "@/lib/store/initUser";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
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
          <div className="flex-1 flex flex-col p-4 overflow-y-auto">
            <div className="flex-1"> </div>
            <div>
              <ChatMessages/>
            </div>
          </div>
          <ChatInput/>
        </div>
      </main>
      <InitUser user={data} />
    </>
  );
}
