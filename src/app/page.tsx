"use client";

import { useState, useRef, useEffect } from "react";
import SearchHero from "./components/search-hero";
import StatsDashboard from "./components/stats-dashboard";
import RepoList from "./components/repo-list";
import { useRepos } from "@/hooks/useRepos";
import { Repo } from "@/models/Repo";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [repoData,setRepoData] = useState<Repo[]>([])
  const [page, setPage] = useState<number>(1)
  const [per_page] = useState<number>(10)
  const [submittedUser, setSubmittedUser] = useState<string | null>(null);

     const {repos, isLoading:loading, refetch} = useRepos(username, page, per_page)

     useEffect(() => {
  
    async function load() {
    await refetch()
    setRepoData([...repoData, ...repos])
}
 load().then()
     },[refetch,page])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <SearchHero
          username={username}
          setUsername={setUsername }
          onSearch={() => {
            if (!username) return;
            setSubmittedUser(username);
          }}
        />

        {/* Once a user has been submitted we reveal the stats + list */}
        {submittedUser && (
          <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StatsDashboard repos={repos} isLoading={loading} />
            </div>

            <div className="lg:col-span-2">
              <RepoList setPage={(p)=>{setPage(p);}} page={page} isLoading={loading} repos={repoData} />
            </div>
          </section>
        )}
      </div>
    </main>

  );
}
