import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useSignup from '../../hooks/useSignup'

export const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm: ''
    })

    const { loading, signup } = useSignup()

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(inputs)
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='p-4 h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 border border-gray-1' >
                <h1 className='mb-8 text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-blue-800'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Full Name</span>
                        </label>
                        <input name='fullname' onChange={handleChange} value={inputs.fullname} type='text' placeholder='Full Name' className='w-full h-10 input input-bordered' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Email</span>
                        </label>
                        <input name='email' onChange={handleChange} value={inputs.email} type='text' placeholder='Email' className='w-full h-10 input input-bordered' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input name='password' onChange={handleChange} value={inputs.password} type='password' placeholder='Password' className='w-full h-10 input input-bordered' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Confirm Password</span>
                        </label>
                        <input name='confirm' onChange={handleChange} value={inputs.confirm} type='password' placeholder='Confirm Password' className='w-full h-10 input input-bordered' />
                    </div>
                    <Link to='/Login' className='text-sm text-white hover:underline mt-2 inline-block'>{"Already"} have an account?</Link>

                    <div>
                        <button disabled={loading} className='btn btn-block btn-sm my-4'>
                            {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
