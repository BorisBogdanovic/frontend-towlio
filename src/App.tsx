import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FullPageSpinner from "./ui/FullPageSpinner";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./pages/layouts/MainLayout";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./routes/AdminRoute";

import { Provider } from "react-redux";
import { store } from "./app/store";

import useNotifications from "./hooks/useNotifications";

const AuthLayout = lazy(() => import("./pages/layouts/AuthLayout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const CreateUser = lazy(() => import("./pages/InviteUser"));
const UserList = lazy(() => import("./pages/Users"));
const Register = lazy(() => import("./pages/Register"));
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
  defaultOptions: { queries: { staleTime: 0 } },
});

function AppContent() {
  // ✅ OVO JE SVE: realtime listener jednom za ceo app
  useNotifications();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />

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
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
