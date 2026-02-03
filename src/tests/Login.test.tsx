import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useAuthStore } from "../features/auth/stores/auth.store";
import { renderWithProviders } from "./utils";
import Login from "../features/auth/pages/Login";
import { authService } from "../api/services/auth.service";
import { userAdminMock } from "../api/mocks/user";
 

vi.mock("../api/services/auth.service", () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
  },
}));

const mockAuthService = vi.mocked(authService);
 
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

  it("shows validation errors when submitting empty form", async () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

    expect(await screen.findByText("Username wajib diisi")).toBeInTheDocument();
    expect(await screen.findByText("Password wajib diisi")).toBeInTheDocument();
  });

  it("submits login with username and password", async () => {
    mockAuthService.login.mockResolvedValue(userAdminMock);

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "admin1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /masuk/i }));

    await waitFor(() =>
      expect(mockAuthService.login).toHaveBeenCalledWith({
        username: "admin1",
        password: "password123",
      })
    );
  });
});