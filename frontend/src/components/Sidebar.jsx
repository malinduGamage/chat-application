import React, { useState } from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import AllPeople from './AllPeople'
import LogoutButton from './LogoutButton'
import { RiAddLargeFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useAuthContext } from '../context/AuthContext'

const Sidebar = () => {
    const { authUser } = useAuthContext()
    const [clicked, setClicked] = useState(false)

    return (
        <div className='bg-slate-800 fixed top-0 left-0 w-[20vw] h-[100vh]'>
            <div className='border-r border-slate-500 p-4 flex flex-col h-full'>
                <div>
                    {!clicked ? <div className={`flex gap-2 items-center bg-slate-600 p-2 py-1 cursor-pointer h-10'`}>
                        <div className={`avatar online`}>
                            <div className="w-10 rounded-full m-2">
                                <img src={authUser.profilepic} alt='' />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='flex gap-3 justify-between'>
                                <p className='font-bold text-gray-200'>{authUser.fullname}</p>
                            </div>

                        </div>
                    </div> : <div className='font-bold text-gray-200'> Add new</div>}
                </div>
                <div>
                </div>
                <div className='divider px-3'></div>
                <div className='flex-grow overflow-y-auto'>
                    {clicked ? <AllPeople setClicked={setClicked} /> : <Conversations />}
                </div>
                <div className='flex items-center justify-between mt-auto'>
                    <LogoutButton />
                    <button
                        onClick={() => setClicked(!clicked)}
                        className="btn btn-circle bg-slate-600">
                        {clicked ? <RxCross1 /> : <RiAddLargeFill />}
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Sidebar