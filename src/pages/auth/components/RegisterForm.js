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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation(
    ["register"],
    () => register(email, password),
    {
      onSuccess: (user) => {
        toast.success(`Welcome ${user.username}!`);
        history.push(ROUTES.REGISTER_CONFIRM.path, { email });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h1>Register</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          required
          id="email"
          type="email"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
