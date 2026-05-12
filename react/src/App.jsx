import React,{ useState, Suspense } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sidebar = React.lazy(()=>import("./component/Sidebar"));
const Login = React.lazy(()=>import('./pages/login/Login'));
const Dashboard = React.lazy(()=>import('./pages/authpages/Dashboard'));
const Users = React.lazy(()=>import('./pages/authpages/Users'));
const PersonalProfile = React.lazy(()=>import('./pages/authpages/PersonalProfile'));
const BusinessProfile = React.lazy(()=>import('./pages/authpages/BusinessProfile'));
const Settings = React.lazy(()=>import('./pages/authpages/Settings'));
const NewUser = React.lazy(()=>import('./pages/authpages/NewUser'));
const ProtectedRoute = React.lazy(()=>import('./pages/authpages/ProtectedRoute'));
const GuestRoute = React.lazy(()=>import('./pages/login/GuestRoute'));
const ChatbotComponent = React.lazy(()=>import('./component/ChatbotComponent'));

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <ToastContainer />
    <Suspense fallback="Loading...">
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Sidebar />}>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/users' element={<Users/>} />
             <Route path='/personal-profile' element={<PersonalProfile/>} />
             <Route path='/chatbot' element={<ChatbotComponent/>} />
             
             <Route path='/business-profile' element={<BusinessProfile/>} />
             <Route path='/settings' element={<Settings />} />
             <Route path='/create-users' element={<NewUser />} />
          </Route>
          
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
