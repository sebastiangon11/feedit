/* eslint-disable default-case */
import { Auth as AmplifyAuth, Hub } from "aws-amplify";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

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
      }
    };

    Hub.listen("auth", authListener);

    return () => Hub.remove("auth", authListener);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await AmplifyAuth.currentAuthenticatedUser();
        console.log(`Authenticated user data`, currentUser);
        setUser(currentUser);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getUser();
  }, []);

  const login = (username, password) => AmplifyAuth.signIn(username, password);

  const register = async (username, email, password) => {
    const { user } = await AmplifyAuth.signUp({
      username,
      password,
      attributes: { email, picture: "" },
    });
    return user;
  };

  const confirmEmail = (email, code) => AmplifyAuth.confirmSignUp(email, code);

  const resendConfirmationCode = (email) => AmplifyAuth.resendSignUp(email);

  const logout = () => AmplifyAuth.signOut();

  const updateUserAttrs = async (attrs = {}, customAttrs = {}) => {
    if (attrs.length === 0 && Object.keys(customAttrs).length === 0) return;

    const user = await AmplifyAuth.currentAuthenticatedUser();

    const newCustomAttrs = Object.fromEntries(
      Object.entries(customAttrs).map((entry) => [
        [`custom:${entry[0]}`],
        entry[1],
      ])
    );

    const mergedAttrs = {
      ...user.attributes,
      ...attrs,
      ...newCustomAttrs,
    };

    await AmplifyAuth.updateUserAttributes(user, mergedAttrs);
  };

  window.update = updateUserAttrs;

  const deleteUserAttrs = async (attrs = {}, customAttrs = {}) => {
    if (attrs.length === 0 && Object.keys(customAttrs).length === 0) return;

    const user = await AmplifyAuth.currentAuthenticatedUser();

    const attrsToDelete = Object.fromEntries(
      Object.entries(attrs).map((entry) => [[`custom:${entry[0]}`], entry[1]])
    );

    await AmplifyAuth.deleteUserAttributes(user, {
      ...attrs,
      ...attrsToDelete,
    });
  };

  const sendNewPasswordCode = (username) =>
    AmplifyAuth.forgotPassword(username);

  const submitNewPasssword = (username, code, newPassword) =>
    AmplifyAuth.forgotPasswordSubmit(username, code, newPassword);

  const changePassword = async (oldPassword, newPassword) => {
    const user = await AmplifyAuth.currentAuthenticatedUser();
    return AmplifyAuth.changePassword(user, oldPassword, newPassword);
  };

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
