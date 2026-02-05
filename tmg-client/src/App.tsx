import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { useNotification } from "./context/NotificationContext.types";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppRoutes } from "./routes";

// Create a custom event for global error handling
const dispatchGlobalError = (error: Error) => {
  const event = new CustomEvent("tmg-error", { detail: error });
  window.dispatchEvent(event);
};

// Create a client with global error handling hooked into the cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      dispatchGlobalError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      dispatchGlobalError(error);
    },
  }),
});

/**
 * Component to listen for global errors and show notifications.
 * Must be rendered inside NotificationProvider.
 */
const GlobalErrorListener = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    const handleGlobalError = (event: Event) => {
      const customEvent = event as CustomEvent<Error>;
      const error = customEvent.detail;
      // Extract a user-friendly message
      const message = error.message || "An unexpected error occurred";
      showNotification(message, "error");
    };

    window.addEventListener("tmg-error", handleGlobalError);
    return () => window.removeEventListener("tmg-error", handleGlobalError);
  }, [showNotification]);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalErrorListener />
          <BrowserRouter>
            <AuthProvider>
              <ThemeProvider>
                <AppRoutes />
              </ThemeProvider>
            </AuthProvider>
          </BrowserRouter>
          {/* DevTools will only show in development environment */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;