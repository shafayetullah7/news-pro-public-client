import useClasses from "../../../hooks/useClasses";
import empty from '../../../assets/empty.jpg';
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxios";
import Swal from "sweetalert2";
// import axios from "axios";

const ManageClasses = () => {
    const navigate = useNavigate();
    const {data:classes,isLoading,refetch} = useClasses();
    // console.log(classes);

    const [axiosSecure] = useAxiosSecure();

    const [openModal, setOpenModal] = useState(false);
    const [cardData,setCardData] = useState({});

    const handleOpenModal = (cls) => {
        setCardData(cls);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleApprove = (id) =>{
        // console.log(id);
        const update = {status:'approved'};
        // console.log(update);

        axiosSecure.put(`https://newspro-server.vercel.app/classes/${id}/approve`,update)
        .then(()=>{
            // console.log(res);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Class Approved',
                showConfirmButton: false,
                timer: 1500
              })
            refetch();
        })
        .catch(err=>console.log(err))
    }
    
    
    return (
        <div>
            <div className="flex justify-between items-center border-b border-b-admin px-5">
                <p className="text-3xl font-bold pb-2 text-admin">Manage Classes</p>

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
                        <th>Class</th>
                        <th>Class Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 2 */}
                    {classes && classes.map((cls,index)=>{
                        return (
                            <tr key={cls._id}>
                                <th>{index+1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                        <div className="rounded-full w-12 h-12">
                                            <img className="w-full h-full object-cover object-center" src={cls.classImage || empty} alt="user-image" />
                                        </div>
                                        </div>
                                        <div>
                                        <div className="font-bold dark:text-white">{cls.instructorName}</div>
                                        <div className="text-sm opacity-50 dark:text-white">{cls.status || 'Unknown type'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="dark:text-white">{cls.className}</td>
                                <td>
                                    <div className="flex items-center justify-start flex-wrap gap-2">
                                        <button className={`border border-green-600 bg-green-600 active:scale-95 duration-100 ${cls?.status==='approved'?'bg-opacity-70':'active:scale-95 duration-100'} text-xs px-3 py-2 rounded-md font-bold text-white`} disabled={cls?.status==='approved'} onClick={()=>handleApprove(cls?._id)}>Approve</button>
                                        <button className={`border border-red-600 text-white bg-red-600 ${cls?.status==='denied'?'bg-opacity-70':'active:scale-95 duration-100'} text-xs px-3 py-2 rounded-md font-bold `} disabled={cls?.status==='denied'} onClick={()=>navigate(`/dashboard/denyClass/${cls._id}`)}>Deny</button>
                                        <button className="border border-student bg-student text-xs px-3 py-2 rounded-md font-bold" onClick={()=>handleOpenModal(cls)}>View</button>
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

export default ManageClasses;