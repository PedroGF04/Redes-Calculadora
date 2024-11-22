import React from 'react'; 
function InputIP({ value, onChange }) { 
  return ( 
    <div> 
      <label style={{
      textAlign: 'right',
      flex: '1',
      }}>Dirección IP:</label> 
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        style={{ flex: '2',
          border: '1px solid #ccc', // Borde gris claro
          borderRadius: '4px', // Bordes redondeados
          padding: '0.5rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Efecto de relieve
          transition: 'all 0.3s ease', // Transición suave
          width: '300px',
        }} 
      /> 
    </div> 
  ); 
} 
 
export default InputIP;