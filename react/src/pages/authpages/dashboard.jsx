import {useMe} from "../../queries/userQueries"
const Dashboard = ()=>{
    const { data: user, isLoading } = useMe();
    return (<>
        <h1>Welcome {user?.name}</h1>
    </>);
}
export default Dashboard;