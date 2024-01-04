import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { endpoint } from '../../utils/constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function setBudget() {
  const [budget , setBudget] = useState(0);
  const handleChange = (e) =>{
    setBudget(e.target.value);
  }
  const Submit = async() =>{
    try{
      const data = localStorage.getItem('res');
      const token = JSON.parse(data).data.accessToken;
      const res = await axios.post(endpoint+'setBudget',{
        monthlyBudget: budget,
      },{
        headers: {
          'Content-Type': 'application/json',
          'authorization' : `Bearer ${token}`,
        },
      })
      console.log(res)
      toast.info(res?.data?.message);
    }catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=' bg-white max-w-[900px] rounded-lg w-full mx-12 h-[500px] p-8'>
        <h3 className='text-center text-2xl mb-20'>Set a Monthly Budget</h3>
        <div className='flex flex-col mx-auto max-w-[80%] gap-[1rem]'>
        <label htmlFor="lable">Monthly Budget</label>
        <input type="number" className='bg-blue-300 rounded-lg px-2 h-14 text-black' name='lable' onChange={(e) => handleChange(e)} placeholder='30000Rs.'/>
        <button onClick={Submit} className="bg-blue-500 mt-10 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Set Budget</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default setBudget