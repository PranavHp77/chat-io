import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postReq } from "../utils/services";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerErr, setRegisterErr] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [registerInfo, setRegisterInfo] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user))
  }, [])

  const updateResInfo = useCallback(
    (info) => {
      setRegisterInfo({ ...info })
    },
    [],
  );

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setRegisterErr(null)
    const res = await postReq(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
    setIsLoading(false)
    if (res.error) {
      return setRegisterErr(res)
    }
    localStorage.setItem("User", JSON.stringify(res))
    setUser(res)
  }, [registerInfo])

  const logoutUser = useCallback(
    () => {
      localStorage.removeItem("User")
      setUser(null)
    },
    [],
  )


  return (
    <AuthContext.Provider value={{
      user,
      registerInfo,
      registerErr,
      isLoading,
      updateResInfo,
      registerUser,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}