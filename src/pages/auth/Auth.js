import { TransitionRoute, RoutesContainer } from "router";
import { Auth as AuthContext } from "@contexts/auth";
import { LoginForm, RegisterForm, ConfirmRegisterForm, PasswordReset, PasswordChange } from "./components";

export const Auth = () => {
  return (
    <RoutesContainer>
      <AuthContext.Unauthenticated>
        <TransitionRoute exact path="/register/confirm">
          <ConfirmRegisterForm />
        </TransitionRoute>
        <TransitionRoute exact path="/register">
          <RegisterForm />
        </TransitionRoute>
        <TransitionRoute path="/login">
          <LoginForm />
        </TransitionRoute>
        <TransitionRoute path="/password/reset">
          <PasswordReset />
        </TransitionRoute>
      </AuthContext.Unauthenticated>
      <AuthContext.Authenticated>
        <TransitionRoute path="/password/change">
          <PasswordChange />
        </TransitionRoute>
      </AuthContext.Authenticated>
    </RoutesContainer>
  );
};
