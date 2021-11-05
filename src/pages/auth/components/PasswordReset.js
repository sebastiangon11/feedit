import { useState } from "react";
import { useAuth } from "@contexts/auth";
import { Form, Input, Submit } from "./Form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { ROUTES } from "router/routes";
import { useMutation } from "react-query";

export const PasswordReset = () => {
  const history = useHistory();
  const { sendNewPasswordCode, submitNewPasssword } = useAuth();

  const [formState, setFormState] = useState({
    username: "",
    code: "",
    password: "",
    passwordConfirm: "",
  });

  const { username, code, password, passwordConfirm } = formState;

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const sendCodeMutation = useMutation(
    ["sendCode"],
    () => sendNewPasswordCode(username),
    {
      onSuccess: () =>
        toast.success("A verification code was sent to your email address"),
      onError: (error) => toast.error("Error sending verification code", error),
    }
  );

  const submitNewPasswordMutation = useMutation(
    ["password", "reset"],
    () => submitNewPasssword(username, code, password),
    {
      onSuccess: () => {
        toast.success("Password was reseted!");
        history.push(ROUTES.LOGIN.path);
      },
      onError: (error) => {
        if (error.code === "CodeMismatchException") {
          toast.error("The verification code is incorrect", error);
        } else {
          toast.error(error.message);
        }
      },
    }
  );

  const sendVerificationCode = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords does not match");
    } else {
      sendCodeMutation.mutate();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewPasswordMutation.mutate();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Reset password</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username / Email</label>
        <Input
          required
          autoComplete="username"
          id="username"
          type="text"
          value={username}
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
      <div className="flex flex-col space-y-2">
        <label htmlFor="code">Verification code</label>
        <Input
          id="code"
          required
          autoComplete="one-time-code"
          value={code}
          onChange={handleFormChange}
        />
      </div>
      <button className="underline" onClick={sendVerificationCode}>
        Send verification code to my email
      </button>
      <Submit busy={submitNewPasssword.isLoading}>Submit</Submit>
    </Form>
  );
};
