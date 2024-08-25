import useConvo from "../zustand/useConvo"
import { useState } from "react"
import toast from "react-hot-toast"

const useCreateChat = () => {
    const [loading, setLoading] = useState(false)
    const [convo, setConvo] = useState(null)

    const createChat = async (userId) => {
        setLoading(true)
        try {
            const response = await fetch(`api/message/private/createChat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    otherUserId: userId
                })
            })
            const data = await response.json();
            setConvo(data)

        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }
    return { createChat, loading, convo }

}

export default useCreateChat