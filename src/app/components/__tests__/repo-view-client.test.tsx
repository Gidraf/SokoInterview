import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RepoViewClient from "../../components/repo-view-client";

global.fetch = jest.fn();

describe("RepoViewClient", () => {
  const repoData = { name: "test-repo", description: "desc", stargazers_count: 1, forks_count: 2, html_url: "http://gh", language: "TS" };

  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it("shows loading then repo + readme", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => repoData })
      .mockResolvedValueOnce({ ok: true, text: async () => "## Hello" });

    render(<RepoViewClient owner="me" name="test-repo" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("test-repo")).toBeInTheDocument());
    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText("⭐ 1")).toBeInTheDocument();
    expect(screen.getByText("🍴 2")).toBeInTheDocument();
    expect(screen.getByText("No README available")).not.toBeInTheDocument();
  });

  it("handles repo not found", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: false });

    render(<RepoViewClient owner="me" name="bad-repo" />);
    await waitFor(() => expect(screen.getByText("Repo not found")).toBeInTheDocument());
  });

  it("handles missing readme", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => repoData })
      .mockResolvedValueOnce({ ok: false });

    render(<RepoViewClient owner="me" name="test-repo" />);
    await waitFor(() => expect(screen.getByText("No README available")).toBeInTheDocument());
  });
});
