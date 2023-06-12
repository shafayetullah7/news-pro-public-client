import { useQuery } from "@tanstack/react-query";
import Banner from "../shared/Banner";
import useAxiosSecure from "../../hooks/useAxios";
import { Fade } from "react-awesome-reveal";
import { AiFillPlusCircle } from "react-icons/ai";
import useProfile from "../../hooks/useProfile";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Classes = () => {
    const [axiosSecure] = useAxiosSecure();
    const {data:classes} = useQuery({
        queryKey:['classes','approved'],
        queryFn:async()=>{
            return axiosSecure('/classes/approved')
            .then(res=>{
                return res.data;
            })
        }
    });

    const {user} = useAuth();
    const {data:profile} = useProfile();
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(classes);

    const handleWish = (cls) =>{
        // console.log(cls)
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
                <title>NewsPro | Classes</title>
            </Helmet>
            <Banner image='https://i.postimg.cc/JhPN1v6q/classes.jpg' title='All Classes'></Banner>
            <div className="mt-44 lg:mx-24">
                {classes && <div className="grid md:grid-cols-3 gap-y-20 grid-cols-1 justify-items-center">
                    {classes.map(cls=><Fade delay={200} duration={2000} key={cls._id}>
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
                </div>}
                
            </div>
        </div>
    );
};

export default Classes;