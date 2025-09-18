// src/hooks/useUser.ts
import { useGetUserQuery } from "../store/apiSlice";
import { User } from "../models/User";

export const useUser = (username: string) => {
  const { data, isLoading, isError } = useGetUserQuery(username);
  return { user: data as User, isLoading, isError };
};
