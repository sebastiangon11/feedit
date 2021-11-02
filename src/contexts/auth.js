import { Auth } from "aws-amplify";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        console.log("error", error);
      }
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const user = await Auth.signIn(email, password);
    setUser(user);
    return user;
  };

  const register = async (email, password) => {
    const { user } = await Auth.signUp({
      username: email,
      password,
    });
    return user;
  };

  const confirmEmail = (email, code) => Auth.confirmSignUp(email, code);

  const resendConfirmationCode = (email) => Auth.resendSignUp(email);

  const logout = () => {
    Auth.signOut();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      confirmEmail,
      resendConfirmationCode,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
