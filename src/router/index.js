import { IconButton } from "components/IconButton";
import { DoorInIcon } from "components/icons/DoorIn";
import { HamburgerIcon } from "components/icons/Hamburger";
import { Auth } from "contexts/auth";
import { Logout } from "pages/auth/components";
import { useReducer, useRef } from "react";
import { Route, NavLink } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useClickAway } from "react-use";

import { ROUTES } from "./routes";

export const Nav = () => {
  const menuRef = useRef(null);
  const [isMenuActive, toggleMenu] = useReducer((isActive) => !isActive, false);
  const [isMenuDisabled, toogleMenuDisabled] = useReducer((isActive) => !isActive, false);

  useClickAway(menuRef, toggleMenu, ["mousedown"]);

  return (
    <nav className="flex justify-between items-center bg-gray-800 px-3 py-2 border-b border-indigo-900">
      <div>
        <NavLink to={ROUTES.FEED.path} className="text-white text-xl">
          Feed
          <span className="rounded font-semibold bg-indigo-900 ml-0.5 px-2 py-0.5">it</span>
        </NavLink>
      </div>
      <div id="hamburger-menu">
        <HamburgerIcon
          active={isMenuActive}
          disabled={isMenuDisabled}
          onClick={toggleMenu}
          className="h-10 w-10 fill-current text-gray-100"
        />
        <CSSTransition
          unmountOnExit
          timeout={500}
          classNames="drawer-animation"
          in={isMenuActive}
          onEntered={toogleMenuDisabled}
          onExited={toogleMenuDisabled}
        >
          <div
            ref={menuRef}
            onClick={toggleMenu}
            className="absolute inset-0 w-3/4 bg-gray-900 rounded-md max-w-sm overflow-hidden z-10 flex flex-col justify-between"
          >
            <div>
              <Auth.Authenticated>
                {/* TODO: Extract to components */}
                {(user) => (
                  <div className="m-4 flex items-center space-x-4">
                    {user.attributes.picture___ ? (
                      <img
                        src={user.attributes.picture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full shadow"
                      />
                    ) : (
                      <div className="rounded-full bg-indigo-900 w-10 h-10 flex items-center justify-center font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <p>{user.username}</p>
                  </div>
                )}
              </Auth.Authenticated>

              <div id="nav-links" className="mx-4 my-8 flex flex-col gap-y-3 text-lg">
                <NavLink activeClassName="text-indigo-500 text-semibold" to={ROUTES.FEED.path}>
                  {ROUTES.FEED.name}
                </NavLink>
                <Auth.Authenticated>
                  <NavLink activeClassName="text-indigo-500 text-semibold" to={ROUTES.PROFILE.path}>
                    {ROUTES.PROFILE.name}
                  </NavLink>
                </Auth.Authenticated>
              </div>
            </div>
            <div>
              <hr className="my-2 -mx-4 border-indigo-900" />
              <Auth.Authenticated>
                <Logout />
              </Auth.Authenticated>
              <Auth.Unauthenticated>
                <IconButton className="block m-4" icon={<DoorInIcon className="h-6 w-6 fill-current text-gray-100" />}>
                  <NavLink to={ROUTES.REGISTER.path}>
                    {ROUTES.REGISTER.name} / {ROUTES.LOGIN.name}
                  </NavLink>
                </IconButton>
              </Auth.Unauthenticated>
            </div>
          </div>
        </CSSTransition>
      </div>
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
          classNames="route-animation"
        >
          {children ? <div id={props.path}>{children}</div> : null}
        </CSSTransition>
      )}
    </Route>
  );
};

export const AnimatedRoutes = ({ children }) => <TransitionGroup className="relative">{children}</TransitionGroup>;
