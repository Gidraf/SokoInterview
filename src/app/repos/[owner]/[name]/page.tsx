import RepoViewClient from "@/app/components/repo-view-client";
import React from "react";

export default async function RepoPage({
  params,
}: {
  params: Promise<{ owner: string; name: string }>;
}) {
  const { owner, name } = await params;
  return <RepoViewClient owner={owner} name={name} />;
}
