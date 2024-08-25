import React from 'react'
import Conversation from './Conversation'
import useGetConvo from '../hooks/useGetConvo'

const Conversations = () => {
    const { loading, convo } = useGetConvo()

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {convo.map((conversation, index) => (
                <Conversation
                    key={conversation.id}
                    conversation={conversation}
                    lastIndex={index === convo.length - 1}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}

export default Conversations