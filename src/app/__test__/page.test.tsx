import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../page";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useRepos.ts", () => ({
  useRepos: () => ({
    repos: [{ id: 1, name: "repo1", owner: { login: "me" }, stars: 1, forks: 1, description: "", language: "TS", updated_at: "2023-01-01" }],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

describe("Home", () => {
  it("renders SearchHero initially", () => {
    render(<Home />);
    expect(screen.getByText("Search GitHub Repositories")).toBeInTheDocument();
  });

  it("reveals stats + list after search", async () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText(/Type a GitHub/), { target: { value: "me" } });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByText("Repo Stats")).toBeInTheDocument());
    expect(screen.getByText("repo1")).toBeInTheDocument();
  });
});
