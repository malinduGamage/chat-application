import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../hooks/useLogout';

const LogoutButton = () => {
    const { loading, logout } = useLogout();
    return (
        <div className='mt-auto'>
            {loading ? (<span className='loading loading-spinner'></span>) :
                (<TbLogout2 onClick={logout} className='w-6 h-6 text-white cursor-pointer' />)
            }
        </div>
    )
}

export default LogoutButton