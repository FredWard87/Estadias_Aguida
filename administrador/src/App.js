
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Usuarios from "./Components/RegistroUsuarios/Usuarios";
import Login from "./Components/login/LoginForm"; // Importa el componente de inicio de sesión
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from './components/Home/Inicio';


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Cambia la ruta raíz a la ruta de inicio de sesión */}
          <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/home" element={<Inicio/>}/>
          {/* Agrega más rutas aquí si es necesario */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
