import { AnimatedRoute, AnimatedRoutes } from "router";
import { LoginForm, RegisterForm } from "./components";

export const Auth = () => {
  return (
    <AnimatedRoutes>
      <AnimatedRoute path="/register">
        <RegisterForm />
      </AnimatedRoute>
      <AnimatedRoute path="/login">
        <LoginForm />
      </AnimatedRoute>
    </AnimatedRoutes>
  );
};
