import { create } from "zustand";

interface MessageType {
    content: string;
    created_at: string;
    id: number;
    is_edit: boolean;
    user_id: string;
    users: {
        avatar_url: string;
        created_at: string;
        id: string;
        username: string;
    } | null
}

interface MessageState {
    message: MessageType[],
    addMessage: (message: MessageType) => void

}

export const useMessageStore = create<MessageState>()((set) => ({
    message: [],
    addMessage: (message) => set((state) => ({message: [...state.message, message]}))
}))

export type {MessageType}