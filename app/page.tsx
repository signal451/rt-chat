import { ChatHeader } from "@/components/ChatHeader";
import InitUser from "@/lib/store/initUser";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { supabaseServerClient } from "@/utils/supabase/server";

export default async function Home() {

  const getCurrentUser = async () => {
    const supabase = supabaseServerClient()
    const { data, error } = await supabase.auth.getUser()
    return data.user
  }

  const data = await getCurrentUser()
  
  return (
    <>
      <main className="md:py-10 md:max-w-2xl h-screen mx-auto">
        <div className="h-full border rounded-md flex flex-col">
          <ChatHeader user={data} /> 
          <ChatMessages/>
          <ChatInput/>
          
        </div>
      </main>
      <InitUser user={data} />
    </>
  );
}
