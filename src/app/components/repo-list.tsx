"use client";

import { useEffect, useState, useRef } from "react";
 import { v4 as uuidv4 } from 'uuid';
import RepoCard from "./repo-card";
import { motion } from "framer-motion";
import { Repo } from "@/models/Repo";


export default function RepoList({repos, setPage, isLoading, page} :{repos: Repo[], setPage:(page:number)=>void, isLoading:boolean, page:number}) {



  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("stars");

  const [allRepo,setAllRepo] = useState<Repo[]>([])
  useEffect(() => {
      const all = [...repos,...allRepo]
      setAllRepo(all)
  }, [repos]);





  const sentinelRef = useRef<HTMLDivElement | null>(null);





  // filter + sort locally
  const processed = allRepo
    .filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "forks") return b.forks - a.forks;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  return (
    <div>
      <div className="flex gap-2 items-center mb-4 text-black">
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search within repos..."
          className="border px-3 py-2 rounded flex-1"
        />
        <select className="border px-3 py-2 rounded" value={sortBy} onChange={e => setSortBy(e.target.value as string)}>
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
          <option value="updated">Sort by Updated</option>
        </select>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {processed.map(repo => (
          <motion.div
            key={`${uuidv4()}`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <RepoCard repo={repo} />
          </motion.div>
        ))}
      </motion.div>

      <div ref={sentinelRef} className="h-10" />
      {!isLoading && <button onClick={()=>setPage(page+1)} rel="noreferrer" className="px-4 py-2 bg-[#FF4C3B] text-white rounded">Load More</button>}
    </div>
  );
}
