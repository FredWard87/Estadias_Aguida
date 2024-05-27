
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Usuarios from "./Components/RegistroUsuarios/Usuarios";
import Login from "./Components/login/LoginForm"; // Importa el componente de inicio de sesión
import './App.css';
import Inicio from './Components/Home/inicio';
import Datos from './Components/DatosGenerales/Datos';
import Programas from './Components/ProgramasIn/Programa';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/home" element={<Inicio/>}/>
            <Route path="/programa" element={<Programas/>}/>
            <Route path="/datos" element={<Datos/>}/>
            <Route path="/" element={<Login />} /> {}
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
