import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from "./hooksExercise";
import ToggleTheme from "./hooksExercise";
import { useContext, useState } from "react";
import { ThemeContext } from "./themeContext";

function App() {
  const theme  = useContext(ThemeContext);

  const [likedNotes, setlikedNotes] = useState<string[]>([]);


  return (
     <div className="app-container" style = {{backgroundColor: theme.background, color: theme.foreground,}}>
      <form className="note-form">
        <div>
          <input placeholder="Note Title"></input>
        </div>

        <div>
          <textarea></textarea>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>
      <div className="notes-grid" >
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item" style = {{color : "#000000"}}>
            <div className="notes-header">
              {ClickCounter(note.title, likedNotes, setlikedNotes)}
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
      <div className = "favorites">
      <h2>List of favorites: </h2>
      <p>{likedNotes.join("\n")}</p>
      </div>
    </div>
  );
}

export default App;
