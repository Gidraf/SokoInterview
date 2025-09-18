import { fireEvent, render, screen } from "@testing-library/react";
import { Repo } from "../../../models/Repo";
import "@testing-library/jest-dom";
import RepoList from "../../components/repo-list";

jest.mock("uuid", () => ({ v4: () => "uuid" }));
jest.mock("repo-card");

const repos: Repo[] = [
  {
    id: "1", name: "zeta", owner: {
      login: "me",
      id: "",
      username: "",
      avatarUrl: ""
    }, stars: 5, forks: 1, description: "", language: "JS", updated_at: "2023-01-01",
    html_url: undefined,
    readme: undefined
  },
  {
    id: "2", name: "alpha", owner: {
      login: "me",
      id: "",
      username: "",
      avatarUrl: ""
    }, stars: 10, forks: 2, description: "", language: "TS", updated_at: "2024-01-01",
    html_url: undefined,
    readme: undefined
  },
];

describe("RepoList", () => {
  it("filters repos by query", () => {
    render(<RepoList repos={repos} setPage={jest.fn()} isLoading={false} page={1} />);
    fireEvent.change(screen.getByPlaceholderText(/Search/), { target: { value: "alpha" } });
    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(screen.queryByText("zeta")).not.toBeInTheDocument();
  });

  it("sorts repos by stars", () => {
    render(<RepoList repos={repos} setPage={jest.fn()} isLoading={false} page={1} />);
    const items = screen.getAllByText(/alpha|zeta/).map(el => el.textContent);
    expect(items[0]).toBe("alpha");
  });

  it("sorts repos by forks", () => {
    render(<RepoList repos={repos} setPage={jest.fn()} isLoading={false} page={1} />);
    fireEvent.change(screen.getByDisplayValue("Sort by Stars"), { target: { value: "forks" } });
    const items = screen.getAllByText(/alpha|zeta/).map(el => el.textContent);
    expect(items[0]).toBe("alpha");
  });

  it("sorts repos by updated", () => {
    render(<RepoList repos={repos} setPage={jest.fn()} isLoading={false} page={1} />);
    fireEvent.change(screen.getByDisplayValue("Sort by Stars"), { target: { value: "updated" } });
    const items = screen.getAllByText(/alpha|zeta/).map(el => el.textContent);
    expect(items[0]).toBe("alpha");
  });

  it("calls setPage when Load More clicked", () => {
    const setPage = jest.fn();
    render(<RepoList repos={repos} setPage={setPage} isLoading={false} page={1} />);
    fireEvent.click(screen.getByText("Load More"));
    expect(setPage).toHaveBeenCalledWith(2);
  });
});
