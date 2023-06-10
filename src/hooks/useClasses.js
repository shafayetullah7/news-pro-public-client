import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxios"

const useClasses = () =>{
    const [axiosSecure] = useAxiosSecure();
    const query = useQuery({
        queryKey:['classes'],
        queryFn:()=>{
            return axiosSecure(`http://localhost:5000/classes`)
            .then(data=>{
                return data.data;
            })
        }
    })
    return query;
}

export default useClasses;