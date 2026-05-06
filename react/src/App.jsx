import React,{ useState, Suspense } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'

const Login = React.lazy(()=>import('./pages/login/Login'));
const Dashboard = React.lazy(()=>import('./pages/authpages/dashboard'));
const ProtectedRoute = React.lazy(()=>import('./pages/authpages/ProtectedRoute'));
const GuestRoute = React.lazy(()=>import('./pages/login/GuestRoute'));
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Suspense for="Loading...">
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route element={<GuestRoute />}>
           <Route path="/login" element={<Login />} />
           <Route path="/" element={<Login />} />
        </Route>
        
      </Routes>
      </BrowserRouter>
      
    </Suspense>
    </>
  )
}

export default App
