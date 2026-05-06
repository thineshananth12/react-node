import { Outlet, useNavigate } from "react-router-dom";
import {useMe} from "./../../queries/userQueries";
const ProtectedRoute = ()=>{
    const {data, isLoading, isError} = useMe();
    const navigate = useNavigate();
    if(isLoading){
        return (<><h3>Loading.......</h3></>);
    }
    if(isError){
        navigate('/');
    }
    return <Outlet/>
}
export default ProtectedRoute;