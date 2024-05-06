import { useAuth } from '../context.js';
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth ({children}){
    const location = useLocation();
    const {isLogged} = useAuth();

    return isLogged ? (children ): 
    (<Navigate to="/login" state={{ from: location.pathname}}/>)
};


