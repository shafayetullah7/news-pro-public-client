import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxios";
import useUsers from "../../../hooks/useUsers";
import avatar from '../../../assets/user.jpg';
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import empty from '../../../assets/empty.jpg';

const ManageUsers = () => {
    const {data:users,refetch,isLoading} = useUsers();
    console.log(users);

    const [openModal, setOpenModal] = useState(false);
    const [cardData,setCardData] = useState({});

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

    const handleOpenModal = (cls) => {
        setCardData(cls);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div >
            <div className="flex justify-between items-center border-b border-b-admin px-5">
                <p className="text-3xl font-bold pb-2 text-admin">Manage Users</p>

            </div>
            {isLoading && <div className="w-fit mx-auto"><span className="loading loading-spinner loading-md"></span></div>}
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}
                >
                    <div
                    style={{backgroundColor: 'white',width: '80%',maxWidth: '500px',padding: '20px'}}
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-5 mb-5">
                            <div className="w-full">
                                <img className="w-full h-full object-cover object-center" src={cardData?.classImage || empty} alt="" />
                            </div>
                            <div className="w-full">
                                <p className="text-xl font-bold"><span className="font-bold">Class: </span>{cardData?.className}</p>
                                <p className="mt-4"><span className="font-bold">Instructor: </span>{cardData?.instructorName}</p>
                                <p><span className="font-bold">Email: </span>{cardData?.instructorEmail}</p>
                                <p><span className="font-bold">Status: </span>{cardData?.status}</p>
                                <div className="flex justify-between mt-3">
                                    <p><span className="font-bold">Seats: </span>{cardData?.availableSeats}</p>
                                    <p><span className="font-bold">Price: </span>{cardData?.price}</p>
                                </div>
                                
                            </div>
                        </div>
                    <Button
                        sx={{backgroundColor: 'gray',color: 'white',marginTop: '10px','&:hover': {
                            backgroundColor: 'gray',
                          },}}
                        onClick={handleCloseModal}>Close
                    </Button>
                    </div>
                </Modal>
            </div>
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
                    {users && users.map((user)=>{
                        return (
                            <tr key={user._id}>
                                <th><AiFillEye className="text-2xl cursor-pointer hover:scale-110 duration-150 active:scale-90 dark:text-white" onClick={()=>handleOpenModal(user)}></AiFillEye></th>
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