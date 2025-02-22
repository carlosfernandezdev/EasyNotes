import { query } from "../config/db.js";

export const getNotes = async (req, res) => {
  const { user_id } = req.params; // Se obtiene el ID del usuario desde la URL

  try {
    const notes = await query("SELECT * FROM notes WHERE user_id = $1", [user_id]);
    res.json(notes.rows);
  } catch (error) {
    console.error("Error al obtener notas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const createNote = async (req, res) => {
  const { title, content, user_id } = req.body;

  if (!user_id || !title || !content) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const newNote = await query(
      "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, user_id]
    );
    res.json(newNote.rows[0]);
  } catch (error) {
    console.error("Error al crear nota:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const updateNote = async (req, res) => {
  const { id_nota } = req.params;
  const { content, user_id } = req.body;

  try {
    await query("UPDATE notes SET content = $1 WHERE id_nota = $2 AND user_id = $3", [content, id_nota, user_id]);
    res.json({ message: "Nota actualizada" });
  } catch (error) {
    console.error("Error al actualizar nota:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const deleteNote = async (req, res) => {
  const { id_nota } = req.params;
  const { user_id } = req.body;

  try {
    await query("DELETE FROM notes WHERE id_nota = $1 AND user_id = $2", [id_nota, user_id]);
    res.json({ message: "Nota eliminada" });
  } catch (error) {
    console.error("Error al eliminar nota:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

