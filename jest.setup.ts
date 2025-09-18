import '@testing-library/jest-dom';
import * as dotenv from "dotenv";
import "@testing-library/jest-dom";

dotenv.config({
  path: process.env.NODE_ENV === "development" ? "./.env.local" : "./.env.prod",
});

// Disable console warnings and errors for all tests
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

// Restore console methods after all tests
afterAll(() => {
  jest.restoreAllMocks();
});
