import { useQuery } from "@tanstack/react-query";
import Banner from "../shared/Banner";
import useAxiosSecure from "../../hooks/useAxios";
import { Fade } from "react-awesome-reveal";
import { AiFillPlusCircle } from "react-icons/ai";
import useProfile from "../../hooks/useProfile";

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

    const {data:profile} = useProfile();

    console.log(classes);

    return (
        <div>
            <Banner image='https://i.postimg.cc/JhPN1v6q/classes.jpg' title='All Classes'></Banner>
            <div className="mt-44 lg:px-24">
                {classes && <div className="grid md:grid-cols-3 gap-x-5 gap-y-20 grid-cols-1 justify-items-center">
                    {classes.map(cls=><Fade delay={200} duration={2000} key={cls._id}>
                        <div className=" border h-[400px] p-3 shadow-xl rounded-xl relative w-full sm:w-[300px] dark:text-white">
                            <img src={cls.classImage} className="h-[200px] object-cover object-top w-full rounded-lg" alt="" />
                            <div className="w-full relative">
                                <h1 className="text-lg h-[70px] pt-3 font-bold">{cls.className}</h1>
                                <p className="mt-3 text-sm"><span className="font-bold">Instructor :</span>{cls.instructorName}</p>
                                <p><span className="font-bold">Seats:</span>{cls.availableSeats}</p>
                                <p><span className="font-bold">Price:</span>{cls.price}</p>
                            </div>
                            <div className="tooltip tooltip-bottom absolute bottom-3  right-3 w-fit" data-tip="Add to Wishlist">
                            <button className={`text-primary dark:text-blue-400 text-7xl  block w-fit ${(profile?.type==='instructor' || profile?.type==='admin')?'opacity-50':'hover:scale-110 duration-200 active:scale-90'}`} disabled={profile?.type==='instructor' || profile?.type==='admin'}><AiFillPlusCircle></AiFillPlusCircle></button>
                            </div>
                            
                        </div>
                        
                    </Fade>)}
                </div>}
                
            </div>
        </div>
    );
};

export default Classes;