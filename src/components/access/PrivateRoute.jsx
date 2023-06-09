import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    return (
        <div>
            {loading && <div className='w-fit mx-auto'><span className="loading loading-spinner loading-md"></span></div>}
            {!loading && <>
            {user && children}
            {!user && <Navigate to={'/login'} state={{from:location}}></Navigate>}
            </>}
        </div>
    );
};

export default PrivateRoute;