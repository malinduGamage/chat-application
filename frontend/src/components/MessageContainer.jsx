import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import useConvo from '../zustand/useConvo'
import { useAuthContext } from '../context/AuthContext'

const MessageContainer = () => {
    const { selectedConvo, setSelectedConvo } = useConvo()

    useEffect(() => {
        //cleanup
        return () => {
            setSelectedConvo(null)
        }
    }, [setSelectedConvo])

    return (
        <div className='fixed top-0 left-[20vw] w-[80vw] h-[100vh]'>
            {selectedConvo ? (<>
                {/* Header */}
                <div className='fixed top-0 left-[20vw] w-[80vw] bg-slate-800 px-4 py-2 mb-2 h-[5vh] z-10'>
                    <span className='text-white font-light text-xl'>{selectedConvo.fullname}</span>
                </div>
                <div className='fixed top-[5vh] left-[20vw] w-[80vw] h-[90vh] overflow-y-auto bg-slate-600'>
                    <Messages />
                </div>
                <div className='fixed bottom-0 left-[20vw] w-[80vw]'>
                    <MessageInput />
                </div>


            </>) : (
                <NoChatSelected />
            )}
        </div>
    )
}

export default MessageContainer

const NoChatSelected = () => {
    const { authUser } = useAuthContext()
    return (
        <div className='fixed top-0 left-[20vw] w-[80vw] h-[100vh] bg-slate-600 flex items-center justify-center'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullname} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>

    );
};