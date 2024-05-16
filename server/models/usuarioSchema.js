const mongoose = require("mongoose");

const UsuariosSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Correo: { type: String, required: true },
  Contraseña: { type: String, required: true },
  Puesto: { 
    type: String, 
    required: function() { 
      return this.TipoUsuario === 'auditor'; 
    } 
  },
  FechaIngreso: { 
    type: Date, 
    required: function() { 
      return this.TipoUsuario === 'auditor'; 
    } 
  },
  Escolaridad: { 
    type: String, 
    required: function() { 
      return this.TipoUsuario === 'auditor'; 
    } 
  },
  TipoUsuario: { type: String, required: true }
});

// Quitamos la validación requerida para Escolaridad y Puesto si el TipoUsuario no es "auditor"
UsuariosSchema.path('Escolaridad').validate(function(value) {
  return this.TipoUsuario !== 'auditado' || !value;
}, 'Escolaridad is not allowed for auditado type');

UsuariosSchema.path('Puesto').validate(function(value) {
  return this.TipoUsuario !== 'auditado' || !value;
}, 'Puesto is not allowed for auditado type');

module.exports = mongoose.model("Usuarios", UsuariosSchema);
