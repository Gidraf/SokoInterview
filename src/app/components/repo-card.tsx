import { Repo } from "@/models/Repo";
import Link from "next/link";


export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Link href={`/repos/${repo.owner.login}/${repo.name}`}>
      <div className="block p-4 rounded-lg shadow hover:shadow-lg transition text-black">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{repo.name}</h3>
          <div className="text-sm text-black-400">{repo.language || ""}</div>
        </div>
        <p className="text-sm text-black-600 mt-2 line-clamp-2">{repo.description}</p>

        <div className="flex gap-3 mt-3 text-sm items-center">
          <div className="px-2 py-1 bg-gray-100 rounded">⭐ {repo.stars}</div>
          <div className="px-2 py-1 bg-gray-100 rounded">🍴 {repo.forks}</div>
        </div>
      </div>
    </Link>
  );
}
