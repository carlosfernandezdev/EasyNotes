import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NoteSidebar from "../components/NoteSidebar";
import NoteGrid from "../components/NoteGrid";
import NoteCarousel from "../components/NoteCarousel"; 
import "./Home.css";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); 

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/notes/${user.id}`)
        .then((res) => res.json())
        .then((data) => setNotes(data))
        .catch((err) => console.error("Error al cargar notas:", err));
    }
  }, [user]);

  return (
    <div className="home-container">
      <NoteSidebar notes={notes} setNotes={setNotes} />
      <div className="main-content">
        <header>
          <h2>Bienvenido, {user?.username}!</h2>
         <div className="btn-container"> <button onClick={() => setViewMode(viewMode === "grid" ? "carousel" : "grid")} className="toggle-btn">
            {viewMode === "grid" ? "Ver Carrusel" : "Ver Grid"}
          </button>
          <button className="logout-btn" onClick={logout}>
            <span className="logout-btn-one">Cerrar Sesión</span>
            <span className="logout-btn-two">Hasta luego!</span>
          </button>
          </div>
        </header>

        {viewMode === "grid" ? (
          <NoteGrid notes={notes} setNotes={setNotes} />
        ) : (
          <NoteCarousel notes={notes} />
        )}
      </div>
    </div>
  );
};

export default Home;
