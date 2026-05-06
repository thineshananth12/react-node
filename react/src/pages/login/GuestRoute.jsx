import {Outlet, useNavigate} from 'react-router-dom'
import { useMe } from '../../queries/userQueries';
const GuestRoute = ()=>{
    const navigate = useNavigate();
    const {data, isLoading, isError} = useMe();
    if(isLoading){
        return (<><h3>Loading.......</h3></>);
    }
    if(data!=undefined){
        navigate('/dashboard');
    }
    return(<Outlet/>)
}
export default GuestRoute;