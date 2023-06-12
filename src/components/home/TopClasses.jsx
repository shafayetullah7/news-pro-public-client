import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxios";

const TopClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {data:topClasses} = useQuery({
        queryKey:['instructors'],
        queryFn:async()=>{
            return axiosSecure('http://localhost:5000/instructors')
            .then(res=>res.data);
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default TopClasses;