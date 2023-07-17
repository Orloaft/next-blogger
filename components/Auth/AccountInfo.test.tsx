import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession, signIn, signOut } from "next-auth/react";
import AccountInfo from "./AccountInfo";

jest.mock("next-auth/react");
jest.mock(
  "next/link",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
);

describe("AccountInfo component", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<AccountInfo />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders "Not signed in" when there is no session', () => {
    mocked(useSession).mockReturnValue({ data: null });

    expect(screen.getByText("Not signed in")).toBeInTheDocument();
  });

  test('renders user information and "Sign out" button when there is a session', () => {
    const session = {
      user: {
        name: "John Doe",
        image: "profile.jpg",
      },
    };
    mocked(useSession).mockReturnValue({ data: session });

    expect(screen.getByText("Signed in as John Doe")).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign out" })
    ).toBeInTheDocument();
  });

  test('calls signOut function when "Sign out" button is clicked', () => {
    const session = {
      user: {
        name: "John Doe",
        image: "profile.jpg",
      },
    };
    mocked(useSession).mockReturnValue({ data: session });

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    expect(signOut).toHaveBeenCalledTimes(1);
  });

  test('calls signIn function when "Sign in" button is clicked', () => {
    mocked(useSession).mockReturnValue({ data: null });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(signIn).toHaveBeenCalledTimes(1);
  });
});
