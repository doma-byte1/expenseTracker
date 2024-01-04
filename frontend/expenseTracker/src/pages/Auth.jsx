import React, { useState } from 'react'
import AuthComponent from '../components/AuthComponent';

function Auth() {
  const [authState, setAuthState] = useState('signup')
  return (
    <>
      <div className='h-[100vh] w-[100vw] bg-blue-700 flex items-center justify-center flex-col'>
        <AuthComponent authState={authState}/>
        {
            authState==='signup' ? <div className='text-white mt-[10px]'>
                Already have Account? <span onClick={()=>setAuthState('login')} className='text-xl text-blue-300 cursor-pointer'>Login</span>
            </div>
            : 
            <div className='text-white mt-[10px]'>
                Do not have account? <span className='text-xl text-blue-300 cursor-pointer' onClick={()=> setAuthState('signup')}>Signup</span>
            </div>
        }
      </div>
    </>
  )
}

export default Auth;