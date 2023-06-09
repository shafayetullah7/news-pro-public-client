import useProfile from '../../hooks/useProfile';
import { Navigate } from 'react-router-dom';

const InstructorOnly = ({children}) => {
    const {data:profile,isLoading} = useProfile();
    return (
        <div>
            {isLoading && <div className='w-fit mx-auto'><span className="loading loading-spinner loading-md"></span></div>}
            {!isLoading && <>
                {profile?.type==='instructor'?children:<Navigate to={'/dashboard'}></Navigate>}
            </>}
            
        </div>
    );
};

export default InstructorOnly;