// src/hooks/useRepos.ts
import { useGetReposQuery, useGetRepoQuery } from "../store/apiSlice";
import { Repo } from "../models/Repo";

export const useRepos = (username: string, page:number, per_page:number) => {
  const { data: repos = [], isLoading, isError, refetch } = useGetReposQuery({username,page,per_page});
  return { repos: repos as Repo[], isLoading, isError, refetch };
};

export const useRepo = (username: string, repo: string) => {
  const { data, isLoading, isError } = useGetRepoQuery({ username, repo });
  return { repo: data as Repo, isLoading, isError };
};
