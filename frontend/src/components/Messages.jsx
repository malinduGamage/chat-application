import React from 'react'
import Message from './Message'
import useConvo from '../zustand/useConvo'
import useGetMessages from '../hooks/useGetMessages'
import MessageSkeleton from './MessageSkeleton'
import { useEffect, useRef } from 'react'
import useListenMessages from '../hooks/useListenMessages'

const Messages = () => {
    const { loading } = useGetMessages()
    const { messages } = useConvo()
    const lastMessageRef = useRef()
    useListenMessages()

    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
            }
        }, 100)
    }, [messages])


    return (
        <div className='p-4 flex-1 overflow-auto'>
            {loading && [...Array(5)].map((_, index) => <MessageSkeleton key={index} />)}
            {!loading && messages.length === 0 && (<p className='text-center text-white'>Send a message to start a conversation</p>)}
            {!loading && messages.length > 0 && messages.map((message, index) => (
                <div key={message.id} ref={lastMessageRef}>
                    <Message
                        message={message}
                    />
                </div>
            ))
            }
        </div>
    )
}

export default Messages