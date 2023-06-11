import { Navigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";

const StudentOnly = ({children}) => {
    const {data:profile,isLoading} = useProfile();
    return (
        <div>
            {isLoading && <div className='w-fit mx-auto'><span className="loading loading-spinner loading-md"></span></div>}
            {!isLoading && <>
                {(profile?.type!=='instructor' || profile?.type!=='admin')?children:<Navigate to={'/'}></Navigate>}
            </>}
            
        </div>
    );
};

export default StudentOnly;