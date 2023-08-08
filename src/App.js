import { useEffect, useState } from "react";
import "./App.css";
import Icons from "./components/Icons";
import { Icon } from "@iconify/react";
function App() {
  const [search, setSearch] = useState("Malaga");
  const [values, setValues] = useState("");
  const [icon, setIcon] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const getData = async () => {
    await fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        if (data.cod >= 400) {
          setValues(false);
        } else {
          setIcon(data.weather[0].main);
          setValues(data);
        }
      })
      .catch((error) => {
        
      });
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
     
      setSearch(e.target.value);
    }
  };
  useEffect(() => {
    getData();
  }, [search]);

  return (
    <div className="infotiempo">
      <div className="container">
      <div className='logo'>
          <picture>
            <img src="./icons/codigo.png" alt="codigo" id="codigo" />
          </picture>
          <a href='/' className='intro'>APG</a>
        </div>
        <div className="busquedaContenedor">
        <div className="input-field">
          <input  onKeyDown={handleSearch} type="text" autoFocus placeholder="Escribe tu ciudad"/>
          <Icon className="botonBusqueda" icon="ic:round-search" />
        </div>
        </div>
        <div className="conticons">
            <a href="https://github.com/adrianpg10">
        <Icon icon="akar-icons:github-fill" className="iconredes" />
      </a>
      <a href="https://www.linkedin.com/in/adrian-perez-gomez/">
        <Icon icon="entypo-social:linkedin-with-circle" className="iconredes" />
      </a>
      </div>
      </div>

      <div className="card">
        {values ? (
          <div className="card-container">
            <div className="card-header">
            <h1 className="city-name">{values.name}</h1>
            </div>
            <div className="card-body">
              <div className="card-info">
            <p className="temp">{values.main.temp.toFixed(0)}&deg;</p>
            <p className="estado">{values.weather[0].description.charAt(0).toUpperCase() + values.weather[0].description.slice(1)}</p>
            <p className="temp-max-min">
            <Icon  className="temp-down" icon="fa6-solid:temperature-arrow-down" />{values.main.temp_min.toFixed(0)}&deg;{" "}•
            <Icon className="temp-up" icon="fa6-solid:temperature-arrow-up" />{values.main.temp_max.toFixed(0)}&deg;
            </p>
            </div>
            <img className="icon" src={Icons(icon)} alt="icon-weather" />
           
            </div>
            <div className="card-footer">
              <div className="contsensacion">
                <p>Sensacion</p>
                <p className="gradostemp">{values.main.feels_like.toFixed(0)}&deg;</p>
              </div>
              <div className="conttiempo">
                <Icon style={{fontSize:"1.7rem"}} icon="carbon:humidity" />
                <p style={{marginLeft:"0.5rem"}}>Humedad</p>
                <p className="especifico">{values.main.humidity}%</p>
              </div>
              <div className="conttiempo">
                <Icon style={{fontSize:"1.7rem"}} icon="carbon:pressure-filled" />
                <p style={{marginLeft:"0.5rem"}}>Presión</p>
                <p className="especifico">{values.main.pressure} mb</p>
              </div>
              <div className="conttiempo">
                <Icon style={{fontSize:"1.7rem"}} icon="ph:wind-bold" />
                <p style={{marginLeft:"0.5rem"}}>Viento</p>
                <p className="especifico">
                  {(values.wind.speed * 3.6).toFixed(2)} km/h
                </p>
              </div>
              <div className="conttiempo">
                <Icon style={{fontSize:"1.7rem"}} icon="material-symbols:visibility" />
                <p style={{marginLeft:"0.5rem"}}>Visibilidad</p>
                <p className="especifico">
                  {(values.visibility * 0.001).toFixed(2)} km{" "}
                </p>
              </div>
            </div>

          </div>
        ) : (
          <h1>{"La ciudad que has escrito no existe."}</h1>
        )}
      </div>
      
    </div>
  );
}

export default App;
