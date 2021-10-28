import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(`user`, user);
      } catch (error) {
        console.log("error", error);
      }
    };

    getUser();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Feed.it</p>
        <SignUpForm />
        <ConfirmSignUp />
        <LoginForm />
        <SignOut />
      </header>
    </div>
  );
}

// eslint-disable-next-line import/first
import { Auth } from "aws-amplify";

const FormContainer = ({ children }) => (
  <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md flex items-center space-x-4">
    {children}
  </div>
);

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setpPassword] = useState("");

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
    <FormContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

const LoginForm = () => {
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
    <FormContainer>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

const SignOut = () => {
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
    <FormContainer>
      <h2>Confirm SignUp</h2>
      <form onSubmit={handleConfirm}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input value={code} onChange={(e) => setCode(e.target.value)} />
        <button onClick={resendConfirmationCode}>
          Resend confirmation code
        </button>
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

export default App;
