import axios from 'axios';
import React, {  useState } from 'react'
import { endpoint } from '../../utils/constant';
import { toast, ToastContainer } from 'react-toastify';

function setBudget() {
  const [data, setData] = useState({
    category: "",
    amount: "",
    description: "",
  })
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    })
  }
  const submit = async() =>{
    try{
      const data1= localStorage.getItem('res');
      const token = JSON.parse(data1).data.accessToken;
        const resp = await axios.post(endpoint+"/createExpense",{
          amount: data?.amount,
          category: data?.category,
          description: data?.description,
        },
        {
          headers:{
            'authorization' : `Bearer ${token}`,
          }
        })
        toast.info(resp?.data?.message);
    }catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=' bg-white max-w-[900px] rounded-lg w-full mx-12 h-[500px] p-8'>
        <h3 className='text-center text-2xl mb-20'>Add an expense</h3>
        <div className='flex flex-col mx-auto max-w-[80%] gap-[1rem]'>
        <label htmlFor="lable">category</label>
        <input type="text" name='category' className='bg-blue-300 rounded-lg px-2 h-14 text-black' onChange={(e) => handleChange(e)} placeholder='hello'/>
        <label htmlFor="lable">Amount</label>
        <input type="number" name="amount" className='bg-blue-300 rounded-lg px-2 h-14 text-black' onChange={(e) => handleChange(e)} placeholder='30000Rs.'/>
        <label htmlFor="lable">Description</label>
        <textarea name="description" className='bg-blue-300 rounded-lg px-2 h-14 text-black' onChange={(e) => handleChange(e)} placeholder='Stating the reason of expense' />
        <button onClick={submit} className="bg-blue-500 mt-10 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add an expense</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default setBudget;