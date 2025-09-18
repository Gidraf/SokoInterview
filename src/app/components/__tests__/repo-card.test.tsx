import { render, screen } from "@testing-library/react";
import { Repo } from "../../../models/Repo";
import "@testing-library/jest-dom";
import RepoCard from "../../components/repo-card";

jest.mock("next/link");

const repo: Repo = {
  name: "my-repo",
  owner: {
    login: "me",
    id: "",
    username: "",
    avatarUrl: ""
  },
  language: "TypeScript",
  description: "Test description",
  stars: 10,
  forks: 2,
  updated_at: new Date().toISOString(),
  id: "woiowrt",
  html_url: undefined,
  readme: undefined
};

describe("RepoCard", () => {
  it("renders repo details", () => {
    render(<RepoCard repo={repo} />);
    expect(screen.getByText("my-repo")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("⭐ 10")).toBeInTheDocument();
    expect(screen.getByText("🍴 2")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/repos/me/my-repo");
  });

  it("handles missing language gracefully", () => {
    const repoNoLang = { ...repo, language: "" };
    render(<RepoCard repo={repoNoLang} />);
    expect(screen.getByText("")).toBeInTheDocument();
  });
});
