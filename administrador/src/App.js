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
          </Routes>
        </Router>
    </div>
  );
}

export default App;
