import useClasses from "../../../hooks/useClasses";
import empty from '../../../assets/empty.jpg';
import { Button, Modal, TextField, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { AiFillEye } from "react-icons/ai";
// import axios from "axios";

const StyledModal = styled(Modal)`display: flex; align-items: center; justify-content: center;`;
const ModalContainer = styled('div')`background-color: #fff; padding: 20px; border-radius: 4px; outline: none; text-align: center;`;
const Title = styled('h2')`margin-bottom: 20px; color: #884a39;`;
const FeedbackTextField = styled(TextField)`
  margin-bottom: 20px;

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #884a39;
    }
    & input {
      color: #884a39;
    }
    &:hover fieldset {
      border-color: #884a39;
    }
    &.Mui-focused fieldset {
      border-color: #884a39;
    }
  }
`;
const FeedbackButtonContainer = styled('div')`display: flex; justify-content: center; gap: 10px;`;

const ManageClasses = () => {

    const navigate = useNavigate();
    const {data:classes,isLoading,refetch} = useClasses();
    // console.log(classes);

    const [axiosSecure] = useAxiosSecure();

    const [openModal, setOpenModal] = useState(false);
    const [cardData,setCardData] = useState({});
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackClass,setFeedbackClass] = useState();

    const handleFeedbackOpen = (cls) => {
        setFeedbackOpen(true);
        setFeedbackClass(cls);
    };
      
    const handleFeedbackClose = () => {
        setFeedbackOpen(false);
    };
      
    const handleFeedbackSend = () => {
        console.log('Sending feedback:', feedbackText);
        const update = {feedback:feedbackText};
        // console.log(update);

        axiosSecure.put(`http://localhost:5000/classes/${feedbackClass._id}/feedback`,update)
        .then(()=>{
            // console.log(res);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Feedback sent',
                showConfirmButton: false,
                timer: 1500
              })
            refetch();
        })
        .catch(err=>console.log(err))
        setFeedbackText('');
        handleFeedbackClose();
    };

    const handleOpenModal = (cls) => {
        setCardData(cls);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleUpdate = (id,status) =>{
        // console.log(id);
        const update = {status};
        // console.log(update);

        axiosSecure.put(`https://newspro-server.vercel.app/classes/${id}/approve`,update)
        .then(()=>{
            // console.log(res);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Class Updated',
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
                <Button variant="contained" onClick={handleFeedbackOpen}>
                    Open Modal
                </Button>
                <StyledModal open={feedbackOpen} onClose={handleFeedbackClose}>
                    <ModalContainer>
                    <Title>Write Feedback</Title>
                    <FeedbackTextField
                        label="Feedback"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                    <FeedbackButtonContainer>
                        <Button variant="contained" onClick={handleFeedbackSend}>
                        Send Feedback
                        </Button>
                        <Button variant="outlined" onClick={handleFeedbackClose}>
                        Cancel
                        </Button>
                    </FeedbackButtonContainer>
                    </ModalContainer>
                </StyledModal>
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
                        <th></th>
                        <th>Class</th>
                        <th>Instructor</th>
                        <th>Instructor Email</th>
                        <th>Seats</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 2 */}
                    {classes && classes.map((cls,index)=>{
                        return (
                            <tr key={cls._id}>
                                <th><AiFillEye className="text-2xl cursor-pointer hover:scale-110 duration-150 active:scale-90 dark:text-white" onClick={()=>handleOpenModal(cls)}></AiFillEye></th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                        <div className="rounded-full w-12 h-12">
                                            <img className="w-full h-full object-cover object-center" src={cls.classImage || empty} alt="user-image" />
                                        </div>
                                        </div>
                                        <div>
                                        <div className="font-bold dark:text-white w-[150px] truncate">{cls.className}</div>
                                        <div className="text-sm opacity-50 dark:text-white">{cls.status || 'Unknown type'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="dark:text-white">{cls.instructorName}</td>
                                <td className="dark:text-white">{cls.instructorEmail}</td>
                                <td className="dark:text-white">{cls.availableSeats}</td>
                                <td>
                                    <div className="flex items-center justify-start flex-wrap gap-2">
                                        <button className={`border border-green-600 bg-green-600 active:scale-95 duration-100 ${(cls?.status==='approved' || cls?.status==='denied')?'bg-opacity-70':'active:scale-95 duration-100'} text-xs px-3 py-2 rounded-md font-bold text-white`} disabled={(cls?.status==='approved' || cls?.status==='denied')} onClick={()=>handleUpdate(cls?._id,'approved')}>Approve</button>
                                        <button className={`border border-red-600 text-white bg-red-600 ${(cls?.status==='approved' || cls?.status==='denied')?'bg-opacity-70':'active:scale-95 duration-100'} text-xs px-3 py-2 rounded-md font-bold `} disabled={(cls?.status==='approved' || cls?.status==='denied')} onClick={()=>handleUpdate(cls?._id,'denied')}>Deny</button>
                                        <button className={`border gray-red-600 text-white bg-gray-800 text-xs px-3 py-2 rounded-md font-bold `} onClick={()=>handleFeedbackOpen(cls)}>Feedback</button>
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