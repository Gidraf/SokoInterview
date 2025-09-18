import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchHero from "../../components/search-hero";

describe("SearchHero", () => {
  it("submits search", () => {
    const setUsername = jest.fn();
    const onSearch = jest.fn();
    render(<SearchHero username="vercel" setUsername={setUsername} onSearch={onSearch} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSearch).toHaveBeenCalled();
  });

  it("does not submit if username empty", () => {
    const onSearch = jest.fn();
    render(<SearchHero username="" setUsername={jest.fn()} onSearch={onSearch} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("resets submitted on username change", () => {
    const { rerender } = render(<SearchHero username="vercel" setUsername={jest.fn()} onSearch={jest.fn()} />);
    rerender(<SearchHero username="other" setUsername={jest.fn()} onSearch={jest.fn()} />);
    expect(screen.getByText("Search GitHub Repositories")).toBeInTheDocument();
  });
});
