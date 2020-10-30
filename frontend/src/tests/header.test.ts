import { render, fireEvent, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../components/Header";
render(<Header />);
test("loads and displays greeting", async () => {
  render(<Header />);
  fireEvent.click(screen.getByText("Load Greeting"));

  await wait(() => screen.getByRole("heading"));

  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toHaveAttribute("disabled");
});
