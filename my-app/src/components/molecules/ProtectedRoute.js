import React, {useContext} from 'react';
import {AuthContext} from "../../App";
import {Navigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";


function ProtectedRoute({element}) {
    const {user, setUser} = useContext(AuthContext)
    const [cookie, setCookie] = useCookies(['user']);
    const { id } = useParams();

    if(element.type.name !== "User" && cookie?.user?.isAdmin) {
        return element
    } else if (element.type.name === "User" && parseInt(id) === parseInt(user?.id)) {
        return element
    }
    else {
        return <Navigate to={'/not-found'} />
    }
}

export default ProtectedRoute;