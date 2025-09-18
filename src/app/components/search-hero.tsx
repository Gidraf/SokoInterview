"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  username: string;
  setUsername: (v: string) => void;
  onSearch: () => void;
};

export default function SearchHero({ username, setUsername, onSearch }: Props) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [username]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!username) return;
    setSubmitted(true);
    onSearch();
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <AnimatePresence>
          {!submitted ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-10 text-center text-black"
            >
              <h1 className="text-4xl font-extrabold mb-6 text-[#111827]">
                Search GitHub Repositories
              </h1>
              <form onSubmit={handleSubmit} className="flex justify-center">
                <div className="relative w-full max-w-2xl">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Type a GitHub username (e.g. vercel)"
                    className="w-full border rounded-full px-6 py-4 text-lg shadow-inner focus:outline-none text-black"
                  />
                  <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-2 bottom-2 px-5 rounded-full bg-[#FF4C3B] text-black"
                    aria-label="Search"
                    type="button"
                  >
                    <SearchIcon />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="topbar"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between text-black"
            >
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">Results for</div>
                <div className="px-3 py-1 bg-gray-100 rounded">{username}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
