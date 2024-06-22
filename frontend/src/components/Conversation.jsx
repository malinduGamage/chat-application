import React from 'react'

const Conversation = () => {
    return (
        <>
            <div className='flex gap-2 items-center hover:bg-sky-500 rounded-md p-2 py-1 cursor-pointer'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>Jhon Doe</p>

                    </div>

                </div>
            </div>
            <div>

            </div>
        </>
    )
}

export default Conversation