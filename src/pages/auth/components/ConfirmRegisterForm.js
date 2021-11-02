import { useState } from "react";
import { useAuth } from "@contexts/auth";
import { Form, Input, Submit } from "./Form";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router";
import { ROUTES } from "router/routes";
import { useMutation } from "react-query";

export const ConfirmRegisterForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { confirmEmail, resendConfirmationCode } = useAuth();
  const [email, setEmail] = useState(location.state?.email);
  const [code, setCode] = useState("");

  const confirmMutation = useMutation(
    ["confirmEmail"],
    () => confirmEmail(email, code),
    {
      onSuccess: (user) => {
        history.push(ROUTES.LOGIN.path);
      },
      onError: (error) => {
        toast.error("error confirming sign up", error);
      },
    }
  );

  const handleConfirm = async (e) => {
    e.preventDefault();
    confirmMutation.mutate();
  };

  const handleResend = async () => {
    try {
      await resendConfirmationCode(email);
      toast.success("A new code has been sent to your email");
    } catch (err) {
      toast.error("error resending code: ", err);
    }
  };

  return (
    <Form onSubmit={handleConfirm}>
      <h1>Confirm your email</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          disabled
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="code">Verification code</label>
        <Input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button className="underline" onClick={handleResend}>
        Resend confirmation code
      </button>
      <Submit busy={confirmMutation.isLoading}>Submit</Submit>
    </Form>
  );
};
