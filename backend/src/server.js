import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { query } from "./config/db.js"; 

const app = express();
app.use(cors());
app.use(json());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas para CRUD de notas
app.use("/api/notes", noteRoutes);

query("SELECT 1")
  .then(() => {
    console.log("📡 Conectado a la base de datos correctamente.");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("🚨 Error al conectar a la base de datos:", err);
    process.exit(1); // Finaliza el servidor si no hay conexión a la DB
  });
