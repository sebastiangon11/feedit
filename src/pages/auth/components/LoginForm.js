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
  const [username, setUsername] = useState("");
  const [password, setpPassword] = useState("");

  const loginMutation = useMutation(
    ["logIn"],
    () => login(username, password),
    {
      onSuccess: (user) => {
        toast.success(`Welcome ${user.username}!`);
        history.push(ROUTES.FEED.path);
      },
      onError: (error) => {
        if (error.code === "UserNotConfirmedException") {
          history.push(ROUTES.REGISTER_CONFIRM.path, { username });
        } else {
          toast.error(error.message);
        }
      },
    }
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h1>Log in</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
