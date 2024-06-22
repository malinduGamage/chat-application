import React from 'react'

export const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='p-4 h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20 border border-gray-1' >
                <h1 className='mb-8 text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-800'> ChatApp</span>
                </h1>

                <form>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Username</span>
                        </label>
                        <input type='text' placeholder='username' className='w-full h-10 input input-bordered' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input type='password' placeholder='password' className='w-full h-10 input input-bordered' />
                    </div>
                    <a href='#' className='text-sm text-white hover:underline mt-2 inline-block'>{"Don't"} have an account?</a>
                    <div>
                        <button className='btn btn-block btn-sm my-4'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
