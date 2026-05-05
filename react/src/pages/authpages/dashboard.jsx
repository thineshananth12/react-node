import {useMe} from "./../../queries/userQueries"
const Dashboard = ()=>{
    const { data: user, isLoading } = useMe();
    console.log(user);
    return (<>
        <h1>Dashboard</h1>
    </>);
}
export default Dashboard;