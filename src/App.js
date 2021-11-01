import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Nav, AnimatedRoute, AnimatedRoutes } from "./router";

import { Enroll } from "@pages";
import { ROUTES } from "router/routes";

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
    <BrowserRouter>
      <Nav />
      <AnimatedRoutes>
        <AnimatedRoute path={ROUTES.FEED.path}>
          <div className="m-4 p-4 border-2 rounded-xl border-opacity-80 w-11/12 mx-auto bg-indigo-900 bg-opacity-10">
            <p className="p-32">{ROUTES.FEED.name}</p>
          </div>
        </AnimatedRoute>
        <AnimatedRoute path={ROUTES.ENROLL.path}>
          <Enroll />
        </AnimatedRoute>
      </AnimatedRoutes>
    </BrowserRouter>
  );
}

export default App;
