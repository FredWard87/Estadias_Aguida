
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Usuarios from "./Components/RegistroUsuarios/Usuarios";
import Login from "./Components/login/LoginForm"; // Importa el componente de inicio de sesión
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from './components/Home/Inicio';
import Datos from './components/DatosGenerales/Datos';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/home" element={<Inicio/>}/>
            <Route path="/datos" element={<Datos/>}/>
<<<<<<< HEAD
=======
            <Route path="/areas" element={<Areas/>}/>
            <Route path="/" element={<Login />} /> {/* Cambia la ruta raíz a la ruta de inicio de sesión */}
          <Route path="/usuarios" element={<Usuarios />} />
>>>>>>> 269529551e0246c352e17b303b3a92a77cdc14bb
          </Routes>
        </Router>
    </div>
  );
}

export default App;
