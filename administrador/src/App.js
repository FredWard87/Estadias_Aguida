import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from './components/Home/Inicio';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/home" element={<Inicio/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
