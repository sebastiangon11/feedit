import { Auth } from "aws-amplify";

const login = (username, password) => Auth.signIn(username, password);

const register = async (username, email, password) => {
  const { user } = await Auth.signUp({
    username,
    password,
    attributes: { email, picture: "" },
  });
  return user;
};

const confirmEmail = (email, code) => Auth.confirmSignUp(email, code);

const resendConfirmationCode = (email) => Auth.resendSignUp(email);

const logout = () => Auth.signOut();

const updateUserAttrs = async (attrs = {}, customAttrs = {}) => {
  if (attrs.length === 0 && Object.keys(customAttrs).length === 0) return;

  const user = await Auth.currentAuthenticatedUser();

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

  await Auth.updateUserAttributes(user, mergedAttrs);
};

const deleteUserAttrs = async (attrs = {}, customAttrs = {}) => {
  if (attrs.length === 0 && Object.keys(customAttrs).length === 0) return;

  const user = await Auth.currentAuthenticatedUser();

  const attrsToDelete = Object.fromEntries(
    Object.entries(attrs).map((entry) => [[`custom:${entry[0]}`], entry[1]])
  );

  await Auth.deleteUserAttributes(user, {
    ...attrs,
    ...attrsToDelete,
  });
};

const sendNewPasswordCode = (username) => Auth.forgotPassword(username);

const submitNewPasssword = (username, code, newPassword) =>
  Auth.forgotPasswordSubmit(username, code, newPassword);

const changePassword = async (oldPassword, newPassword) => {
  const user = await Auth.currentAuthenticatedUser();
  return Auth.changePassword(user, oldPassword, newPassword);
};

const getUser = () => Auth.currentAuthenticatedUser();

export {
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
};
