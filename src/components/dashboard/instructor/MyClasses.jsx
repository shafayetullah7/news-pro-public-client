import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Button, Modal } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { useState } from "react";
import empty from '../../../assets/empty.jpg';


const MyClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    const {data:myClasses,refetch,isLoading} = useQuery({
        queryKey:['instructor-all-classes',user.email],
        queryFn:async()=>{
            return axiosSecure(`https://newspro-server.vercel.app/instructor-all-classes-enroll`)
            .then(res=>{
                console.log(res.data);
                return res.data;
            })
        }
    });

    const [openModal, setOpenModal] = useState(false);
    const [cardData,setCardData] = useState({});

    const handleOpenModal = (cls) => {
        setCardData(cls);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleUpdate = (cls) =>{
        console.log(cls);
        // Navigate(`/dashboard/payment/${cls._id}`);
    }

    

    return (
        <div>
            <Helmet>
                <title>NewsPro | My Classes</title>
            </Helmet>
            <div className="flex justify-between items-center border-b border-b-student px-5">
                <p className="text-3xl font-bold pb-2 text-student">My Classes</p>

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
                                <p className="mt-4"><span className="font-bold">Price: </span>{cardData?.price}</p>
                                <p><span className="font-bold">Instructor: </span>{cardData?.instructorName}</p>
                                <p><span className="font-bold">Instructor Email: </span>{cardData?.instructorEmail}</p>
                                <p><span className="font-bold">Price: </span>{cardData?.price}</p>
                                <p><span className="font-bold">Total Enrolls: </span>{cardData?.totalEnrolls}</p>
                                
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
                            
                        </label>
                        </th>
                        <th>Class Name</th>
                        <th>Total Students</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 2 */}
                    {myClasses && myClasses.map((cls)=>{
                        return (
                            <tr key={cls._id}>
                                <th><AiFillEye className="text-2xl cursor-pointer hover:scale-110 duration-150 active:scale-90 dark:text-white" onClick={()=>handleOpenModal(cls)}></AiFillEye></th>
                                <td className="dark:text-white">
                                    <p className="max-w-[200px] truncate">{cls.className}</p>
                                </td>
                                <td className="dark:text-white">{cls.totalEnrolls}</td>
                                <td className={`dark:text-white ${cls.status==='denied'?'text-red-600':'dark:text-white'}`}>{cls.status}</td>
                                <td>
                                    <div className="flex items-center justify-start flex-wrap gap-2">
                                        <button className={`border border-gray-600 bg-gray-600 active:scale-95 duration-100 ${cls?.status==='approved'?'bg-opacity-70':'active:scale-95 duration-100'} text-xs px-3 py-2 rounded-md font-bold text-white`} disabled={cls?.status==='approved'} onClick={()=>handleUpdate(cls)}>Update</button>
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



export default MyClasses;