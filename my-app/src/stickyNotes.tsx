import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from "./hooksExercise";
import ToggleTheme from "./hooksExercise";
import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";

export const StickyNotes = () => {
  const theme = useContext(ThemeContext);

  const [likedNotes, setlikedNotes] = useState<string[]>([]);
  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };
  console.log("hi");
  console.log(likedNotes);

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          ></input>
        </div>

        <div>
          <textarea
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>
        </div>

        <div>
          <select
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <ClickCounter
                title={note.title}
                likedNotes={likedNotes}
                handleLike={setlikedNotes}
              />
              <button
                onClick={() => {
                  setNotes(notes.filter((n) => n.id !== note.id));
                }}
              >
                x
              </button>
            </div>
            <h2 contentEditable="true"> {note.title} </h2>
            <p contentEditable="true"> {note.content} </p>
            <p contentEditable="true"> {note.label} </p>
          </div>
        ))}
      </div>
      <div className="favorites" style={{ color: theme.foreground }}>
        <h2>List of favorites: </h2>
        <p>{likedNotes.join("\n")}</p>
      </div>
    </div>
  );
};
