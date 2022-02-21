import React, {useContext} from 'react';
import {AuthContext} from "../../App";
import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";


function ProtectedRoute({element}) {
    const {user, setUser} = useContext(AuthContext)
    const [cookie, setCookie] = useCookies(['user']);;
    if(cookie?.user?.isAdmin) {
        return element
    }
    else {
        return <Navigate to={'/not-found'} />
    }
}

export default ProtectedRoute;