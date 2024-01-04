import React, { useState} from 'react'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { endpoint } from '../../utils/constant';

function AuthComponent({authState}) {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setData({
            ...data,
            [name]: value,
        })
    }
    
    const handleSubmit = async ()=>{
        try{
        const res = await axios.post(endpoint+authState,{
            email:data.email,
            password: data.password
          })
         if(authState === 'login'){
            localStorage.setItem('res', JSON.stringify(res));
            navigate('/setbudget')
            toast.info(res.data.message);
         } else{
            toast.info(res.data.message);
         }
        }catch(err){
            console.log(err)
            toast.info('user already exist')
        }
    }
  return (
    <div className='bg-white min-h-[32rem] min-w-[30rem] shadow-md rounded flex items-center justify-center flex-col'> 
       <h3 className='font-bold text-3xl mb-4'>{authState=='signup'? "Sign Up": "Login"}</h3>
        <div className='flex flex-col justify-center min-w-[20rem] gap-[1rem]'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email" >Email</label>
            <input name='email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handleChange(e)} placeholder='Enter Email' />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handleChange(e)} type='password' placeholder='Enter Password' />
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>submit</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default AuthComponent;