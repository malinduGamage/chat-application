import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const useGetConvo = () => {
    const [loading, setLoading] = useState(false);
    const [convo, setConvo] = useState([]);

    useEffect(() => {
        const getConvo = async () => {
            setLoading(true);
            try {
                const res = await fetch('api/message/private/getChat', {
                    method: 'GET'
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);

                setConvo(data);
                setLoading(false);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConvo();
    }, []);
    return { loading, convo };
};

export default useGetConvo;