/* eslint-disable */
import { render, screen } from "@testing-library/react";
import { Repo } from "../../..//models/Repo";
import "@testing-library/jest-dom";
import StatsDashboard from "../../components/stats-dashboard";

import React from "react"; // <- import React
jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
return {
    ...Original,
    ResponsiveContainer: ({ children }: any) => React.createElement("div", null, children),
  };
});
 

const repos: Repo[] = [
  {
    id: "1", name: "a", owner: {
      login: "me",
      id: "",
      username: "",
      avatarUrl: ""
    }, stars: 1, forks: 1, description: "", language: "TS", updated_at: "2023-01-01",
    html_url: undefined,
    readme: undefined
  },
  {
    id: "2", name: "b", owner: {
      login: "me",
      id: "",
      username: "",
      avatarUrl: ""
    }, stars: 2, forks: 2, description: "", language: "", updated_at: "2023-01-01",
    html_url: undefined,
    readme: undefined
  },
];

describe("StatsDashboard", () => {
  it("shows loading", () => {
    render(<StatsDashboard repos={repos} isLoading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders stats when loaded", () => {
    render(<StatsDashboard repos={repos} isLoading={false} />);
    expect(screen.getByText("Total repos sampled")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("TS")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
