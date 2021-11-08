import { Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

export const RoutesContainer = ({ children }) => <TransitionGroup className="relative">{children}</TransitionGroup>;
