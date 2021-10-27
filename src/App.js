import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Feed.it</p>
        <SignUpForm />
        <LoginForm />
        <SignOut />
      </header>
    </div>
  );
}

// eslint-disable-next-line import/first
import { Auth } from "aws-amplify";

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
    <div>
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
    </div>
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
    <div>
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
    </div>
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

export default App;
