import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",         
  host: "localhost",     
  database: "notas_app", 
  password: "0209", 
  port: 5432,           
});

pool.connect()
  .then(() => console.log("📡 Conectado a la base de datos"))
  .catch((err) => console.error("🚨 Error al conectar a la base de datos:", err));

const query = async (query, values) => {
  return await pool.query(query, values);
};

export { query };
