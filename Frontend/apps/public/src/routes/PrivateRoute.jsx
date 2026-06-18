import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../services/authSlice';

const PrivateRoute = ({ children }) => {
    const isLogin = useSelector(selectIsLogin);
    return isLogin ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
