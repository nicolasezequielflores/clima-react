import { useState } from "react"
import axios from "axios"
import './style/weather.css'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Weather = () => {
    
    //Efecto Scroll
    gsap.registerPlugin(ScrollTrigger);
    const efectoBusqueda = useRef();

    useGSAP(() =>{
        gsap.from(efectoBusqueda.current,
            {
                y: -500,
                duration: 1,
                opacity: 0,
                scrollTrigger: {
                    trigger: efectoBusqueda.current,
                    start: "top 30%",
                    end: "bottom 50%",
                    once: true,
                }
            },
            
        )
    })

    //API
    const [ciudad, setCiudad] = useState('');
    const [datosClima, setDatosClima] = useState(null);
    const [error, setError] = useState('');

    const claveAPI = import.meta.env.VITE_AK;

    const obtenerClima = async () => {
        try{
            setError('');
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`,
                {
                    params: {
                        q: ciudad,
                        appid: claveAPI,
                        units: 'metric',
                        lang: 'es',
                    }
                }
            );
            setDatosClima(response.data)
        }

        catch(err){
            console.log(err)
            setError('No se pudo encontrar la ciudad. Verifica el nombre e inténtalo nuevamente.');
        }
    };

    //Evento para buscar con "ENTER"
    const envioEnter = (e) =>{
        if(e.key === 'Enter'){
            obtenerClima()
        }
       
    }

    return (
        <div className="datos">
            <div className="card" ref={efectoBusqueda}>
            <div className="titContWeather">
                <p className="tit">Busca una ciudad</p>
            </div>
 
            <div className="cont">
                <input 
                    type="text"
                    placeholder="Ingresa un ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    onKeyUp={envioEnter}
                    className="buscadorCiudad"
                    id="busqueda"
                />
                <button onClick={obtenerClima} className="btnBuscar">
                    <img src="/search.svg" alt="buscar" className="imgBuscar"/>
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {datosClima && (
                <div className="datosClima">
                    <div className="tempCont">
                        <img 
                            src={`https://openweathermap.org/img/wn/${datosClima.weather[0].icon}@2x.png`} 
                            alt={datosClima.weather[0].description} 
                            className="climaIcono" 
                        />
                        <p className="temp">{Math.floor(datosClima.main.temp)}°</p>
                    </div>
                    <div className="ubiCont">
                        <div className="contUbi">
                            <img src="/ubicacion.svg" alt="logo ubicacion" className="ubiLogo"/>
                            <p className="nombreCiudad">{datosClima.name}, {datosClima.sys.country}</p>
                        </div>
                        
                    </div>
        
                    <div className="vientHum">
                        <div className="containerHv">
                            <img src="/humedad.svg" alt="humedad logo" className="hvLogo"/>
                            <p className="hvText">{datosClima.main.humidity} %</p>
                        </div>
                        <div className="containerHv">
                            <img src="/viento.svg" alt="viento logo" className="hvLogo"/>
                            <p className="hvText">{datosClima.wind.speed} m/s</p>
                        </div>                     
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Weather