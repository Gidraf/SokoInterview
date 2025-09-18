"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { useGetRepoQuery } from "@/store/apiSlice";

interface RepoViewClientProps {
  owner: string;
  name: string;
}

export default function RepoViewClient({ owner, name }: RepoViewClientProps) {
  // Use RTK Query hook
  const { data: repo, isLoading, isError } = useGetRepoQuery({ username: owner, repo: name });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !repo) return <div className="p-6">Repo not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{repo.name}</h1>
            <p className="text-black-600 mt-2">{repo.description}</p>
            <div className="mt-3 flex gap-3">
              <div className="px-3 py-1 bg-gray-100 rounded">⭐ {repo.stars}</div>
              <div className="px-3 py-1 bg-gray-100 rounded">🍴 {repo.forks}</div>
            </div>
          </div>

          <div className="text-right">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#FF4C3B] text-white rounded"
            >
              View on GitHub
            </a>
            <div className="text-sm text-gray-500 mt-2">{repo.language}</div>
          </div>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3">README</h2>
            {repo.readme ? (
              <div className="prose readme-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{repo.readme}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-gray-500">No README available</div>
            )}
          </div>

          <aside className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Quick stats</h3>
            <div className="text-sm text-gray-600">
              <div>Stars: {repo.stars}</div>
              <div>Forks: {repo.forks}</div>
              <div>Language: {repo.language}</div>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
