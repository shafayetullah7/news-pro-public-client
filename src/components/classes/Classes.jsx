import { useQuery } from "@tanstack/react-query";
import Banner from "../shared/Banner";
import useAxiosSecure from "../../hooks/useAxios";
import { Fade } from "react-awesome-reveal";
import { AiFillPlusCircle } from "react-icons/ai";

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

    console.log(classes);

    return (
        <div>
            <Banner image='https://i.postimg.cc/JhPN1v6q/classes.jpg' title='All Classes'></Banner>
            <div className="mt-44 lg:px-24">
                {classes && <div className="grid lg:grid-cols-4 gap-10 grid-cols-1">
                    {classes.map(cls=><Fade delay={200} duration={2000} key={cls._id}>
                        <div className="w-full border h-[400px] p-3 shadow-xl rounded-xl relative ">
                            <img src={cls.classImage} className="h-[200px] object-cover object-center w-full rounded-lg" alt="" />
                            <div className=" min-h-[50px] border-b">
                                <h1 className="text-lg font-bold">{cls.className}</h1>
                                
                            </div>
                            <button className="text-primary text-5xl absolute -bottom-6 left-1/2 -translate-x-1/2 block w-fit hover:scale-110 duration-200 active:scale-90"><AiFillPlusCircle></AiFillPlusCircle></button>
                        </div>
                        
                    </Fade>)}
                </div>}
                
            </div>
        </div>
    );
};

export default Classes;