import { CustomRoute, RoutesContainer } from "router";
import { LoginForm, RegisterForm, ConfirmRegisterForm, PasswordReset, PasswordChange } from "./components";

export const Auth = () => {
  return (
    <RoutesContainer>
      <CustomRoute transition exact path="/register/confirm">
        <ConfirmRegisterForm />
      </CustomRoute>
      <CustomRoute transition exact path="/register">
        <RegisterForm />
      </CustomRoute>
      <CustomRoute transition path="/login">
        <LoginForm />
      </CustomRoute>
      <CustomRoute transition path="/password/reset">
        <PasswordReset />
      </CustomRoute>
      <CustomRoute transition auth path="/password/change">
        <PasswordChange />
      </CustomRoute>
    </RoutesContainer>
  );
};
