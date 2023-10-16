import { fireEvent, render } from "@testing-library/react";
import { Button } from "./";
import "@testing-library/jest-dom";

describe("Button component tests", () => {
  it("should render the Button component correctly", () => {
    const { getByText, getByRole } = render(
      <Button title={`Next page`} disabled={false} click={() => null} />
    );

    const button = getByRole("button");
    const buttonTextElement = getByText("Next page");

    expect(button).toBeInTheDocument();
    expect(buttonTextElement).toBeInTheDocument();
  });

  it('should disable the button and render "Loading..." as text when disabled is true', () => {
    const { getByText } = render(
      <Button title={`Next page`} disabled={true} click={() => null} />
    );
    const isLoading = getByText(/Loading.../i);
    expect(isLoading).toBeInTheDocument();
    expect(isLoading.closest("button")).toHaveAttribute("disabled");
  });

  it("should fire the event when the button is clicked", () => {
    const clickFunction = jest.fn();
    const { getByText } = render(
      <Button title={`Next page`} disabled={false} click={clickFunction} />
    );
    const button = getByText(/Next page/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(clickFunction).toHaveBeenCalled();
  });
});
