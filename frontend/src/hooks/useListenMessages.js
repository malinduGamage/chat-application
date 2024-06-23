import { useEffect } from 'react'
import { useSocketContext } from '../context/socketContext'
import useConvo from '../zustand/useConvo'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConvo()

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => { setMessages([...messages, newMessage]) })
        return () => { socket?.off('newMessage') }
    }, [socket, setMessages, messages])
}

export default useListenMessages