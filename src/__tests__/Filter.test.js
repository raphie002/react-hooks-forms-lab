import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/Filter";
import ShoppingList from "../components/ShoppingList";

const testData = [
  { id: 1, name: "Yogurt", category: "Dairy" },
  { id: 2, name: "Pomegranate", category: "Produce" },
  { id: 3, name: "Lettuce", category: "Produce" },
  { id: 4, name: "String Cheese", category: "Dairy" },
  { id: 5, name: "Swiss Cheese", category: "Dairy" },
  { id: 6, name: "Cookies", category: "Dessert" },
];

// Filter
// CORRECTED Filter Tests
const noop = () => {};
test("uses a prop of 'searchTerm' to display the search term in the input field", () => {
  render(<Filter searchTerm="testing" onSearchChange={noop} />); // Changed 'search' to 'searchTerm'

  expect(screen.queryByPlaceholderText(/Search/).value).toBe("testing");
});

test("calls the onSearchChange callback prop when the input is changed", () => {
  const onChange = jest.fn();
  render(<Filter searchTerm="testing" onSearchChange={onChange} />); // Changed 'search' to 'searchTerm'

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "testing123" },
  });

  expect(onChange).toHaveBeenCalled();
});

// Shopping List
test("the shopping list displays all items when initially rendered", () => {
  const { container } = render(<ShoppingList items={testData} />);
  expect(container.querySelector(".Items").children).toHaveLength(
    testData.length
  );
});

test("the shopping filters based on the search term to include full matches", () => {
  render(<ShoppingList items={testData} />);

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "Yogurt" },
  });

  expect(screen.queryByText("Yogurt")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "Lettuce" },
  });

  expect(screen.queryByText("Lettuce")).toBeInTheDocument();
  expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
});

test("the shopping filters based on the search term to include partial matches", () => {
  render(<ShoppingList items={testData} />);

  fireEvent.change(screen.queryByPlaceholderText(/Search/), {
    target: { value: "Cheese" },
  });

  expect(screen.queryByText("Swiss Cheese")).toBeInTheDocument();
  expect(screen.queryByText("String Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
  expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
});
