"use client"

import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "../axios";

type UseQueryApiProps<TQueryFnData, TSelectedData = TQueryFnData> = {
  queryKey: QueryKey;
  url: string;
  config?: AxiosRequestConfig;
  options?: Omit<
    UseQueryOptions<TQueryFnData, AxiosError, TSelectedData>,
    "queryKey" | "queryFn"
  >;
};

export function useQueryApi<
  TQueryFnData = unknown,
  TSelectedData = TQueryFnData,
>({
  queryKey,
  url,
  config,
  options,
}: UseQueryApiProps<TQueryFnData, TSelectedData>): UseQueryResult<
  TSelectedData,
  AxiosError
> {
  return useQuery<TQueryFnData, AxiosError, TSelectedData>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<TQueryFnData>(url, {
        ...config,
      });
      return data;
    },
    ...options,
  });
}
