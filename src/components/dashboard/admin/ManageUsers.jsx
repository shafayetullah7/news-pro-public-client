import useUsers from "../../../hooks/useUsers";

const ManageUsers = () => {
    const {data:users} = useUsers();
    console.log(users);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
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
                                            <img className="w-full h-full object-cover object-center" src={user.photoUrl} alt="user-image" />
                                        </div>
                                        </div>
                                        <div>
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-sm opacity-50">{user.type || 'Unknown type'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="flex items-center justify-start flex-wrap gap-2">
                                        <button className="border border-admin bg-admin text-xs px-3 py-2 rounded-md font-bold text-white">Make Admin</button>
                                        <button className="border border-instructor bg-instructor text-xs px-3 py-2 rounded-md font-bold ">Make Instructor</button>
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