export interface PersonDetails {
  id: string;
  name: string;
  known_for_department: string;
  gender: number;
  birthday: string;
  profile_path: string;
  biography: string;
  place_of_birth: string;
  popularity: number;
  also_known_as: string[];
}

export interface PersonCast {
  id: string;
  order: number;
  title: string;
  character: string;
  poster_path: string;
  release_date: string;
}

export interface PersonCrew {
  id: string;
  title: string;
  job: string;
  department: string;
  poster_path: string;
  release_date: string;
}

export interface PersonCredits {
  cast: PersonCast[];
  crew: PersonCrew[];
}

interface CreditItem {
  id: number;
  title?: string;
  name?: string;
  character?: string;
  job?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

export interface PersonCreditsResponse {
  cast: CreditItem[];
  crew: CreditItem[];
}