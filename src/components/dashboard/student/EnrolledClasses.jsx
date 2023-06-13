import { AiFillEye } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import empty from '../../../assets/empty.jpg';

const EnrolledClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    // console.log(classes);

    const [openModal, setOpenModal] = useState(false);
    const [cardData,setCardData] = useState({});

    const handleOpenModal = (enroll) => {
        setCardData(enroll);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const {data:enrolledClasses} = useQuery({
        queryKey:['enrolledClasses'],
        queryFn:async()=>{
            return axiosSecure('http://localhost:5000/enrolled-classes')
            .then(result=>{
                // console.log(result.data);
                return result.data;
            })
        }
    })
    return (
        <div>
            <Helmet>
                <title>NewsPro | Enrolled Classes</title>
            </Helmet>
            <div className="flex justify-between items-center border-b border-b-student px-5">
                <p className="text-3xl font-bold pb-2 text-student">My enrolled Classes</p>
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
                                <p><span className="font-bold">Date of enroll: </span>{cardData?.paymentDate}</p>
                                <p><span className="font-bold">Transaction Id: </span>{cardData?.transactionId}</p>
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
                        <th>Transaction Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 2 */}
                    {enrolledClasses && enrolledClasses.map((enroll)=>{
                        return (
                            <tr key={enroll._id}>
                                <th><AiFillEye className="text-2xl cursor-pointer hover:scale-110 duration-150 active:scale-90 dark:text-white" onClick={()=>handleOpenModal(enroll)}></AiFillEye></th>
                                <td className="dark:text-white">
                                    {enroll.className}
                                </td>
                                <td className="dark:text-white">{new Date(enroll.paymentDate).toISOString().substring(0, 10)}</td>
                                <td className="dark:text-white">{enroll.enrollStatus}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            </div>
        </div>
    );
};

export default EnrolledClasses;