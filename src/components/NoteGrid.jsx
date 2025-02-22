import PropTypes from "prop-types";
import { useState } from "react";
import NotePopup from "./NotePopup";
import "./NoteGrid.css";

const NoteGrid = ({ notes = [], setNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleDelete = async (id_nota, user_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id_nota}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });

      if (response.ok) {
        setNotes(notes.filter((note) => note.id_nota !== id_nota));
      }
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  return (
    <main className="note-grid">
      {notes.map((note) => (
        <div key={note.id_nota} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content.length > 50 ? note.content.substring(0, 50) + "..." : note.content}</p>
          <div className="note-actions">
            <button className="view-btn-grid" onClick={() => setSelectedNote(note)}>🔍 Ver</button>
            <button className="delete-btn-grid" onClick={() => handleDelete(note.id_nota, note.user_id)}>🗑️ Eliminar</button>
          </div>
        </div>
      ))}

      {selectedNote && (
        <NotePopup
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          setNotes={setNotes}
          notes={notes}
        />
      )}
    </main>
  );
};

NoteGrid.propTypes = {
  notes: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteGrid;
