import { AnimatedRoute, AnimatedRoutes } from "router";
import { Auth as AuthContext } from "@contexts/auth";
import {
  LoginForm,
  RegisterForm,
  ConfirmRegisterForm,
  PasswordReset,
  PasswordChange,
} from "./components";

export const Auth = () => {
  return (
    <div>
      <AnimatedRoutes>
        <AuthContext.Unauthenticated>
          <AnimatedRoute exact path="/register/confirm">
            <ConfirmRegisterForm />
          </AnimatedRoute>
          <AnimatedRoute exact path="/register">
            <RegisterForm />
          </AnimatedRoute>
          <AnimatedRoute path="/login">
            <LoginForm />
          </AnimatedRoute>
          <AnimatedRoute path="/password/reset">
            <PasswordReset />
          </AnimatedRoute>
        </AuthContext.Unauthenticated>
        <AuthContext.Authenticated>
          <AnimatedRoute path="/password/change">
            <PasswordChange />
          </AnimatedRoute>
        </AuthContext.Authenticated>
      </AnimatedRoutes>
    </div>
  );
};
