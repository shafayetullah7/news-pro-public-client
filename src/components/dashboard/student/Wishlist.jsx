import { useQuery } from "@tanstack/react-query";
// import useProfile from "../../../hooks/useProfile";
import useAxiosSecure from "../../../hooks/useAxios";
// import useAuth from "../../../hooks/useAuth";
import { Button, Modal } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import empty from '../../../assets/empty.jpg';
import Swal from "sweetalert2";

const Wishlist = () => {
    // const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data:wishlist,refetch} = useQuery({
        queryKey:['wishlist'],
        queryFn:async()=>{
            return axiosSecure.get(`/wishlist`)
            .then(res=>{
                return res.data;
            })
        }
    })
    console.log(wishlist)

    // const navigate = useNavigate();
    // console.log(classes);

    const [openModal, setOpenModal] = useState(false);
    const [cardData,setCardData] = useState({});

    const handleOpenModal = (wish) => {
        setCardData(wish);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleEnroll = (wish) =>{
        console.log(wish);
    }

    const handleRemove = (wish) =>{
        console.log(wish);
        Swal.fire({
            title: 'Are you sure?',
            icon:'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,remove',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            //   navigate('/login',{state:{from:location}});
                axiosSecure.delete(`http://localhost:5000/enrollments/${wish._id}`)
                .then(()=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class removed from wishlist',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    refetch();
                })
                .catch((err)=>{
                    console.log(err);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to remove!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                })
            } 
          })
    }


    return (
        <div>
            <div className="flex justify-between items-center border-b border-b-student px-5">
                <p className="text-3xl font-bold pb-2 text-student">My Wishlist</p>

            </div>
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
                                <p><span className="font-bold">Date of Wish: </span>{cardData?.date}</p>
                                <p><span className="font-bold">Status: </span>{cardData?.enrollStatus}</p>
                                {/* <div className="flex justify-between mt-3">
                                    <p><span className="font-bold">Seats: </span>{cardData?.availableSeats}</p>
                                    <p><span className="font-bold">Price: </span>{cardData?.price}</p>
                                </div> */}
                                
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
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 2 */}
                    {wishlist && wishlist.map((wish)=>{
                        return (
                            <tr key={wish._id}>
                                <th><AiFillEye className="text-2xl cursor-pointer hover:scale-110 duration-150 active:scale-90 dark:text-white" onClick={()=>handleOpenModal(wish)}></AiFillEye></th>
                                <td className="dark:text-white">
                                    {wish.className}
                                </td>
                                <td className="dark:text-white">${wish.price}</td>
                                <td>
                                    <div className="flex items-center justify-start flex-wrap gap-2">
                                        <button className={`border border-green-600 bg-green-600 active:scale-95 duration-100 ${wish?.enrollStatus==='enrolled'?'bg-opacity-70':'active:scale-95 duration-100'} text-xs px-3 py-2 rounded-md font-bold text-white`} disabled={wish?.enrollStatus==='enrolled'} onClick={()=>handleEnroll(wish)}>Enroll</button>
                                        <button className={`border border-red-600 text-white bg-red-600 ${wish?.enrollStatus==='enrolled'?'bg-opacity-70':'active:scale-95 duration-100'} text-xs px-3 py-2 rounded-md font-bold `} disabled={wish?.enrollStatus==='denied'} onClick={()=>handleRemove(wish)}>Remove</button>
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

export default Wishlist;