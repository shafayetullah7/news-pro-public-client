import { useContext } from "react"
import { AuthContext } from "../components/access/AuthProvider"

const useAuth = () =>{
    const data = useContext(AuthContext);
    return data;
}

export default useAuth;