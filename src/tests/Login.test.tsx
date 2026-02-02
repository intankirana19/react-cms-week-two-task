import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { useAuthStore } from "../features/auth/stores/auth.store";
import { renderWithProviders } from "./utils";
import Login from "../features/auth/pages/Login";
 

vi.mock("../../../api/services/auth.service", () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
  },
}));
 
describe("Login Page", () => {
  beforeEach(() => {
    useAuthStore.setState({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
 
    vi.clearAllMocks();
  });
 
  it("renders login form", () => {
    renderWithProviders(<Login />);
 
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /masuk/i })
    ).toBeInTheDocument();
  });
});