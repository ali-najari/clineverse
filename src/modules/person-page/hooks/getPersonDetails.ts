"use client";

import { useQueryApi } from "@/utils/services/useQueryApi";
import { PersonDetails } from "../models";
import { API_ROUTES } from "@/shared/api";

export const GET_PERSON_DETAILS = "get-person-details";

const GetPersonDetails = (personId: number) => {
    const query = useQueryApi<PersonDetails>({
        queryKey: [GET_PERSON_DETAILS, personId],
        url: API_ROUTES.get_person_details(personId),
        options: {
            staleTime: 1000 * 60 * 15,
        },
    });
    return query;
};

export default GetPersonDetails;