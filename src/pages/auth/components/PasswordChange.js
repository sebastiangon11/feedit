import { useState } from "react";
import { useAuth } from "@contexts/auth";
import { Form, Input, Submit } from "./Form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { ROUTES } from "router/routes";
import { useMutation } from "react-query";

export const PasswordChange = () => {
  const history = useHistory();
  const { changePassword } = useAuth();

  const [formState, setFormState] = useState({
    oldPassword: "",
    password: "",
    passwordConfirm: "",
  });

  const { oldPassword, password, passwordConfirm } = formState;

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const changePasswordMutation = useMutation(
    ["password", "change"],
    () => changePassword(oldPassword, password),
    {
      onSuccess: () => {
        toast.success("Password was changed!");
        history.push(ROUTES.FEED.path);
      },
      onError: (error) => toast.error(error.message),
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    changePasswordMutation.mutate();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Change password</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="oldPassword">Current Password</label>
        <Input
          required
          id="oldPassword"
          type="password"
          autoComplete="password"
          value={oldPassword}
          onChange={handleFormChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">New Password</label>
        <Input
          required
          id="password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={handleFormChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="passwordConfirm">Confirm new password</label>
        <Input
          id="passwordConfirm"
          type="password"
          autoComplete="off"
          value={passwordConfirm}
          onChange={handleFormChange}
        />
      </div>
      <Submit busy={changePasswordMutation.isLoading}>Submit</Submit>
    </Form>
  );
};
