import PropTypes from "prop-types";
import { useState } from "react";
import NotePopup from "./NotePopup"; 
import "./NoteCarousel.css";

const NoteCarousel = ({ notes, setNotes }) => { 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null); 

  const nextNote = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
  };

  const prevNote = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + notes.length) % notes.length);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id_nota !== id);
    setNotes(updatedNotes);

    if (notes[currentIndex].id_nota === id) {
      setSelectedNote(null);
      setCurrentIndex(0);
    }
  };

  if (notes.length === 0) {
    return <p className="no-notes">No hay notas disponibles.</p>;
  }

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={prevNote}>⬅</button>

      <div className="note-card">
        <h3 onClick={() => setSelectedNote(notes[currentIndex])}>{notes[currentIndex].title}</h3>
        <p onClick={() => setSelectedNote(notes[currentIndex])}>
          {notes[currentIndex].content.length > 50 ? notes[currentIndex].content.substring(0, 50) + "..." : notes[currentIndex].content}
        </p>

        <button className="delete-btn" onClick={() => deleteNote(notes[currentIndex].id_nota)}>🗑 Eliminar</button>
      </div>

      <button className="carousel-btn next" onClick={nextNote}>➡</button>

      {selectedNote && <NotePopup note={selectedNote} onClose={() => setSelectedNote(null)} />}
    </div>
  );
};

NoteCarousel.propTypes = {
  notes: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired, 
};

export default NoteCarousel;
