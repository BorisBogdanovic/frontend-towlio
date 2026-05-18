import { HiDocument, HiPhoto, HiFilm } from "react-icons/hi2";

export const getFileIcon = (type: string) => {
  if (type.includes("pdf")) return <HiDocument />;
  if (type.match(/png|jpg|jpeg|webp/)) return <HiPhoto />;
  if (type.includes("mp4")) return <HiFilm />;

  return <HiDocument />;
};
