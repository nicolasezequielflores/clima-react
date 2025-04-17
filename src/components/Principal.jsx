import './style/principal.css'
import './style/weather.css'

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Principal = () => {

  gsap.registerPlugin(useGSAP);

  const  efecto = useRef();
  

  useGSAP(() =>{
    gsap.fromTo(efecto.current, {
      y: 1000,
    
    },
  {
    y: 0,
    duration: 1.2,
    ease: "power3.inOut",

  })

  });

  return (
    <div className="principal" id='principal'>
      <div className="contHero" ref={efecto}>
          <h1>Descubre el clima <span className='textDos'>en cualquier parte del mundo</span>🌦️</h1>
          <a href="#busqueda" className='busqueda'>Ir a consultar clima <img src="/arrow-left.svg" alt="flecha izquierda" className='arrowLeft'/> </a>
      </div>
    </div>
  )
}

export default Principal