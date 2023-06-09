// import { useQueries } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxios";

const useProfile = ()=>{
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    

    const result = useQuery({
        queryKey:[user.email],
        queryFn:async()=>{
            return axiosSecure.get(`http://localhost:5000/users/${user.email}`)
            .then(data=>data.data);
        }
    })
    // console.log(result);
    return result;
}

export default useProfile;