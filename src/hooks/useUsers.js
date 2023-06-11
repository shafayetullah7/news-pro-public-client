// import { useQueries } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth"
import useAxiosSecure from "./useAxios";

const useUsers = ()=>{
    // const {user} = useAuth(
    const [axiosSecure] = useAxiosSecure();
    

    const result = useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            return axiosSecure.get(`https://newspro-server.vercel.app/users`)
            .then(data=>data.data);
        }
    })
    // console.log(result);
    return result;
}

export default useUsers;