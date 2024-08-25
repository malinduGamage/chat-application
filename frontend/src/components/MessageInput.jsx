import { React, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import useSendMessages from '../hooks/useSendMessages'
import useConvo from '../zustand/useConvo'

const MessageInput = () => {
    const { sendMessage, loading } = useSendMessages()
    const [message, setMessage] = useState('')
    const { selectedConvo } = useConvo()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim() === '') return
        sendMessage(message, selectedConvo.id)
        setMessage('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='h-[5vh] z-10' >
                <div className='w-full relative'>
                    <input
                        type='text'
                        className='border text-sm font-light block w-full p-2 h-[5vh] bg-slate-800 border-gray-600 text-white'
                        placeholder='Send a message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                        {loading ? <div className='loading loading-spinner'></div> : <IoMdSend />}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageInput