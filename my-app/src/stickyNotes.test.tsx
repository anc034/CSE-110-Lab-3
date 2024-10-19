import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

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
  

  for(const note of dummyNotesList){
    expect(screen.getByText(note.title)).toBeInTheDocument();
  }

 });

 //Update
 test("Check if updated", () => {
  render(<StickyNotes />);

  const updateNoteTitle = screen.getByTestId("note-title-1");
  updateNoteTitle.innerHTML = "end my suffering";
  fireEvent.input(updateNoteTitle);
  expect(screen.getByText("end my suffering")).toBeInTheDocument();




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

// 0 sticky notes edge case
 test("Check if 0 sticky notes", () => {
  render(<StickyNotes />);

  for(const entry of dummyNotesList){
    const noteTitle = screen.getByText(entry.title);
    const deleteButton = screen.getAllByText("x")[0];
    fireEvent.click(deleteButton);
 }
 // logic is that for any note that exists there will be an x in the document due to the button, so if there is no x, there is no button, and therefore 0 notes.
 expect(screen.queryByText("x")).not.toBeInTheDocument();
});

});
