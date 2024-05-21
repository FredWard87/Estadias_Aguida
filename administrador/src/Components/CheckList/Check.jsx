import React from 'react';

const ProgramTable = ({ programas }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre del Programa</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {programas.map((programa, index) => (
          <tr key={index}>
            <td>{programa.Nombre}</td>
            <td>
              <ul>
                <li>{programa.Descripcion.Primero}</li>
                <li>{programa.Descripcion.Segundo}</li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramTable;