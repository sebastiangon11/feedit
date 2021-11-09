import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useAuth } from "@contexts/auth";
import { Form, Input, Submit } from "./Form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

export const LoginForm = () => {
  const location = useLocation();
  const history = useHistory();
  const { login } = useAuth();

  const { pathname } = location.state?.from || { pathname: ROUTES.FEED.path };

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formState;

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const loginMutation = useMutation(["logIn"], () => login(username, password), {
    onSuccess: () => {
      history.push(pathname);
    },
    onError: (error) => {
      if (error.code === "UserNotConfirmedException") {
        history.push(ROUTES.REGISTER_CONFIRM.path, { username });
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
        <label htmlFor="username">Username / Email</label>
        <Input
          autoComplete="username"
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={handleFormChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <Input
          autoComplete="current-password"
          id="password"
          type="password"
          value={password}
          onChange={handleFormChange}
        />
      </div>
      <Submit busy={loginMutation.isLoading}>Submit</Submit>
      <p>
        <Link className="underline text-gray-400" to={ROUTES.PASSWORD_RESET.path}>
          Forgot your password?
        </Link>
      </p>
      <p className="text-gray-400">
        Don’t have an account?{" "}
        <Link className="underline text-gray-300" to={ROUTES.REGISTER.path}>
          Register
        </Link>
      </p>
    </Form>
  );
};
