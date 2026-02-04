import React, { createContext, useEffect, useState } from 'react'

export const AuthStatesContext = createContext();
export const AuthActionsContext = createContext();

const AuthProvider = ({ children }) => {
    // State
    const [userContext, setUserContext] = useState(null);

    // Actions/Functions

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUserContext(JSON.parse(savedUser));
        }
    }, []);

    const changeUser = (user) => {
        setUserContext(user);
    }


    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user")
        setUserContext(null);

        window.location.href = "/login";
    }

    const stateValues = { userContext };
    const actionValues = { changeUser, logout };

    return (
        <AuthStatesContext.Provider value={stateValues}>
            <AuthActionsContext.Provider value={actionValues}>
                {children}
            </AuthActionsContext.Provider>
        </AuthStatesContext.Provider>
    )
}

export default AuthProvider