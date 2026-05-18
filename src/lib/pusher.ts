import Pusher from "pusher-js";

let pusher: Pusher | null = null;
let currentToken: string | null = null;

const API_URL = import.meta.env.VITE_API_URL;
const key = import.meta.env.VITE_PUSHER_KEY;
const cluster = import.meta.env.VITE_PUSHER_CLUSTER;

if (!key) throw new Error("VITE_PUSHER_KEY is missing");
if (!cluster) throw new Error("VITE_PUSHER_CLUSTER is missing");
if (!API_URL) throw new Error("VITE_API_URL is missing");

export const initPusher = (token: string): Pusher => {
  // reuse postojeću konekciju ako je token isti
  if (pusher && currentToken === token) {
    return pusher;
  }

  // reset konekcije ako se token promenio
  if (pusher) {
    pusher.disconnect();
    pusher = null;
  }

  currentToken = token;

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

export const getPusher = (): Pusher => {
  if (!pusher) {
    throw new Error("Pusher not initialized");
  }
  return pusher;
};

export const disconnectPusher = (): void => {
  if (pusher) {
    pusher.disconnect();
    pusher = null;
    currentToken = null;
  }
};
