import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SocialAccess = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = ({location}) =>{
        googleLogin()
        .then(result=>{
            console.log(result)
            const {user} = result;
            const userData = {
                name:user.displayName,
                email:user.email,
                phoneNumber:user.phoneNumber || '',
                photoUrl:user.photoURL,
                gender:'',
                address:'',
                type:'student'
            }
            console.log('userData:',userData);
            axios.post('http://localhost:5000/social-user',userData)
            .then(res=>{
                console.log(res);
                Swal.fire('Logged In','','success')
                navigate(location || '/',{replace:true});
            })
            .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
    }
    return (
        <div className="w-full mt-10">
            <div className="divider">Continue With</div>
            <button className="flex w-fit items-center gap-3 border-2 p-2 rounded-lg text-[#002147] font-bold border-[#002147] hover:bg-[#002147] hover:text-white text-sm mx-auto active:scale-90 duration-150" onClick={handleGoogleLogin}><FaGoogle className="text-2xl"></FaGoogle></button>
        </div>
    );
};

export default SocialAccess;