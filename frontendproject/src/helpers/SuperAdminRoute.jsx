import React, { useContext } from 'react'
import { userContext } from '../context/AuthContext'
import { Navigate,  } from 'react-router-dom'
import Loader from '../Layouts/Website/Main/pages/loader/Loader'

export default function AuthRoute({ children }) {
    const { user } = useContext(userContext)
    if (user.role==="superadmin") return <>{children}</>
    else if (user.role === null) return <Loader />;
    else {
        return <h1>Sizin bu Sehifeye giris icazeniz yoxdur</h1>
    }

}
