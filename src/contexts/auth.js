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

  const updateUserAttrs = async (customAttrs = {}) => {
    if (Object.keys(customAttrs).length === 0) return;

    const user = await Auth.currentAuthenticatedUser();

    const newCustomAttrs = Object.fromEntries(
      Object.entries(customAttrs).map((entry) => [
        [`custom:${entry[0]}`],
        entry[1],
      ])
    );

    const mergedAttrs = {
      ...user.attributes,
      ...newCustomAttrs,
    };

    await Auth.updateUserAttributes(user, mergedAttrs);
  };

  const deleteUserAttrs = async (attrs = {}) => {
    if (Object.keys(attrs).length === 0) return;

    const user = await Auth.currentAuthenticatedUser();

    const attrsToDelete = Object.fromEntries(
      Object.entries(attrs).map((entry) => [[`custom:${entry[0]}`], entry[1]])
    );

    await Auth.deleteUserAttributes(user, attrsToDelete);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      confirmEmail,
      resendConfirmationCode,
      logout,
      updateUserAttrs,
      deleteUserAttrs,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
