import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    return (
        <div>
            <form>
                <input type='text' placeholder='Search' className=' rounded-md input input-bordered' />
                <button className='btn btn-primary'><FaSearch /></button>
            </form>
        </div>
    )
}

export default SearchInput