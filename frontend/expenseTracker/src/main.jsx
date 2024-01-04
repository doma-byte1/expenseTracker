import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from './pages/Auth.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard from './pages/DashBoard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/setbudget",
    element: <DashBoard component={'setBudget'}/>,
  },
  {
    path: "/addexpense",
    element: <DashBoard component={'addexpense'}/>,
  },
  {
    path: "/allexpenses",
    element: <DashBoard component={'allexpenses'}/>,
  },
  {
    path: `/viewexpenses/:id`,
    element: <DashBoard component={'viewexpenses'}/>,
  },
  {
    path: `/overview`,
    element: <DashBoard component={'overview'}/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
