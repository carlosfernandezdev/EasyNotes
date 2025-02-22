import PropTypes from "prop-types";
import { useState } from "react";
import NotePopup from "./NotePopup";
import "./NoteSidebar.css";

const NoteSidebar = ({ notes, setNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <aside className="sidebar">
      <h2>EasyNotes</h2>
      <button onClick={() => setIsCreating(true)}>+ Nueva Nota</button>
      <ul className="sidebar-list">
  {notes.map((note) => (
    <li 
      key={note.id_nota}  /* 🔹 Mantenemos `id_nota` como clave única */
      className="sidebar-item" 
      onClick={() => setSelectedNote(note)}
    >
      {note.title}
    </li>
  ))}
</ul>


      {selectedNote && (
        <NotePopup
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          setNotes={setNotes}
          notes={notes}
        />
      )}

      {isCreating && (
        <NotePopup
          onClose={() => setIsCreating(false)}
          setNotes={setNotes}
          notes={notes}
          isNew={true}
        />
      )}
    </aside>
  );
};

NoteSidebar.propTypes = {
  notes: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteSidebar;
