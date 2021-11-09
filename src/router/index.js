import { Route } from "react-router-dom";
import { WithAuth } from "./components/WithAuth";
import { WithTransition, TransitionContainer } from "./components/WithTransition";

export const CustomRoute = ({ children, auth = false, transition = false, ...routeProps }) => {
  let customRoute = children;
  if (auth) customRoute = <WithAuth>{customRoute}</WithAuth>;
  if (transition) customRoute = <WithTransition>{customRoute}</WithTransition>;
  return <Route {...routeProps}>{customRoute}</Route>;
};

export const RoutesContainer = ({ children }) => <TransitionContainer>{children}</TransitionContainer>;

export { Menu } from "./components/Menu";
