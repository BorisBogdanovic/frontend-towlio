import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setCredentials } from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";
import clientReducer from "../features/Client/clientSlice";
import chatReducer from "../features/Chat/chatSlice";
import notificationsReducer from "../features/AppTopBar/notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    client: clientReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
  },
});

const authData = localStorage.getItem("auth");

if (authData) {
  try {
    const parsed = JSON.parse(authData);
    if (parsed?.user && parsed?.token) {
      store.dispatch(setCredentials(parsed));
    }
  } catch (error) {
    console.error("Invalid auth data in localStorage:", error);
    localStorage.removeItem("auth");
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
