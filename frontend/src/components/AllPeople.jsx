import React from 'react'
import useGetPeople from '../hooks/useGetPeople'
import { useSocketContext } from '../context/socketContext'
import Person from './Person'

const AllPeople = ({ setClicked }) => {

    const { onlineUsers } = useSocketContext()
    const { people, loading } = useGetPeople()

    people.sort((a, b) => {
        const isAInB = onlineUsers.indexOf(a.userId);
        const isBInB = onlineUsers.indexOf(b.userId);

        if (isAInB && !isBInB) {
            return -1; // a should come before b
        } else if (!isAInB && isBInB) {
            return 1; // b should come before a
        } else {
            return 0; // maintain original order if both are in B or both are not
        }
    });


    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {people.map((person, index) => (
                <Person
                    onlineUsers={onlineUsers}
                    setClicked={setClicked}
                    key={person.id}
                    person={person}
                    lastIndex={index === people.length - 1}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}

export default AllPeople