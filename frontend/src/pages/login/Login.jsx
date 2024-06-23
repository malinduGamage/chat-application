import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useLogin from '../../hooks/useLogin'

export const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const { loading, login } = useLogin()

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(user)
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='p-4 h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 border border-gray-1' >
                <h1 className='mb-8 text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-800'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>email</span>
                        </label>
                        <input name='email' onChange={handleChange} value={user.email} type='text' placeholder='email' className='w-full h-10 input input-bordered' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input name='password' onChange={handleChange} value={user.password} type='password' placeholder='password' className='w-full h-10 input input-bordered' />
                    </div>
                    <Link to='/SignUp' className='text-sm text-white hover:underline mt-2 inline-block'>{"Don't"} have an account?</Link>
                    <div>
                        <button disabled={loading} className='btn btn-block btn-sm my-4'>
                            {loading ? <span className='loading loading-spinner'></span> : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
