import { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useAuth } from "App";

export const FormContainer = ({ children, ...props }) => (
  // <div className="m-4 p-4 rounded-xl border-opacity-80 w-11/12 mx-auto bg-indigo-900 bg-opacity-10 ring-2 ring-gray-400">
  <form
    {...props}
    className="my-4 mx-3 p-4 rounded-xl border-opacity-80 bg-indigo-800 bg-opacity-10 space-y-6"
  >
    {children}
  </form>
);

const FormInput = ({ ...props }) => (
  <input
    {...props}
    className="bg-gray-900 px-2 py-3 rounded border-l-2 bg-opacity-40 transition-colors ease-in-out duration-400 focus:border-indigo-500"
  />
);

export const RegisterForm = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await Auth.signUp({
        email,
        password,
      });
      setUser(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <h1>Register</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <FormInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <FormSumbit>Submit</FormSumbit>
      <p className="text-gray-400">
        Already have an account?{" "}
        <Link className="underline text-gray-300" to={ROUTES.LOGIN.path}>
          Log in
        </Link>
      </p>
    </FormContainer>
  );
};

export const LoginForm = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setpPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(email, password);
      setUser(user);
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <h1>Log in</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <FormInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setpPassword(e.target.value)}
        />
      </div>
      <FormSumbit>Submit</FormSumbit>
      <p className="text-gray-400">
        Don’t have an account?{" "}
        <Link className="underline text-gray-300" to={ROUTES.REGISTER.path}>
          Register
        </Link>
      </p>
    </FormContainer>
  );
};

export const Logout = () => {
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="relative border rounded-md p-2 w-full active:bg-gray-900 active:top-px active:ring-indigo-900 active:ring-2"
      type="submit"
    >
      Log out
    </button>
  );
};

export const ConfirmSignUp = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(email);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  return (
    <FormContainer onSubmit={handleConfirm}>
      <h2>Confirm SignUp</h2>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <FormInput
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="code">Verification code</label>
        <FormInput
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button onClick={resendConfirmationCode}>Resend confirmation code</button>
      <FormSumbit>Submit</FormSumbit>
    </FormContainer>
  );
};

const FormSumbit = ({ children, ...props }) => (
  <button
    className="relative border rounded-md p-2 w-full active:bg-gray-900 active:top-px active:ring-indigo-900 active:ring-2"
    type="submit"
  >
    {children}
  </button>
);
