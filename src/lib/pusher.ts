import Pusher from "pusher-js";

let pusher: Pusher | null = null;

const API_URL = import.meta.env.VITE_API_URL;

export const initPusher = (token: string) => {
  if (pusher) {
    pusher.disconnect();
  }

  pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY!, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER!,
    forceTLS: true,
    authEndpoint: `${API_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  return pusher;
};

export const getPusher = () => pusher;
