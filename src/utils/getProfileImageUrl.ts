import { BASE_URL } from "../services/apiConfig";

export const getProfileImageUrl = (path?: string | null) => {
  if (!path) return `${BASE_URL}/images/default-profile.png`;

  if (/^https?:\/\//.test(path)) return path;

  if (path.startsWith("images/default-profile")) {
    return `${BASE_URL}/${path}`;
  }

  if (path.startsWith("chat-images")) {
    return `${BASE_URL}/storage/${path}`;
  }

  if (path.startsWith("images/avatars") || path.startsWith("storage")) {
    return `${BASE_URL}/storage/${path.replace(/^storage\//, "")}`;
  }

  return `${BASE_URL}/${path}`;
};
