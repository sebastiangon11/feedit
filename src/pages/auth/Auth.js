import { AnimatedRoute, AnimatedRoutes } from "router";
import { LoginForm, RegisterForm, ConfirmRegisterForm, PasswordReset } from "./components";

export const Auth = () => {
  return (
    <div>
      <AnimatedRoutes>
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
      </AnimatedRoutes>
    </div>
  );
};
