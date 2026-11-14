import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";

export const GET_PERSON_MOVIES_CREDITS = "get-person-movies-credits";
export const GET_PERSON_TV_CREDITS = "get-person-tv-credits";

export type MediaType = "movie" | "tv";
export type CreditType = "cast" | "crew";

interface GetPersonCreditsProps {
  personId: number;
  mediaType: MediaType;
  creditType: CreditType;
}

const useGetPersonCredits = ({
  personId,
  mediaType,
  creditType,
}: GetPersonCreditsProps) => {
  const url = API_ROUTES.get_person_credits[mediaType][creditType](personId);
  const query = useQueryApi({
    queryKey: [
      mediaType === "movie" ? GET_PERSON_MOVIES_CREDITS : GET_PERSON_TV_CREDITS,
      personId,
      creditType,
    ],
    url,
  });
  return query;
};

export default useGetPersonCredits;
