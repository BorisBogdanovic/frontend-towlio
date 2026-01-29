import Pusher from "pusher-js";

let pusher: Pusher | null = null;
const API_URL = import.meta.env.VITE_API_URL;

export const initPusher = (token: string) => {
  const key = import.meta.env.VITE_PUSHER_KEY;
  const cluster = import.meta.env.VITE_PUSHER_CLUSTER;

  if (!key) throw new Error("VITE_PUSHER_KEY is missing");
  if (!cluster) throw new Error("VITE_PUSHER_CLUSTER is missing");
  if (!API_URL) throw new Error("VITE_API_URL is missing");

  if (pusher) return pusher;

  pusher = new Pusher(key, {
    cluster,
    forceTLS: true,
    authEndpoint: `${API_URL}/api/v1/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  return pusher;
};

export const disconnectPusher = () => {
  if (pusher) {
    pusher.disconnect();
    pusher = null;
  }
};

export const getPusher = () => pusher;
