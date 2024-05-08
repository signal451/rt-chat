import { ChatHeader } from "@/components/ChatHeader";
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
    <main className="md:py-10 md:max-w-xl h-screen mx-auto">
      <ChatHeader user={data} />
    </main>
  );
}
