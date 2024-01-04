import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import SetBudget from '../components/setBudget';
import AddExpense from '../components/addExpense.jsx'
import AllExpenses from '../components/AllExpenses.jsx';
import EditExpense from '../components/editExpense.jsx';
import ViewExpense from '../components/viewExpense.jsx';
import Overview from '../components/overview.jsx';
import { useNavigate } from 'react-router-dom';
const DashBoard = ({component}) => {

  const navigate = useNavigate();
  useEffect(()=>{
    let login = localStorage.getItem('res');
    if(!login) return navigate('/');
  },[])
  const Handleroute = () =>{  

    switch(component){
      case 'setBudget': return <SetBudget />
      case 'addexpense': return <AddExpense />
      case 'allexpenses': return <AllExpenses />
      case 'editexpense': return <EditExpense />
      case 'viewexpenses':return <ViewExpense />
      case 'overview':return <Overview />
    }
  }
  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center h-[90%]'>
        <Handleroute component={component} />
      </div>
    </>
  )
}

export default DashBoard;