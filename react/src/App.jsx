import React,{ useState, Suspense } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
const Login = React.lazy(()=>import('./pages/login/Login'));
const Dashboard = React.lazy(()=>import('./pages/authpages/dashboard'));
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Suspense for="Loading...">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
      
    </Suspense>
    </>
  )
}

export default App
