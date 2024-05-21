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
    EquipoAuditor: [],
    Observador: false,
    NombresObservadores: '',
    Programa: []
  });

  const [formStep, setFormStep] = useState(1);
  const [areas, setAreas] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showOtherAreaInput, setShowOtherAreaInput] = useState(false);
  const [auditorLiderSeleccionado, setAuditorLiderSeleccionado] = useState('');
  const [equipoAuditorDisabled, setEquipoAuditorDisabled] = useState(false);

  

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

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/programas`);
        setProgramas(response.data);
      } catch (error) {
        console.error("Error al obtener los programas", error);
      }
    };

    fetchProgramas();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/usuarios`);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    };
  
    fetchUsuarios();
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
      if (name === 'AuditorLider') {
        setAuditorLiderSeleccionado(value);
      } else if (name === 'EquipoAuditor') {
        if (value === 'No aplica') {
          setFormData({
            ...formData,
            EquipoAuditor: []
          });
          setEquipoAuditorDisabled(true);
        } else {
          setFormData(prevFormData => {
            const newEquipoAuditor = [...prevFormData.EquipoAuditor];
            if (newEquipoAuditor.includes(value)) {
              const index = newEquipoAuditor.indexOf(value);
              newEquipoAuditor.splice(index, 1);
            } else {
              newEquipoAuditor.push(value);
            }
            return {
              ...prevFormData,
              EquipoAuditor: newEquipoAuditor
            };
          });
          setEquipoAuditorDisabled(false);
        }
      }
    }

    if (name === 'AreasAudi' && value === 'Otro') {
      setShowOtherAreaInput(true);
      setFormData({
        ...formData,
        AreasAudi: '' // Clear AreasAudi to allow typing
      });
    } else if (name === 'AreasAudi' && !showOtherAreaInput) {
      setShowOtherAreaInput(false);
    }
  };

  const handleAreaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePrevious = () => {
    setFormStep(prevStep => prevStep - 1);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (showOtherAreaInput) {
      // No hagas nada aquí, espera a que se haga clic en "Generar"
    }
    setFormStep(prevStep => prevStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (formData.Programa.length === 0) {
        alert("Por favor, seleccione al menos un programa.");
        return; // Detener el envío del formulario si no se ha seleccionado ningún programa
      }

      if (showOtherAreaInput) {
        const newArea = { NombreArea: formData.AreasAudi };
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/areas`, newArea);
        alert("Nueva área agregada con éxito");
        const addedArea = response.data;
  
        setAreas(prevAreas => [...prevAreas, addedArea]); // Update the areas list with the new area
  
        setFormData({
          ...formData,
          AreasAudi: addedArea._id // Update AreasAudi with the new area's ID
        });
  
        setShowOtherAreaInput(false);
      }
  
      console.log('Datos a enviar:', formData); // Agregar esta línea para depurar
  
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
        Programa: []
      });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert("Error al guardar los datos");
    }
  };

  const handleEquipChange = (e) => {
    const { value } = e.target;
    if (!equipoAuditorDisabled) {
      if (value && !formData.EquipoAuditor.includes(value)) {
        setFormData({
          ...formData,
          EquipoAuditor: [...formData.EquipoAuditor, value]
        });
      }
    }
  };

  const handleEquipRemove = (equip) => {
    setFormData({
      ...formData,
      EquipoAuditor: formData.EquipoAuditor.filter(e => e !== equip)
    });
  };

  const handleProgramChange = (e) => {
    const { value } = e.target;
    if (value && !formData.Programa.includes(value)) {
      setFormData({
        ...formData,
        Programa: [...formData.Programa, value]
      });
    }
  };

  const handleProgramRemove = (program) => {
    setFormData({
      ...formData,
      Programa: formData.Programa.filter(p => p !== program)
    });
  };

  return (
    <div className="registro-container">
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <Navigation />
      </div>
      {formStep === 1 && (
        <form onSubmit={handleNext}>
          <h2>Datos generales:</h2> 
          <div className="registro-form">
          <div className="form-group" >
            <label>Tipo de auditoria:</label>
            <select name="TipoAuditoria" value={formData.TipoAuditoria} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="Interna">Interna</option>
              <option value="Cliente">Cliente</option>
              <option value="FSSC 22000">FSSC 22000</option>
              <option value="Responsabilidad social">Responsabilidad social</option>
              <option value="Inspección de autoridades">Inspección de autoridades</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Duracion de la auditoria:</label>
            <input type="text" name="Duracion" value={formData.Duracion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Áreas auditadas:</label>
            {showOtherAreaInput ? (
              <div>
                <input
                  type="text"
                  name="AreasAudi"
                  value={formData.AreasAudi}
                  onChange={handleAreaChange}
                  placeholder="Escribe el nombre del área"
                  required
                />
                <button type="button" onClick={() => setShowOtherAreaInput(false)}>Cancelar</button>
              </div>
            ) : (
              <select name="AreasAudi" value={formData.AreasAudi} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                {areas.map(area => (
                  <option key={area._id} value={area.NombreArea}>{area.NombreArea}</option>
                ))}
                <option value="Otro">Otro</option>
              </select>
            )}
          </div>
          <div className="form-group">
            <label>Auditados:</label>
            <select name="Auditados" value={formData.Auditados} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              {usuarios && usuarios.filter(usuario => usuario.TipoUsuario === 'auditado').map(usuario =>(
                <option key={usuario._id} value={usuario.Nombre}>{usuario.Nombre}</option>
              ))}
            </select>
          </div>
          </div>
          <button type="submit" className="btn-registrar">Siguiente</button>
        </form>
      )}

      {formStep === 2 && (
        <form onSubmit={handleNext}>
          <h2>Datos del Auditor:</h2>
          <div className="form-group">
            <label>Auditor Líder:</label>
            <select name="AuditorLider" value={formData.AuditorLider} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              {usuarios && usuarios.filter(usuario => usuario.TipoUsuario === 'auditor').map(usuario => (
                <option key={usuario._id} value={usuario.Nombre}>{usuario.Nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Equipo Auditor:</label>
            <select name="Equipo Auditor" value="" onChange={handleEquipChange} disabled={equipoAuditorDisabled}>
              <option value="">Seleccione...</option>
              <option value="No aplica">No aplica</option>
              {usuarios && usuarios.filter(usuario => usuario.TipoUsuario === 'auditor' && usuario.Nombre !== auditorLiderSeleccionado).map(usuario => (
                <option key={usuario._id} value={usuario.Nombre}>{usuario.Nombre}</option>
              ))}
            </select>
          </div>
          <div className="selected-programs">
            {formData.EquipoAuditor.map((equip, index) => (
              <div key={index} className="selected-program">
                {equip}
                <button type="button" onClick={() => handleEquipRemove(equip)}>X</button>
              </div>
            ))}
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
            <select name="Programa" value="" onChange={handleProgramChange}>
              <option value="">Seleccione...</option>
              {programas.map(programa => (
                <option key={programa._id} value={programa.Nombre}>{programa.Nombre}</option>
              ))}
            </select>
          </div>
          <div className="selected-programs">
            {formData.Programa.map((program, index) => (
              <div key={index} className="selected-program">
                {program}
                <button type="button" onClick={() => handleProgramRemove(program)}>X</button>
              </div>
            ))}
          </div>
          <button type="button" className="btn-registrar" onClick={handlePrevious}>Regresar</button>
          <button type="submit" className="btn-registrar">Generar</button>
        </form>
      )}
    </div>
  );
};

export default Datos;
