"use client";
import { Repo } from "@/models/Repo";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";


export default function StatsDashboard({repos, isLoading}:{repos:Repo[]; isLoading:boolean}) {
  const [allRepo,setAllRepo] = useState<Repo[]>([])
  useEffect(() => {
      const all = [...repos,...allRepo]
      setAllRepo(all)
  }, [repos]);

  // group languages
  const langMap = allRepo.reduce<Record<string, number>>((acc, r) => {
    const lang = r.language || "Unknown";
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(langMap).map(([name, value]) => ({ name, value }));
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#7C3AED", "#10B981", "#F97316"];

  return (
    <div className="sticky top-6 bg-white rounded-xl p-4 shadow text-black ">
      <h3 className="text-lg font-semibold mb-2">Repo Stats</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-4">
            <div className="text-sm text-black-500">Total repos sampled</div>
            <div className="text-2xl font-bold">{allRepo.length}</div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  className="text-sm"
                  outerRadius={100}
                  labelLine={false}
                  label={({ name }) => name}
                >
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
