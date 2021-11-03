import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import { Auth as AuthRouter } from "@pages";
import { AuthProvider, Auth } from "@contexts/auth";

import { ROUTES } from "router/routes";
import { Nav, AnimatedRoute, AnimatedRoutes } from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <AnimatedRoutes>
            <AnimatedRoute path={ROUTES.FEED.path}>Feed</AnimatedRoute>
            <Auth.Unauthenticated>
              <AuthRouter />
            </Auth.Unauthenticated>
          </AnimatedRoutes>
        </BrowserRouter>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          theme="dark"
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
