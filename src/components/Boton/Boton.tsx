import React from 'react';
import './Boton.css'; // Asegúrate de incluir el CSS del botón

const Boton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
<label className="switch">
  <input className="checkbox" type="checkbox" onClick={onClick} />
  <span className="slider round"></span>
</label>
  );
};

export default Boton;