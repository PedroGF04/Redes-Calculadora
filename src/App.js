import React, { useState } from 'react';
import InputIP from './js/components/InputIP';
import InputMask from './js/components/InputMask';
import InputSubnetMask from './js/components/InputSubnetMask';
import Resultados from './js/components/Resultados';
import calcularSubred from './js/utils/calculos';
import buttonStyle from './button.module.css'
function App() {
  const [ip, setIp] = useState('');
  const [mask, setMask] = useState(24);
  const [subnetMask, setSubnetMask] = useState(null);
  const [resultados, setResultados] = useState(null);

  const handleCalcular = () => {
    const resultadosCalculados = calcularSubred(ip, mask, subnetMask);
    setResultados(resultadosCalculados);
  };

  return (
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  backgroundColor: '#f7f9fc', // Fondo claro
  border: '1px solid #ccc', // Borde alrededor de la página
  borderRadius: '8px', // Bordes redondeados
  padding: '2rem', // Espaciado interno
  margin: '1rem auto', // Margen automático para centrar
  maxWidth: '600px', // Ancho máximo para el contenedor
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para un efecto de relieve
}}>

<img 
    src="https://www.pngmart.com/files/23/Mha-PNG.png" 
    alt="Decoración esquina izquierda" 
    style={{
      position: 'fixed',
      top: '-20px',
      left: '-20px',
      width: '500px',
      height: '500px',
    }}
  />

  {/* Imagen decorativa en la esquina inferior derecha */}
  <img 
    src="https://th.bing.com/th/id/OIP.Fq3aq3L4dIOuAP4rbr2q2AHaGL?rs=1&pid=ImgDetMain" 
    alt="Decoración esquina derecha" 
    style={{
      position: 'fixed',
      bottom: '-20px',
      right: '-20px',
      width: '500px',
      height: '500px',
    }}
  />

  <h1 style={{
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  }}>
    Calculadora IP
  </h1>

  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    width: '300px', 
  }}>
    <InputIP 
      value={ip}
      onChange={setIp}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        width: '100%',
      }}
    />
  </div>

  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    width: '300px', 
  }}>
    <InputMask 
      label="Máscara de Red"
      value={mask}
      onChange={setMask}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        width: '100%',
      }}
    />
  </div>

  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    width: '300px', 
  }}>
    <InputSubnetMask
      label="Máscara de Subred"
      value={subnetMask}
      onChange={setSubnetMask}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        width: '100%',
      }}
    />
  </div>

  <div style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  }}>

  <div className={buttonStyle.wrap}>
  <button className={buttonStyle.button} onClick={handleCalcular}>Calcular</button>
  </div>

  </div>

  {resultados && <Resultados data={resultados} />}
</div>



  );
}

export default App;