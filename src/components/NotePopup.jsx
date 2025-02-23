import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // 👈 Importa el contexto
import "./NotePopup.css";

const NotePopup = ({ note, onClose, setNotes, isNew }) => {
  const { user: currentUser } = useContext(AuthContext); // 👈 Obtiene user del contexto
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [isLoading, setIsLoading] = useState(false);

  console.log("🟠 currentUser en NotePopup:", currentUser); // 👈 Verifica si es undefined

  if (!currentUser || !currentUser.id) {
    console.error("🚨 Error: currentUser es undefined o no tiene ID en NotePopup");
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <p>Error: No se ha cargado el usuario.</p>
          <button className="close-btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("⚠️ El título y el contenido no pueden estar vacíos.");
      return;
    }

    setIsLoading(true);

    try {
      const newNote = { title, content, user_id: currentUser.id };
      console.log("📌 Enviando nota con user_id:", newNote);

      const response = await fetch("http://localhost:5000/api/notes", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("❌ Error al guardar la nota.");
      }

      const data = await response.json();
      console.log("✅ Respuesta del servidor:", data);

      if (isNew) {
        setNotes((prevNotes) => [...prevNotes, data]);
      } else {
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id_nota === note.id_nota ? data : n))
        );
      }

      onClose();
    } catch (error) {
      console.error("🚨 Error al guardar nota:", error);
      alert(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <input
          className="title-input"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="content-textarea"
          placeholder="Escribe tu nota aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="popup-buttons">
          <button className="save-btn" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
          <button className="close-btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

NotePopup.propTypes = {
  note: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  setNotes: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default NotePopup;
