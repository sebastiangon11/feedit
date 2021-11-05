import { Auth } from "contexts/auth";
import { Logout } from "pages/auth/components";
import { Route, NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "./Router.css";
import { ROUTES } from "./routes";

export const Nav = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 px-3 py-3 ring-2">
      <div>
        <NavLink to={ROUTES.FEED.path} className="text-white text-xl">
          Feed
          <span className="rounded font-semibold bg-indigo-900 ml-0.5 px-2 py-0.5">
            it
          </span>
        </NavLink>
      </div>
      <Auth.Authenticated>
        <Logout />
      </Auth.Authenticated>
      <Auth.Unauthenticated>
        <div className="space-x-4">
          <NavLink to={ROUTES.REGISTER.path}>
            {ROUTES.REGISTER.name} / {ROUTES.LOGIN.name}
          </NavLink>
        </div>
      </Auth.Unauthenticated>
    </nav>
  );
};

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
