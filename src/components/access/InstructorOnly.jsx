import useProfile from '../../hooks/useProfile';
import { Navigate } from 'react-router-dom';

const InstructorOnly = ({children}) => {
    const {data:profile} = useProfile();
    return (
        <div>
            {profile?.type==='instructor'?children:<Navigate to={'/dashboard'}></Navigate>}
        </div>
    );
};

export default InstructorOnly;