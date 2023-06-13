import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";


const MyClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    const {data:myClasses,isLoading} = useQuery({
        queryKey:['instructor-all-classes',user.email],
        queryFn:async()=>{
            return axiosSecure(`http://localhost:5000/instructor-all-classes-enroll`)
            .then(res=>{
                console.log(res);
                return res.data;
            })
        }
    });

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/instructor-classes/${user.email}`)
    //     .then(res=>{
    //         console.log(res.data)
    //     })
    // },[])

    console.log(myClasses);
    return (
        <div>
            {isLoading && <div className="w-fit mx-auto"><span className="loading loading-spinner loading-md"></span></div>}
        </div>
    );
};

export default MyClasses;