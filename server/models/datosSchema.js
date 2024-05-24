const mongoose = require("mongoose");

const DatosSchema = new mongoose.Schema({
  TipoAuditoria: { type: String, required: true },
  Duracion: { type: String, required: true },
  AreasAudi: { type: String, required: true },
  Auditados: { type: String, required: true },
  AuditorLider: { type: String, required: true },
  EquipoAuditor: { type: [String], required: true },
  Observador: { type: Boolean, required: true },
  NombresObservadores: { type: String, required: false },
  Programa: [
    {
      Nombre: { type: String, required: true },
      Descripcion: { type: [String], required: true }
    }
  ],
  Estado: { type: String, required: false },
  Observaciones: { type: String, required: false }
});

module.exports = mongoose.model("Datos", DatosSchema);
