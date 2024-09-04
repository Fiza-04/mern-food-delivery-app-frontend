import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import Auth0ProviderWithNavigation from "./auth/Auth0ProviderwithNavigation.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

{
  /* QueryClient ->responsible for caching and managing server state */
  /*QueryClientProvider ->provides the client to your entire react app*/
  /* refetchOnWindowFocus: false --> disables the default behaviour of 
refetching data on browser reload, reduce unnecessary network requests.*/
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigation>
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigation>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
