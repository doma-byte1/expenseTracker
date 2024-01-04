import React, { useEffect, useState } from 'react'
import { endpoint } from '../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function viewExpense() {
    const param = useParams();
    const navigate = useNavigate();
    console.log(param);
    const [editable, setEditable ] = useState(false);
    const [res, setRes] = useState({});
    useEffect(() =>{
        const fetch =async () =>{
            const data = localStorage.getItem('res');
            const token = JSON.parse(data).data.accessToken;
            const response = await axios.get(`${endpoint}/expense/${param.id}`, {
                headers:{
                    "authorization": `Bearer ${token}`
                }
              });
          setRes(response.data);
        }  
        fetch();
    },[])

    const handleEdit = async() =>{
        const data = localStorage.getItem('res');
        const token = JSON.parse(data).data.accessToken;
        try{
        const response = await axios.put(`${endpoint}expenseUpdate/${param.id}`,{
            amount: document.querySelector('#amount').value,
            description: document.querySelector('#desc').value
        }, {
            headers:{
                "authorization": `Bearer ${token}`
            }
          });
         console.log(response);
         toast.info(response?.data.message)
        } catch (err) {
            console.log(err);
        }
    }
    const handleDelete = async() =>{
        const data = localStorage.getItem('res');
        const token = JSON.parse(data).data.accessToken;
        try{
        const response = await axios.delete(`${endpoint}expenseDelete/${param.id}`, {
            headers:{
                "authorization": `Bearer ${token}`
            }
          });
          toast.info(response?.data?.message);
          navigate('/allexpenses')
        }catch(err){
            console.log('err',err);
        }
    }
  return (
    <div className='bg-white h-[50%] min-w-[22rem]'>
         <h3 className='font-bold text-3xl mb-4'>Expense</h3>
        <div className='flex flex-col justify-center min-w-[20rem] gap-[1rem]'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email" >Amount</label>
            <input id='amount' name='email' disabled={!editable} defaultValue={res?.expense?.amount}  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}  placeholder='Enter Email' />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Description</label>
            <input id='desc' name='text' disabled={!editable} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type='text' defaultValue={res?.expense?.description} placeholder='Enter Password' />
            <button onClick={() => setEditable(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-[80%] px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Edit</button>
            <button onClick={handleDelete}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  w-[80%] rounded focus:outline-none focus:shadow-outline" type='submit'>Delete</button>
          { editable && <button onClick={ handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  w-[80%] rounded focus:outline-none focus:shadow-outline" type='submit'>save</button>}
        </div>
        <ToastContainer />
    </div>
  )
}

export default viewExpense;