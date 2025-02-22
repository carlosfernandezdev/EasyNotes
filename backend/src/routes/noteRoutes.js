import { Router } from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/noteController.js";

const router = Router();

router.get("/:user_id", getNotes);
router.post("/", createNote);  
router.put("/:id_nota", updateNote);
router.delete("/:id_nota", deleteNote);

export default router;
