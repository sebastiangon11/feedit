import { Auth } from "contexts/auth";
import { Logout } from "pages/auth/components";
import { Route, NavLink } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
          appear
          unmountOnExit
          timeout={300}
          in={match !== null}
          className="absolute w-full"
          classNames={{
            enter: "opacity-0 scale-90",
            appear: "opacity-0 scale-90",
            appearActive:
              "opacity-100 scale-100 transition-all transition-slower ease-out",
            enterActive:
              "opacity-100 scale-100 transition-all transition-slower",
            exitActive:
              "opacity-0 scale-90 transition-all transition-slower ease-in",
          }}
        >
          {children ? <div id={props.path}>{children}</div> : null}
        </CSSTransition>
      )}
    </Route>
  );
};

export const AnimatedRoutes = ({ children }) => (
  <TransitionGroup className="relative">{children}</TransitionGroup>
);
