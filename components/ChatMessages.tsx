import { Suspense } from "react";
import { supabaseServerClient } from "@/utils/supabase/server";
import InitMessage from "@/lib/store/initMessages";
import ListMessages from "./ListOfMessages";
import SkeltonMessage from "./SkeltonMessage";

export default async function ChatMessages() {

    const supabase = supabaseServerClient()
    const { data } = await supabase.from('messages').select("*, users(*)").order('created_at', {ascending: true})

    return (
        <Suspense fallback={<SkeltonMessage/>}>
            <InitMessage message={data || []} />
            <ListMessages/>
        </Suspense>
    )
}