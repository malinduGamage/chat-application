import useConvo from "../zustand/useConvo"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConvo } = useConvo()

    useEffect(() => {
        const getMessages = async (convoId) => {
            setLoading(true)
            try {
                const response = await fetch(`api/message/getMessages/private/${convoId}`)
                const data = await response.json()
                if (data.error) { throw new Error(data.error) }
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConvo?.id) getMessages(selectedConvo.id)

    }, [selectedConvo?.id, setMessages])

    return { loading, messages }
}

export default useGetMessages