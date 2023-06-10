import { Navigate } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';

const AdminOnly = ({children}) => {
    const {data:profile,isLoading} = useProfile();
    // console.log(isLoading);

    return (
        <div>
            {isLoading && <div className='w-fit mx-auto'><span className="loading loading-spinner loading-md"></span></div>}
            {!isLoading && <>
                {profile?.type==='admin'?children:<Navigate to={'/'}></Navigate>}
            </>}
            
        </div>
    );
    
};

export default AdminOnly;