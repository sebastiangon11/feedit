import { AnimatedRoute, AnimatedRoutes } from "router";
import { LoginForm, RegisterForm, ConfirmRegisterForm } from "./components";

export const Auth = () => {
  return (
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
    </AnimatedRoutes>
  );
};
