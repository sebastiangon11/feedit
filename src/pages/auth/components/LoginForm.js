import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useAuth } from "@contexts/auth";
import { Form, Input, Submit } from "./Form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

export const LoginForm = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setpPassword] = useState("");

  const loginMutation = useMutation(["logIn"], () => login(email, password), {
    onSuccess: (user) => {
      toast.success(`Welcome ${user.attributes.email}!`);
      history.push(ROUTES.FEED.path);
    },
    onError: (error) => {
      if (error.code === "UserNotConfirmedException") {
        history.push(ROUTES.REGISTER_CONFIRM.path, { email });
      } else {
        toast.error(error.message);
      }
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h1>Log in</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setpPassword(e.target.value)}
        />
      </div>
      <Submit busy={loginMutation.isLoading}>Submit</Submit>
      <p className="text-gray-400">
        Don’t have an account?{" "}
        <Link className="underline text-gray-300" to={ROUTES.REGISTER.path}>
          Register
        </Link>
      </p>
    </Form>
  );
};
