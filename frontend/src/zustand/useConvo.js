import { create } from 'zustand';

const useConvo = create((set) => ({
    selectedConvo: null,
    setSelectedConvo: (selectedConvo) => set({ selectedConvo }),
    messages: [],
    setMessages: (messages) => set({ messages }),

}));

export default useConvo;