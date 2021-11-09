import { Auth } from "contexts/auth";
import { Redirect, useLocation } from "react-router-dom";
import { ROUTES } from "../routes";

export const WithAuth = ({ children }) => {
  const location = useLocation();

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
