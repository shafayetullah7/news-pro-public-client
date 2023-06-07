import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const SocialAccess = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () =>{
        googleLogin()
        .then(result=>{
            console.log(result)
            Swal.fire('','Logged In','success')
            navigate('/',{replace:true});
        })
    }
    return (
        <div className="w-full mt-10">
            <div className="divider">Continue With</div>
            <button className="flex w-fit items-center gap-3 border-2 p-2 rounded-lg text-[#002147] font-bold border-[#002147] hover:bg-[#002147] hover:text-white text-sm mx-auto active:scale-90 duration-150" onClick={handleGoogleLogin}><FaGoogle className="text-2xl"></FaGoogle></button>
        </div>
    );
};

export default SocialAccess;