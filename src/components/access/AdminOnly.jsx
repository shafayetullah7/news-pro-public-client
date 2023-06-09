import { Navigate } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';

const AdminOnly = ({children}) => {
    const {data:profile} = useProfile();
    return (
        <div>
            {profile?.type==='admin'?children:<Navigate to={'/dashboard'}></Navigate>}
        </div>
    );
    
};

export default AdminOnly;