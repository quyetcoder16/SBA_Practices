import React, { createContext, useState } from 'react'

export const AuthStatesContext = createContext();
export const AuthActionsContext = createContext();

const AuthProvider = ({children}) => {
    // State
    const [userContext, setUserContext] = useState(null);
    const [language, setLanguage] = useState("EN");

    // Actions/Functions

    const changeUser = (user) => {
        console.log("Set user to context");
        setUserContext(user);
    }

    const changeLang = (other)=> {
        setLanguage(other);
    }

    const logout = ()=> {
        localStorage.removeItem("accessToken");
        setUserContext( null);

        window.location.href = "/login";
    }

    const stateValues = {userContext, language};
    const actionValues = {changeUser, logout, changeLang};

  return (
    <AuthStatesContext.Provider value={stateValues}>
        <AuthActionsContext.Provider value={actionValues}>
            {children}
        </AuthActionsContext.Provider>
    </AuthStatesContext.Provider>
  )
}

export default AuthProvider