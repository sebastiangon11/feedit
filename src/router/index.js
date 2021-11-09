import { Auth } from "contexts/auth";
import { Route, Redirect, useLocation } from "react-router-dom";
import { WithTransition } from "./components/TransitionRoutes";
import { ROUTES } from "./routes";

export const WithAuth = ({ children }) => {
  const location = useLocation();

  console.log(`location`, location);

  return (
    <>
      <Auth.Authenticated>{children}</Auth.Authenticated>
      <Auth.Unauthenticated>
        <Redirect
          to={{
            pathname: ROUTES.LOGIN.path,
            state: { from: location },
          }}
        />
      </Auth.Unauthenticated>
    </>
  );
};

export const CustomRoute = ({ children, auth = false, transition = false, ...routeProps }) => {
  let customRoute = children;
  if (auth) customRoute = <WithAuth>{customRoute}</WithAuth>;
  if (transition) customRoute = <WithTransition>{customRoute}</WithTransition>;
  return <Route {...routeProps}>{customRoute}</Route>;
};

export { RoutesContainer, TransitionRoute, WithTransition } from "./components/TransitionRoutes";
export { Menu } from "./components/Menu";
