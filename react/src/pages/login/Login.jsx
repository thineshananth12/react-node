import { useRef, useState,useEffect } from "react";
import {useLoginUser} from './../../queries/userQueries'
import { Navigate, useNavigate } from "react-router-dom";
const Login = ()=>{
    const [formDetails, setformDetails] = useState({email:'',password:''});
    const navigate = useNavigate();
    const loginMutation = useLoginUser();
    const focus = useRef();
    useEffect(()=>{
        focus.current.focus();
    },[])
    const handleSave = ()=>{
        const token = loginMutation.mutate(formDetails,{
            onSuccess: ()=>{
               navigate('/dashboard');
            }
        });
    }
    const inputChange = (e)=>{
       setformDetails({...formDetails,[e.target.name]:e.target.value});
    }
    return (<>
    <form autoComplete="off">
        <div>
            <label>Email:</label><input ref={focus} onChange={inputChange} type="text" name="email"  placeholder="Email Id" autoComplete="new-email" value={formDetails?.email}></input>
        </div>
        <div>
            <label>Password:</label><input type="password" onChange={inputChange} name="password" placeholder="Enter Password" autoComplete="new-password" value={formDetails?.password}></input>
        </div>
        <div>
            <button type="button" onClick={handleSave}>Login</button>
        </div>
    </form>
    
    </>)
}
export default Login;