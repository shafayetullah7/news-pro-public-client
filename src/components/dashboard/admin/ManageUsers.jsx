import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxios";
import useUsers from "../../../hooks/useUsers";
import avatar from '../../../assets/user.jpg';

const ManageUsers = () => {
    const {data:users,refetch,isLoading} = useUsers();
    console.log(users);

    const [axiosSecure] = useAxiosSecure();
    const changeType = (email,type) =>{
        const data = {
            type: type,
            email: email,
        };
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.put('/type',data)
                .then(res=>{
                    console.log(res);
                    Swal.fire(
                        'User updated',
                        '',
                        'success'
                      )
                    refetch();
                })
                .catch(err=>{
                    console.log(err);
                })
            } 
          })
        
    }


    return (
        <div >
            <div className="flex justify-between items-center border-b border-b-admin px-5">
                <p className="text-3xl font-bold pb-2 text-admin">Manage Users</p>

            </div>
            {isLoading && <div className="w-fit mx-auto"><span className="loading loading-spinner loading-md"></span></div>}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className="dark:text-white">
                        <th>
                        <label>
                            #
                        </label>
                        </th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 2 */}
                    {users && users.map((user,index)=>{
                        return (
                            <tr key={user._id}>
                                <th>{index+1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                        <div className="rounded-full w-12 h-12">
                                            <img className="w-full h-full object-cover object-center" src={user.photoUrl || avatar} alt="user-image" />
                                        </div>
                                        </div>
                                        <div>
                                        <div className="font-bold dark:text-white">{user.name}</div>
                                        <div className="text-sm opacity-50 dark:text-white">{user.type || 'Unknown type'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="dark:text-white">{user.email}</td>
                                <td>
                                    <div className="flex items-center justify-start flex-wrap gap-2">
                                        <button className={`border border-admin bg-admin active:scale-95 duration-100 ${user?.type==='admin' && 'bg-opacity-70'} text-xs px-3 py-2 rounded-md font-bold text-white`} disabled={user?.type==='admin'} onClick={()=>changeType(user.email,'admin')}>Make Admin</button>
                                        <button className={`border border-instructor bg-instructor active:scale-95 duration-100 ${user?.type==='instructor' && 'bg-opacity-70'} text-xs px-3 py-2 rounded-md font-bold `} disabled={user?.type==='instructor'} onClick={()=>changeType(user.email,'instructor')}>Make Instructor</button>
                                        <button className="border border-student bg-student text-xs px-3 py-2 rounded-md font-bold">View</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            </div>
        </div>
    );
};

export default ManageUsers;