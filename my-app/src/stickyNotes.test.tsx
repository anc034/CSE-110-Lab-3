import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();

 });

 //Read
 test("renders create note form", () => {
  render(<StickyNotes />);

  expect(screen.getByText("test note 1 title")).toBeInTheDocument();
  expect(screen.getByText("test note 1 content")).toBeInTheDocument();
  expect(screen.getByText("other")).toBeInTheDocument();

  expect(screen.getByText("test note 3 title")).toBeInTheDocument();
  expect(screen.getByText("test note 3 content")).toBeInTheDocument();
  expect(screen.getByText("work")).toBeInTheDocument();

 });

 //Update
 test("Check if updated", () => {
  render(<StickyNotes />);



 });

 //Delete
 test("Check if note deleted", () => {
  render(<StickyNotes />);

  const noteTitle = screen.getByText("test note 5 title");
  //logic here is that the method where u find the delete button goes in the () of closest and what you're looking for is the querySelector (button here = first button)
  const deleteButton = screen.getAllByText("x")[0];

  fireEvent.click(deleteButton);

  expect(screen.queryByText("test note 1 title")).not.toBeInTheDocument();

 });

});