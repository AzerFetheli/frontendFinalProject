import React, { useContext } from 'react'
import { userContext } from '../context/AuthContext'
import { Navigate,  } from 'react-router-dom'
import Loader from '../Layouts/Website/Main/pages/loader/Loader'

export default function ProtectRoute({ children }) {
    const { user } = useContext(userContext)
    if (user.role==="superadmin" || user.role==="admin") return <>{children}</>
    else if (user.role === null) return <Loader />;
    else {
        return <Navigate to={"/login"} />
    }
}
