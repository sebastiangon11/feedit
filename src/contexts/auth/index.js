import { Hub } from "aws-amplify";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import {
  login,
  register,
  confirmEmail,
  resendConfirmationCode,
  logout,
  sendNewPasswordCode,
  submitNewPasssword,
  changePassword,
  updateUserAttrs,
  deleteUserAttrs,
  getUser,
} from "./amplify-auth";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const Authenticated = ({ children }) => {
  const { user } = useAuth();
  return user ? children : null;
};
const Unauthenticated = ({ children }) => {
  const { user } = useAuth();
  return user ? null : children;
};

const Auth = { Authenticated, Unauthenticated };

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authListener = (data) => {
      switch (data.payload.event) {
        case "signIn":
          setUser(data.payload.data);
          break;
        case "signOut":
          setUser(null);
          break;
        default:
          break;
      }
    };

    Hub.listen("auth", authListener);

    return () => Hub.remove("auth", authListener);
  }, []);

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((e) => toast.error(e.message));
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      confirmEmail,
      resendConfirmationCode,
      logout,
      sendNewPasswordCode,
      submitNewPasssword,
      changePassword,
      updateUserAttrs,
      deleteUserAttrs,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth, Auth };
