import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useAuth } from "@contexts/auth";
import { Form, Input, Submit } from "./Form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

export const RegisterForm = () => {
  const history = useHistory();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const registerMutation = useMutation(
    ["register"],
    () => register(username, email, password),
    {
      onSuccess: () => {
        toast.success("A verification code was sent to your email address");
        history.push(ROUTES.REGISTER_CONFIRM.path, { username });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords does not match");
    } else {
      registerMutation.mutate();
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h1>Register</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <Input
          required
          autoComplete="username"
          autoCapitalize="none"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          required
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <Input
          required
          id="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password-confirm">Confirm password</label>
        <Input
          id="password-confirm"
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <Submit busy={registerMutation.isLoading}>Submit</Submit>
      <p className="text-gray-400">
        Already have an account?{" "}
        <Link className="underline text-gray-300" to={ROUTES.LOGIN.path}>
          Log in
        </Link>
      </p>
    </Form>
  );
};
