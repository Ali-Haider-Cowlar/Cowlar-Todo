import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tasks from "./Tasks";
import userEvent from "@testing-library/user-event";

//Test for Displaying the Input Field
test("renders input field", () => {
  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>
  );
  const inputElement = screen.getByPlaceholderText("Type here");
  expect(inputElement).toBeInTheDocument();
});

//Unit test for Displaying an Error
it("should display an error if adding a task with an empty input", () => {
  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>
  );
  const addButton = screen.getByText("Add New Task");
  fireEvent.click(addButton);
  waitFor(() =>
    expect(screen.getByText("Enter Task Name")).toBeInTheDocument()
  );
});

//Unit test for Checkbox
test("click checkbox", async () => {
  render(
    <div>
      <label htmlFor="checkbox">Check</label>
      <input id="checkbox" type="checkbox" />
    </div>
  );

  userEvent.click(screen.getByText("Check"));
  expect(screen.getByLabelText("Check")).toBeChecked();
});

//Unit test to check Task Names are properly displayed in the list
test("renders task name in the list", async () => {
  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>
  );
  const linkElement = await screen.findByText(/Explore World/i);
  expect(linkElement).toBeInTheDocument();
});

//Unit test to input field is empty when page is loaded
test("To do input should be empty", () => {
  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>
  );
  const InputEl = screen.getByPlaceholderText(/Type here/i);
  expect(InputEl.value).toBe("");
});
