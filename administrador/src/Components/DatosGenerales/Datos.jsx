import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Datos.css';
import Navigation from "../Navigation/Navbar";

const Datos = () => {
  const [formData, setFormData] = useState({
    TipoAuditoria: '',
    Duracion: '',
    AreasAudi: '',
    Auditados: '',
    AuditorLider: '',
    EquipoAuditor: '',
    Observador: false,
    NombresObservadores: '',
    Programa: ''
  });

  const [formStep, setFormStep] = useState(1);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/areas`);
        setAreas(response.data);
      } catch (error) {
        console.error("Error al obtener las áreas", error);
      }
    };

    fetchAreas();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'Observador' && !checked) {
        setFormData({
          ...formData,
          [name]: checked,
          NombresObservadores: '' 
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setFormStep(prevStep => prevStep + 1);
  };

  const handlePrevious = () => {
    setFormStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/datos`, formData);
      alert("Guardado con éxito");
      console.log(response.data);

      // Limpiar los campos del formulario después de agregar un usuario exitosamente
      setFormData({
        TipoAuditoria: '',
        Duracion: '',
        AreasAudi: '',
        Auditados: '',
        AuditorLider: '',
        EquipoAuditor: '',
        Observador: false,
        NombresObservadores: '',
        Programa: ''
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar los datos");
    }
  };

  return (
    <div className="registro-container">
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <Navigation />
      </div>
      {formStep === 1 && (
        <form onSubmit={handleNext}>
          <h2>Datos generales:</h2>
          <div className="form-group">
            <label>Tipo de auditoria:</label>
            <select name="TipoAuditoria" value={formData.TipoAuditoria} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="Interna">Interna</option>
              <option value="Cliente">Cliente</option>
              <option value="FSSC 22000">FSSC 22000</option>
              <option value="Responsabilidad social">Responsabilidad social</option>
              <option value="Inspección de autoridades">Inspección de autoridades</option>
            </select>
          </div>
          <div className="form-group">
            <label>Duracion de la auditoria:</label>
            <input type="text" name="Duracion" value={formData.Duracion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Áreas auditadas:</label>
            <select name="AreasAudi" value={formData.AreasAudi} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              {areas.map(area => (
                <option key={area._id} value={area.nombre}>{area.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Auditados:</label>
            <input type="text" name="Auditados" value={formData.Auditados} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-registrar">Siguiente</button>
        </form>
      )}

      {formStep === 2 && (
        <form onSubmit={handleNext}>
          <h2>Datos del Auditor:</h2>
          <div className="form-group">
            <label>Auditor Líder:</label>
            <input type="text" name="AuditorLider" value={formData.AuditorLider} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Equipo Auditor:</label>
            <input type="text" name="EquipoAuditor" value={formData.EquipoAuditor} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>
              Observador
              <input type="checkbox" name="Observador" checked={formData.Observador} onChange={handleChange} />
            </label>
          </div>
          {formData.Observador && (
            <div className="form-group">
              <label>Nombre(s) observador(es):</label>
              <input type="text" name="NombresObservadores" value={formData.NombresObservadores} onChange={handleChange} />
            </div>
          )}
          <button type="button" className="btn-registrar" onClick={handlePrevious}>Regresar</button>
          <button type="submit" className="btn-registrar">Siguiente</button>
        </form>
      )}

      {formStep === 3 && (
        <form onSubmit={handleSubmit}>
          <h2>Programas:</h2>
          <div className="form-group">
            <label>Programa:</label>
            <select name="Programa" value={formData.Programa} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="Programa 1">Programa 1</option>
              <option value="Programa 2">Programa 2</option>
              <option value="Programa 3">Programa 3</option>
            </select>
          </div>
          <button type="button" className="btn-registrar" onClick={handlePrevious}>Regresar</button>
          <button type="submit" className="btn-registrar">Generar</button>
        </form>
      )}
    </div>
  );
};

export default Datos;
