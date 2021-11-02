import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import { Auth as AuthRouter } from "@pages";
import { AuthProvider, useAuth } from "@contexts/auth";

import { ROUTES } from "router/routes";
import { Nav, AnimatedRoute, AnimatedRoutes } from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainRouter />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const MainRouter = () => {
  const { user } = useAuth();

  console.log(`user`, user);

  return (
    <BrowserRouter>
      <Nav />
      <AnimatedRoutes>
        <AnimatedRoute path={ROUTES.FEED.path}>Feed</AnimatedRoute>
        {user ? null : (
          <AnimatedRoute path={[ROUTES.REGISTER.path, ROUTES.LOGIN.path]}>
            <AuthRouter />
          </AnimatedRoute>
        )}
      </AnimatedRoutes>
    </BrowserRouter>
  );
};

export default App;
