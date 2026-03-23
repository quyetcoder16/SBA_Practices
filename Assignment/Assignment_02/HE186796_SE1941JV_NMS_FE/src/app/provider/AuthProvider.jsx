import React, { createContext, useEffect, useState } from 'react'

export const AuthStatesContext = createContext();
export const AuthActionsContext = createContext();

const AuthProvider = ({ children }) => {
    const [userContext, setUserContext] = useState(null);

    useEffect(() => {

        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        if (authData.user) {
            setUserContext(authData.user);
        }
    }, []);

    const changeUser = (user) => {
        setUserContext(user);
    };

    const logout = () => {
        localStorage.removeItem("auth");
        setUserContext(null);
        window.location.href = "/login";
    };

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