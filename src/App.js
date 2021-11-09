import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import { Auth as AuthRouter } from "@pages";
import { AuthProvider } from "@contexts/auth";

import { ROUTES } from "router/routes";
import { Menu, CustomRoute, RoutesContainer } from "./router";
import { ProfilePage } from "@pages/profile";
import { FeedPage } from "@pages/feed";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Menu />
          <RoutesContainer>
            <CustomRoute transition path={ROUTES.FEED.path}>
              <FeedPage />
            </CustomRoute>
            <CustomRoute path={ROUTES.PROFILE.path} transition auth>
              <ProfilePage />
            </CustomRoute>
            <AuthRouter />
          </RoutesContainer>
        </BrowserRouter>
        <ToastContainer position="bottom-center" autoClose={3000} theme="dark" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
