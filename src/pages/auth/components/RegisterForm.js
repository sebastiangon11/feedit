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

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { username, email, password, passwordConfirm } = formState;

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

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
          onChange={handleFormChange}
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
          onChange={handleFormChange}
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
          onChange={handleFormChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Input
          id="passwordConfirm"
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={handleFormChange}
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
