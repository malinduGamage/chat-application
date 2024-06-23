import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const signup = async ({ fullname, email, password, confirm }) => {
        const success = handleInput({ fullname, email, password, confirm });
        if (!success) { return; }

        setLoading(true);
        try {
            const res = await fetch('api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, email, password, confirm }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            //local storage
            localStorage.setItem('chat-user', JSON.stringify(data.data));
            //comtext
            setAuthUser(data.data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup };
}

export default useSignup;

function handleInput({ fullname, email, password, confirm }) {

    if (!fullname || !email || !password || !confirm) {
        toast.error('Please fill all fields');
        return false;
    }
    if (password !== confirm) {
        toast.error('Passwords do not match');
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }
    return true;
}