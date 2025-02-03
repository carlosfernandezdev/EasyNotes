

const Register = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>Registro</h1>
        <form>
          <input type="text" placeholder="Nombre de Usuario" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
