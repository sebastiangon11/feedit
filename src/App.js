import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import { Auth as AuthRouter } from "@pages";
import { AuthProvider } from "@contexts/auth";

import { ROUTES } from "router/routes";
import { Menu, TransitionRoute, RoutesContainer } from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Menu />
          <RoutesContainer>
            <TransitionRoute path={ROUTES.FEED.path}>
              <p className="p-4 text-xl">Feed Coming Soon...</p>
            </TransitionRoute>
            <TransitionRoute path={ROUTES.PROFILE.path}>
              <p className="p-4 text-xl">Profile Page is under construction...</p>
            </TransitionRoute>
            <AuthRouter />
          </RoutesContainer>
        </BrowserRouter>
        <ToastContainer position="bottom-center" autoClose={3000} theme="dark" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
