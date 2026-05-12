import { useEffect, useRef, useState } from "react";
import {useSaveMe} from './../../queries/userQueries'
const NewUser = ()=>{
    const [userdetails, setUserDetails] = useState({name:'',email:'',password:''});
    const focus = useRef();
    const saveUserMutation = useSaveMe();
    useEffect(()=>{
        focus.current.focus();
    },[])
    const handleOnchange = (e)=>{
        setUserDetails({...userdetails,[e.target.name]:e.target.value});
    }
const handleSubmit = (e)=>{
    e.preventDefault();
    saveUserMutation.mutate(userdetails,{
        // onSuccess: ()=>{
        //     navigate('/dashboard');
        // }
    })
}
 return (<>
    <div><h3> New User</h3></div>
    <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
            <label>Name:</label><input ref={focus} name="name" type="text" onChange={handleOnchange} value={userdetails?.name}></input>
        </div>
        <div>
            <label>Email:</label><input name="email" type="text" autoComplete="new-email" onChange={handleOnchange} value={userdetails?.email}></input>
        </div>
        <div>
            <label>Password:</label><input name="password" autoComplete="new-password" type="password" onChange={handleOnchange} value={userdetails?.password}></input>
        </div>
        <button type="submit">Submit</button>
    </form>
 </>)
}
export default NewUser;