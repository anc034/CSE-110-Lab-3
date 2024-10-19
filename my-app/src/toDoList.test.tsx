import { ToDoList } from "./toDoList";
import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList } from "./constants";

test("checks if all items in the list are on screen", () => {
    render(<ToDoList />);

    for(const entry of dummyGroceryList){
        expect(screen.getByText(entry.name)).toBeInTheDocument();
    }
   });

   test("checks if the numbered of items rendered in the title is the same as the list", () => {
    render(<ToDoList />);

    const button = screen.getAllByRole("checkbox");

    fireEvent.click(button[0]);

    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
    fireEvent.click(button[0]);
    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();


   });
