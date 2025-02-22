import { query } from "../config/db.js";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    console.log("Intentando registrar usuario:", username);

    // Verificar si el usuario ya existe
    const userExists = await query("SELECT * FROM users WHERE username = $1", [username]);

    if (userExists.rows.length > 0) {
      console.log("❌ El usuario ya existe en la base de datos.");
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Insertar el nuevo usuario
    await query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );

    console.log("✅ Usuario registrado con éxito:", username);
    res.status(201).json({ message: "Usuario registrado con éxito." });

  } catch (error) {
    console.error("🚨 Error en el registro:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Intentando iniciar sesión con:", username);

    const result = await query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      console.log("❌ Usuario no encontrado en la base de datos.");
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    console.log("🔍 Usuario encontrado:", user);

    // Verificar si la contraseña coincide
    if (user.password !== password) {
      console.log("❌ Contraseña incorrecta.");
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    console.log("✅ Inicio de sesión exitoso:", user.username);
    res.json({ id: user.id, username: user.username });

  } catch (error) {
    console.error("🚨 Error en el login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export { registerUser, loginUser };
