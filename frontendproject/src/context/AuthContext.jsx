import React, {  createContext, useEffect, useState } from 'react'
export const userContext = createContext()

export default function AuthContext({children}) {
    const [user, setUser] = useState(null);

    return (
        <>
            <userContext.Provider value={{user, setUser}}> {children} </userContext.Provider>
        </>
    )
}