import PropTypes from "prop-types";
import { useState } from "react";
import "./NotePopup.css";

const NotePopup = ({ note, onClose, setNotes, isNew }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("⚠️ El título y el contenido no pueden estar vacíos.");
      return;
    }

    setIsLoading(true);

    try {
      let response, data;

      if (isNew) {
        console.log("📌 Creando nueva nota...");
        const newNote = { title, content, user_id: 1 };

        response = await fetch("http://localhost:5000/api/notes", {  
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote),
        });

        console.log("📌 Respuesta de la API:", response);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("❌ La API no devolvió JSON. Verifica el backend.");
        }

        data = await response.json();
        if (!response.ok) throw new Error(data.error || "Error al crear la nota.");

        console.log("✅ Nueva nota creada:", data);
        setNotes((prevNotes) => [...prevNotes, data]);  
      } else {
        console.log("📌 Editando nota existente...");
        const updatedNote = { title, content, user_id: note.user_id };

        response = await fetch(`http://localhost:5000/api/notes/${note.id_nota}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedNote),
        });

        console.log("📌 Respuesta de la API:", response);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("❌ La API no devolvió JSON. Verifica el backend.");
        }

        data = await response.json();
        if (!response.ok) throw new Error(data.error || "Error al actualizar la nota.");

        console.log("✅ Nota actualizada:", data);
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id_nota === note.id_nota ? { ...n, title, content } : n))
        );
      }

      onClose();
    } catch (error) {
      console.error("🚨 Error en la operación de la nota:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Escribe tu nota aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="popup-buttons">
          <button onClick={handleSave} className="save-btn" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
          <button onClick={onClose} className="close-btn">Cerrar</button>
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
