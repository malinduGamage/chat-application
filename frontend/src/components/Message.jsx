import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import useConvo from '../zustand/useConvo'
import { extractTime } from '../utils/extractTime'

const Message = ({ message }) => {
    const { authUser } = useAuthContext()
    const { selectedConvo } = useConvo()
    const time = extractTime(message.createdAt)
    const fromMe = message.userID === authUser.id
    const chatClass = fromMe ? 'chat chat-end' : 'chat chat-start'
    const profilepic = fromMe ? authUser.profilepic : selectedConvo.profilepic
    const bubbleClass = fromMe ? 'chat-bubble bg-slate-800' : 'chat-bubble bg-blue-600 text-black'

    return (
        <div>
            <div className={`chat ${chatClass}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="" src={profilepic} />
                    </div>
                </div>

                <div className={`chat-bubble ${bubbleClass} text-white pb-2`}>{message.message}</div>
                <div className="chat-footer"><time className="text-xs opacity-50"> {time}</time></div>
            </div>
        </div>
    )
}

export default Message