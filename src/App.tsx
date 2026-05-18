import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FullPageSpinner from "./ui/FullPageSpinner";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./pages/layouts/MainLayout";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./routes/AdminRoute";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./app/store";
import useNotifications from "./hooks/useNotifications";
import { initPusher, disconnectPusher } from "./lib/pusher";
import { useChatUsers } from "./hooks/useChatUsers";
import { useOnlineUsers } from "./hooks/useOnlineUsers";
import { useChatRealtime } from "./hooks/useChatRealtime";
import { initSounds } from "./utils/sound";

const AuthLayout = lazy(() => import("./pages/layouts/AuthLayout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CreateUser = lazy(() => import("./pages/InviteUser"));
const UserList = lazy(() => import("./pages/Users"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Settings = lazy(() => import("./pages/Settings"));
const Inbox = lazy(() => import("./pages/InboxPage"));
const CreateClient = lazy(() => import("./pages/CreateClient"));
const Client = lazy(() => import("./pages/Clients"));
const ExpiredPage = lazy(() => import("./pages/ExpiredPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
    },
  },
});

function AppContent() {
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) initPusher(token);
    else disconnectPusher();
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}

function AppInner() {
  useChatUsers("");
  useNotifications();
  useChatRealtime();
  useOnlineUsers();

  useEffect(() => {
    initSounds();
  }, []);

  return (
    <>
      <Toaster
        position="bottom-right"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#114b5f",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            fontSize: "14px",
          },
          success: {
            style: { background: "#1a936f" },
            iconTheme: { primary: "#fff", secondary: "#1a936f" },
          },
          error: {
            style: { background: "#dc2626" },
            iconTheme: { primary: "#fff", secondary: "#dc2626" },
          },
        }}
      />

      <BrowserRouter>
        <Suspense fallback={<FullPageSpinner />}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route index element={<Login />} />
            </Route>

            <Route
              path="register/:email/:token/:name/:last_name"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route index element={<Register />} />
            </Route>

            <Route
              path="forgot-password"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route index element={<ForgotPassword />} />
            </Route>

            <Route
              path="reset-password"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route index element={<ResetPassword />} />
            </Route>

            <Route path="link-expired" element={<ExpiredPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create-client" element={<CreateClient />} />
              <Route path="clients" element={<Client />} />
              <Route path="inbox" element={<Inbox />} />

              <Route
                path="create-user"
                element={
                  <AdminRoute>
                    <CreateUser />
                  </AdminRoute>
                }
              />
              <Route
                path="users"
                element={
                  <AdminRoute>
                    <UserList />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
