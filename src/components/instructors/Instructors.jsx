import { Helmet } from "react-helmet-async";
import Banner from "../shared/Banner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxios";
import { Fade, Zoom } from "react-awesome-reveal";
import { AiFillPlusCircle } from "react-icons/ai";
import useProfile from "../../hooks/useProfile";
// import { Cancel } from "@mui/icons-material";
import { MdOutlineCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Instructors = () => {
    const [axiosSecure] = useAxiosSecure();
    const [currnet,setCurrent] = useState('')
    // const [instructorClasses,setInstructorClasses] = useState();
    const {user} = useAuth();
    const {data:profile} = useProfile();
    const {data:instructors} = useQuery({
        queryKey:['instructors'],
        queryFn:async()=>{
            return axiosSecure('https://newspro-server.vercel.app/instructors')
            .then(res=>res.data);
        }
    })

    const {data:instructorClasses,isLoading} = useQuery({
        queryKey:['instructorClasses',currnet],
        queryFn:async()=>{
            // console.log('here');
            if(currnet){
                // console.log('here2');
                return axiosSecure(`https://newspro-server.vercel.app/instructor-classes/${currnet}`)
                .then(res=>{
                    return res.data[0];
                })
            }
            else return null;
        }
    })

    const navigate = useNavigate();
    // console.log(instructors)
    // useEffect(()=>{
    //     console.log(currnet);
    // },[currnet]);
    // console.log(instructorClasses);

    const fetchInstructorClasses = instructor =>{
        setCurrent(instructor.email);
    }
    const handleClose = () =>{
        setCurrent('');
    }

    const handleWish = (cls) =>{
        console.log(cls);
        console.log(user || 'no user');
        console.log(profile || 'no profile');

        if(!user){
            Swal.fire({
                title: 'Login First',
                text:'You must login to wishlist a class',
                icon:'info',
                showCancelButton: true,
                confirmButtonText: 'Login',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  navigate('/login',{state:{from:location}});
                } 
              })
        }
        else if(!profile){
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Try again',
                showConfirmButton: false,
                timer: 1500
              })
            return;
        }
        let enrollment = {
            classId:cls._id,
            classImage:cls.classImage,
            className:cls.className,
            price:cls.price,
            enrollStatus:'wished',
            userEmail:profile.email,
            date:new Date().toISOString()
        }
        console.log(enrollment);
        axiosSecure.post('/enrollments',enrollment)
        .then(res=>{
            console.log(res);
            if(res.data.exist){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Already wished this item once',
                    text:'You cannot wish/enroll same class multiple times.',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added to wishlist',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
        .catch(err=>{
            console.log(err);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to add to wishlist',
                showConfirmButton: false,
                timer: 1500
              })
        })
    }

    return (
        <div>
            <Helmet>
                <title>NewsPro | Instructors</title>
            </Helmet>
            <div className="mb-5">
                <Banner image='https://i.postimg.cc/KYZ7hxNj/Untitled.jpg' title='All Instructors'></Banner>
            </div>
            {isLoading && <div className="w-fit mx-auto"><span className="loading loading-spinner loading-md"></span></div>}
            {instructorClasses && <Zoom>
                    <div className="bg-gray-200 rounded-2xl my-16 border-4 border-primary relative">
                        <button className="absolute top-8 right-8 hover:text-red-600 hover:scale-110 duration-200 active:scale-90" onClick={handleClose}><MdOutlineCancel className="text-4xl"></MdOutlineCancel></button>
                        <div className="max-h-screen overflow-auto py-16">
                            <div className="flex flex-col justify-center items-center">
                                <img src={instructorClasses.photoUrl} className="w-64 h-64 object-cover object-center rounded-full" alt="" />
                                <p className="text-2xl font-bold text-primary text-center">{instructorClasses.name}</p>
                                <p className="text-xs font-bold text-gray-500  text-center">{instructorClasses.email}</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-y-20 grid-cols-1 justify-items-center mt-5">
                                {instructorClasses?.classes.map(cls=><Fade delay={200} duration={2000} key={cls._id}>
                                    <div className={` border h-[400px] p-3 shadow-xl rounded-xl relative w-[300px] dark:text-white ${cls.availableSeats===0 && 'bg-red-400'}`}>
                                        <img src={cls.classImage} className="h-[200px] object-cover object-top w-full rounded-lg" alt="" />
                                        <div className="w-full relative">
                                            <h1 className="text-lg h-[70px] pt-3 font-bold">{cls.className}</h1>
                                            <p className="mt-3 text-sm"><span className="font-bold">Instructor :</span>{cls.instructorName}</p>
                                            <p><span className="font-bold">Seats:</span>{cls.availableSeats}</p>
                                            <p><span className="font-bold">Price:</span>{cls.price}</p>
                                        </div>
                                        <div className="tooltip tooltip-bottom absolute bottom-3  right-3 w-fit" data-tip="Add to Wishlist">
                                        <button className={`text-primary dark:text-blue-400 text-7xl  block w-fit ${(profile?.type==='instructor' || profile?.type==='admin' || cls.availableSeats===0)?'opacity-50':'hover:scale-110 duration-200 active:scale-90'}`} disabled={profile?.type==='instructor' || profile?.type==='admin' || cls.availableSeats===0} onClick={()=>handleWish(cls)}><AiFillPlusCircle></AiFillPlusCircle></button>
                                        </div>
                                        
                                    </div>
                                    
                                </Fade>)}
                            </div>
                        </div>
                    </div>
                </Zoom>}
            {instructors && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {instructors.map((instructor) => (
                    <div key={instructor.email} className="bg-transparent border text-gray-600 dark:text-white rounded-lg shadow-md p-6">
                    <img src={instructor.photoUrl} alt="Instructor" className="w-32 h-32 rounded-full mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{instructor.name}</h2>
                    <p className=" mb-2">{instructor.email}</p>
                    <p className="mb-2">{instructor.phoneNumber}</p>
                    <p className="mb-2">{instructor.gender}</p>
                    <p className="">{instructor.address}</p>
                    <button className="bg-primary hover:scale-110 duration-200 active:scale-90 text-white font-semibold py-2 px-4 rounded mt-4" onClick={()=>fetchInstructorClasses(instructor)}>
                        See Classes
                    </button>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default Instructors;