import React, { useEffect } from 'react'
import useConvo from '../zustand/useConvo'
import useCreateChat from '../hooks/useCreateChat'

const Person = ({ onlineUsers, person, lastIndex, setClicked }) => {
    const { setSelectedConvo } = useConvo()
    const isOnline = onlineUsers.includes(String(person.id))
    const { createChat, convo } = useCreateChat()
    useEffect(() => {
        if (convo) {
            setClicked(false)
            setSelectedConvo(convo)
        }

    }, [convo])


    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-teal-800 p-2 py-1 cursor-pointer h-10' `}
                onClick={() => {
                    createChat(person.id)
                }}>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-10 rounded-full m-2">
                        <img src={person.profilepic} alt='' />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{person.fullname}</p>
                    </div>

                </div>
            </div>
            <div>

            </div>
            {!lastIndex && <div className='divider my-0 py-0 h-[1px] bg-gray-500'></div>}
        </>
    )
}

export default Person