import { Route, useRouteMatch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// TODO: REMOVE
export const TransitionRoute = ({ children, ...props }) => {
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

export const WithTransition = ({ children, ...props }) => {
  const match = useRouteMatch();

  return (
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
  );
};

export const RoutesContainer = ({ children }) => <TransitionGroup className="relative">{children}</TransitionGroup>;
