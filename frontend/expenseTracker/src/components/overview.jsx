import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { endpoint } from '../../utils/constant';

function overview() {

    const [budget, setBudget] = useState();
    const [expense, setExpense] = useState();
    const [ttl, setTtl] = useState();
    const [margin, setMargin] = useState();
    useEffect(()=>{
        const fetch = async() =>{
            try{
                const data = localStorage.getItem('res');
                const token = JSON.parse(data).data.accessToken;
                    const res = await axios.get(endpoint+'getBudget',{
                        headers:{
                            "authorization": `Bearer ${token}`
                        }
                    })
                    setBudget(res);
                    console.log(res,'res')
                    const resp = await axios.get(endpoint+'getAllExpenses', {
                        headers: {
                          'authorization': `Bearer ${token}`,
                        }
                      });
                      setExpense(resp?.data?.expenses)
                      console.log('resp',resp);
            }catch(err){
                console.log(err);
            }
        }
        fetch();
    },[])
    const handleExpense = () =>{
        const totalAmount = expense?.reduce((accumulator, currentExpense) => {
            return accumulator + currentExpense.amount;
          }, 0);
          return setTtl(totalAmount);
    }
    useEffect(()=>{
        handleExpense();

    },[expense])
    useEffect(()=>{
        setMargin(budget?.data?.monthlyBudget - ttl)
    },[budget, ttl])
  return (
   <div className='bg-white max-w-[900px] w-full max-h-[400px] rounded-2xl h-full flex flex-col items-center justify-center'>
        <div className='flex gap-2 flex-col'>

            <label htmlFor="" className='text-2xl'> budget : </label>
            <input disabled={true} className='text-2xl text-blue-600' defaultValue={budget?.data?.monthlyBudget}  /><br/>

            <label htmlFor=""  className='text-2xl'>expense :</label><br />
            <input disabled={true} className='text-2xl text-blue-600' defaultValue={ttl}  /><br/>
            <label  className='text-2xl' >Margin :</label><br/>
            <input type="text" className='text-2xl text-blue-600' disabled={true} defaultValue={margin}  /><br/>
        </div>
   </div>
  )
}

export default overview;