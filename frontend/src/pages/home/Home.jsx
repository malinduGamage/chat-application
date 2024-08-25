import React from 'react'
import Sidebar from '../../components/Sidebar'
import MessageContainer from '../../components/MessageContainer'

export const Home = () => {
    return (
        <div>
            <div>
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    )
}
