// src/store/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Repo } from "../models/Repo";
import { User } from "../models/User";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ["Repo", "User"],
  endpoints: (builder) => ({
    getRepos: builder.query<
      Repo[],
      { username: string; page?: number; per_page?: number }
    >({
      query: ({ username, page = 1, per_page = 10 }) =>
        `users/${username}/repos?page=${page}&per_page=${per_page}`,
      providesTags: ["Repo"],
    }),
    getRepo: builder.query<Repo, { username: string; repo: string }>({
      query: ({ username, repo }) => `repos/${username}/${repo}`,
      providesTags: ["Repo"],
    }),
    getUser: builder.query<User, string>({
      query: (username) => `users/${username}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetReposQuery,
  useGetRepoQuery,
  useGetUserQuery,
} = apiSlice;
