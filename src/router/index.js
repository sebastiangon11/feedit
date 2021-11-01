import { Route, NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "./Router.css";
import { ROUTES } from "./routes";

export const Nav = () => (
  <nav className="flex justify-between items-center px-1 bg-gray-800 px-3 py-3 shadow-xl ring-2">
    <div>
      <h1 className="text-indigo-200 text-xl">
        Feed
        <span className="rounded bg-indigo-900 ml-0.5 px-2 py-0.5">it</span>
      </h1>
    </div>
    <div className="space-x-4">
      <NavLink to={ROUTES.HOME.path}>{ROUTES.HOME.name}</NavLink>
      <NavLink to={ROUTES.ENROLL.path}>{ROUTES.ENROLL.name}</NavLink>
    </div>
  </nav>
);

export const AnimatedRoute = ({ children, ...props }) => {
  return (
    <Route {...props}>
      {({ match }) => (
        <CSSTransition
          in={match != null}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          {children ? <div className="page">{children}</div> : null}
        </CSSTransition>
      )}
    </Route>
  );
};

export const AnimatedRoutes = ({ children }) => (
  <div className="relative">{children}</div>
);
