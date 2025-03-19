import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path if necessary

export default function Protected({children}){
    const {isAuthenticated} = useAuth()
    console.log("auth auth", isAuthenticated)

    if(isAuthenticated){
        return children;
       
    }
    else{
        return <Navigate to="/" replace/>
    }
}
