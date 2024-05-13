import { create } from "zustand";

interface MessageProps {
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
    message: MessageProps[],
    actionMsg: MessageProps | undefined,
    addMessage: (message: MessageProps) => void,
    addActionMsg: (message: MessageProps) => void,
    deleteMsg: (messageId: number) => void

}

export const useMessageStore = create<MessageState>()((set) => ({
    message: [],
    actionMsg: undefined,
    addMessage: (message) => set((state) => ({message: [...state.message, message]})),
    addActionMsg: (message) => set((state) => ({actionMsg: message})),
    deleteMsg: (messageId) => set((state) => {
        return {
            message: state.message.filter((element) => element.id !== messageId)
        }
    }),
}))

export type {MessageProps}