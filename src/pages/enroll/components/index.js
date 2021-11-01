import { useState } from "react";
import { Auth } from "aws-amplify";

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
    // className="bg-gray-900 px-2 py-3 rounded border-l-2 bg-opacity-40 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-inset"
    className="bg-gray-900 px-2 py-3 rounded border-l-2 bg-opacity-40 transition-colors ease-in-out duration-400 focus:border-indigo-500"
  />
);

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        // attributes: {
        //     email,
        //     phone_number,
        // }
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <h1>Sign Up</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <FormInput
          id="username"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <button
        className="relative border rounded-md p-2 w-full active:bg-gray-900 active:top-px active:ring-indigo-900 active:ring-2"
        type="submit"
      >
        Submit
      </button>
    </FormContainer>
  );
};

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setpPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      console.log("Logged in successfully", user);
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <h1>Login</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <FormInput
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <button type="submit">Submit</button>
    </FormContainer>
  );
};

export const SignOut = () => {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return <button onClick={handleLogout}>Sign out</button>;
};

export const ConfirmSignUp = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  return (
    <FormContainer onSubmit={handleConfirm}>
      <h2>Confirm SignUp</h2>
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <FormInput
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <button type="submit">Submit</button>
    </FormContainer>
  );
};
