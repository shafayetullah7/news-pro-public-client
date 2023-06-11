import { useQuery } from "@tanstack/react-query";
import useProfile from "../../../hooks/useProfile";

const Wishlist = () => {
    const {data:profile} = useProfile();
    const {data:wishlist} = useQuery({
        queryKey:['wishlist'],
        queryFn:()=>{
            
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default Wishlist;