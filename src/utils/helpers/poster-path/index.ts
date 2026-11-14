export const getImageUrl = (path: string | null, size: string = "w500") => {
  if (!path) return "/placeholder-poster.png";
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};