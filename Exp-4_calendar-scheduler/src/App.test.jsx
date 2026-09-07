import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import {
  describe,
  test,
  expect,
} from "vitest";

import App from "./App";

describe("Social Media Scheduler", () => {

  test("renders the scheduler heading", () => {
    render(<App />);

    expect(
      screen.getByText(
        "📅 Social Media Scheduler"
      )
    ).toBeInTheDocument();
  });


  test("renders the schedule form", () => {
    render(<App />);

    expect(
      screen.getByText("Schedule New Post")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Platform")
    ).toBeInTheDocument();
  });


  test("allows the user to enter a post title", () => {
    render(<App />);

    const input =
      screen.getByPlaceholderText(
        "Enter post title"
      );

    fireEvent.change(input, {
      target: {
        value: "My New Post",
      },
    });

    expect(input.value).toBe(
      "My New Post"
    );
  });


  test("allows platform selection", () => {
    render(<App />);

    const select =
      screen.getByDisplayValue(
        "Instagram"
      );

    fireEvent.change(select, {
      target: {
        value: "LinkedIn",
      },
    });

    expect(select.value).toBe(
      "LinkedIn"
    );
  });


  test("adds a new scheduled post", () => {
    render(<App />);

    const input =
      screen.getByPlaceholderText(
        "Enter post title"
      );

    fireEvent.change(input, {
      target: {
        value: "Testing Post",
      },
    });

    const button =
      screen.getByRole("button", {
        name: "+ Schedule Post",
      });

    fireEvent.click(button);

    expect(
      screen.getByText("Testing Post")
    ).toBeInTheDocument();
  });


  test("displays scheduled posts", () => {
    render(<App />);

    expect(
      screen.getByText(
        "Instagram Product Launch"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "LinkedIn Career Post"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Facebook Weekend Post"
      )
    ).toBeInTheDocument();
  });

});