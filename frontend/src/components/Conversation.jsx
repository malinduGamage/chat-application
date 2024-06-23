import React from 'react'
import useConvo from '../zustand/useConvo'

const Conversation = ({ conversation, lastIndex }) => {
    const { selectedConvo, setSelectedConvo } = useConvo()
    const isSelected = selectedConvo?.id === conversation.id
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded-md p-2 py-1 cursor-pointer' ${isSelected ? "bg-sky-500" : ""}`} onClick={() => setSelectedConvo(conversation)}>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={conversation.profilePic} alt='' />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullname}</p>
                    </div>

                </div>
            </div>
            <div>

            </div>
            {!lastIndex && <div className='divider divider-info my-0 py-0 h1'></div>}
        </>
    )
}

export default Conversation