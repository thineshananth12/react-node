import { useRef, useState,useEffect } from "react";
import {useLoginUser} from './../../queries/userQueries'
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});
const Login = ()=>{
    const [formDetails, setformDetails] = useState({email:'',password:''});
    const navigate = useNavigate();
    const loginMutation = useLoginUser();
    const focus = useRef();
    // useEffect(()=>{
    //     focus.current.focus();
    // },[])
     const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    // const handleSave = ()=>{
    //     const token = loginMutation.mutate(formDetails,{
    //         onSuccess: ()=>{
    //            navigate('/dashboard');
    //         }
    //     });
    // }
    const onSubmit = (data) => {
        const token = loginMutation.mutate(formDetails,{
            onSuccess: ()=>{
               navigate('/dashboard');
            }
        });
    };
    useEffect(() => {
        setFocus("email");
    }, []);
    const inputChange = (e)=>{
       setformDetails({...formDetails,[e.target.name]:e.target.value});
    }
    return (<>
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Email:</label><input {...register("email")}  onChange={inputChange}  type="text" name="email"  placeholder="Email Id" autoComplete="new-email" value={formDetails?.email}></input>
            <p>{errors.email?.message}</p>
        </div>
        <div>
            <label>Password:</label><input {...register("password")} onChange={inputChange} name="password" placeholder="Enter Password" autoComplete="new-password" value={formDetails?.password}></input>
             <p>{errors.password?.message}</p>
        </div>
        <div>
            <button type="submit" >Login</button>
        </div>
    </form>
    
    </>)
}
export default Login;