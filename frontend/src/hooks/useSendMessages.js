import { set } from "mongoose"
import useConvo from "../zustand/useConvo"
import { useState } from "react"
import toast from "react-hot-toast"

const useSendMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages } = useConvo()

    const sendMessage = async (message, convoId) => {
        setLoading(true)
        try {
            const response = await fetch(`api/message/send/private/${convoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    message: message
                })
            })
            const data = await response.json()
            if (data.error) { throw new Error(data.error) }
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }
    return { sendMessage, loading }

}

export default useSendMessages