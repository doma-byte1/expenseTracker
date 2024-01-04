import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { endpoint } from '../../utils/constant';

function AllExpenses() {
    const [expenses , setExpenses] = useState([]);

    useEffect(()=>{
        const fetch = async() =>{
            const data1 = localStorage.getItem('res');
            const token = JSON.parse(data1).data.accessToken;
            try{
            const resp = await axios.get(endpoint+'getAllExpenses', {
                headers: {
                  'authorization': `Bearer ${token}`,
                }
              });
              setExpenses(resp?.data?.expenses)
              console.log(resp);
            } catch(err){
                console.log(err);
            }
        }
        fetch();

    },[])

    useEffect(()=>{
        console.log(expenses);
    },[expenses])
    return (
        <>
        <div className='grid grid-cols-2 gap-[1rem]  overflow-y-auto h-[60%] max-w-[900px] w-full items-center justify-center  rounded-lg'>
        { expenses.map((expenses, index, arr) =>
            <div key={index} className="max-w-sm mx-auto w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{expenses?.category}</h5>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{expenses?.amount}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{expenses?.description}</p>
                <a href={'/viewexpenses/'+`${arr[index]?._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
)}   </div>
        </>
    )
}

export default AllExpenses;