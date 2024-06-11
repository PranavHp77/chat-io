import { createContext, useState,useCallback } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({ name: "", email: "", password: "" });

    const updateResInfo=useCallback(
      (info) => {
        setRegisterInfo(info)
      },
      [],
    );
    
    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateResInfo
        }}>
            {children}
        </AuthContext.Provider>
    )
}