import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tasks from "./Tasks";
import userEvent from "@testing-library/user-event";

//Unit test for Checkbox
test("click checkbox", () => {
	render(
		<div>
			<label htmlFor="checkbox">Check</label>
			<input id="checkbox" type="checkbox" />
		</div>,
	);

	userEvent.click(screen.getByText("Check"));
	expect(screen.getByLabelText("Check")).toBeChecked();
});

//Unit test to check Task Names are properly displayed in the list
test("renders task name in the list", async () => {
	render(
		<BrowserRouter>
			<Tasks />
		</BrowserRouter>,
	);
	const linkElement = await screen.findByText(/Explore World/i);
	expect(linkElement).toBeInTheDocument();
});

//Unit test to input field is empty when page is loaded
test("To do input should be empty", () => {
	render(
		<BrowserRouter>
			<Tasks />
		</BrowserRouter>,
	);
	const InputEl = screen.getByPlaceholderText(/To do today/i);
	expect(InputEl.value).toBe("");
});
