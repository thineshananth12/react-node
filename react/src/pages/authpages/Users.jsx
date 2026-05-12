import { useEffect, useMemo, useState } from "react";
import {userList} from "../../queries/userQueries";
import { NavLink, Outlet } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
const Users = ()=>{
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState(0);
    const status = {
        false: "Active",
        true: "In-active"
    };
    const { data: user, isLoading } = userList(page, 10, filter);
    const columns = useMemo(
        ()=>[
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "status",
                header: "Status",
            },
        ]
    );
    
    const table = useReactTable({
        data: user || [],
        columns,
        getCoreRowModel:
        getCoreRowModel(),
    });
  return (
  <div className="p-5">

    <h3 className="text-2xl font-bold mb-5">
      Manage Users
    </h3>
    <div>
         <NavLink to="/create-users"> Create User</NavLink>
    </div>
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <div>
         <select name="users" onChange={(e) => setFilter(e.target.value)}>
            <option value="0"> Active</option>
            <option value="1"> Inactive</option>
         </select>
      </div>  
      <table className="w-full border-collapse">

        <thead className="bg-gray-100">

          <tr>
            {
                columns.map((index, key)=>{
                    return <th className="border p-3 text-left" key={key}>{index?.header}</th>
                })
            }
           
          </tr>

        </thead>

        <tbody>
            
              {
                user?.status==201 && user?.data?.pagination?.totalRecords>0 ? (
                    user?.data?.data.map((index,key)=>{
                       return <tr key={key}><td>{index?.name}</td><td>{index?.email}</td><td>{status[index?.is_deleted]}</td></tr>
                    })
                    
                ): (
                    <tr>
                        <td colSpan={3} className="text-center p-5">
                        No users found
                        </td>
                    </tr>
                    )
                
              }               
       
         

        </tbody>

      </table>
      {
        user?.data?.pagination?.totalPages ? (
            <div className="flex gap-3 mt-4">
                
                <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="border px-3 py-1"
                >
                Prev 
                </button>
                <span>
                Page {page} of {user?.data?.pagination?.totalPages}
                </span>
                <button
                disabled={page === user?.data?.pagination?.totalPages}
                onClick={() => setPage(page + 1)}
                className="border px-3 py-1"
                >
                Next
                </button>
            </div>
        ):''
      }
      
    </div>

  </div>
);

}
export default Users;