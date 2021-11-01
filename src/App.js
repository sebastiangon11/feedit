import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Nav, AnimatedRoute, AnimatedRoutes } from "./router";

import { Auth as AuthRouter } from "@pages";
import { ROUTES } from "router/routes";

const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        console.log("error", error);
        setUser(null);
      }
    };

    getUser();
  }, []);

  const value = React.useMemo(() => ({ user, setUser }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}

const MainRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Nav />
      {user ? null : (
        <AnimatedRoutes>
          <AnimatedRoute path={ROUTES.FEED.path}>
            <div className="m-4 p-4 border-2 rounded-xl border-opacity-80 w-11/12 mx-auto bg-indigo-900 bg-opacity-10">
              <p className="p-32">{ROUTES.FEED.name}</p>
            </div>
          </AnimatedRoute>
          <AnimatedRoute path={[ROUTES.REGISTER.path, ROUTES.LOGIN.path]}>
            <AuthRouter />
          </AnimatedRoute>
        </AnimatedRoutes>
      )}
      <Route path="/">
        <Redirect to={ROUTES.FEED.path} />
      </Route>
    </BrowserRouter>
  );
};

export default App;
