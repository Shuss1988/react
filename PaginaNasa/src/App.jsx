
import React, { useState, useEffect } from 'react'
import Figure from './components/Figure/Figure';
import './App.css'
import axios from 'axios';


function App() {
  //Recuperamos la fecha actual en un formato ISO -> 2022-01-01
const today = new Date(Date.now()).toISOString().slice(0, 10);
//Creamos una variable de estado llamada apod inicializada como objeto vacío
const [apod, setApod] = useState({});
//Creamos una variable de estado llamada date con la fecha del día actual formateada
const [date, setDate] = useState(today);
//Almacenamos en una constante la URL de la NASA
const NASA_URL = "https://api.nasa.gov/";
//Almacenamos en una constante nuestra API Key, esto es recomendable almacenarlo en una variable de entorno
const NASA_API_KEY = "XzpA8d6XBCpe1sdn7tVMBe8VR9UQ8pocrSaQGbdW";

//El efecto del renderizado será hacer una petición de tipo get a la URL de la NASA
//utilizando la query de la fecha con el valor de date y añadiéndole al final 
//la API Key tal como indica en la documentación.

//Una vez realizada la petición se setea el data en apod y le indicamos en el 
//array de dependencias que no vuelva a lanzar el efecto hasta que cambie el estado
//de date
  useEffect(() => {
    const getApod = async () => {
      const data = await axios.get(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
      );
      setApod(data.data);
    };
    getApod();
  }, [date]);

//Crearemos una función que setee la fecha a través de un input en el formato 
//necesario (igual que el formato de today)
  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString());
  };


  return (
    <div className="App">
    
   <div className='Header'>
      <header>
      <h1>Astronomy Picture of the Day</h1> 
      <img className='logo' src="./public/nasa.jpeg" alt="Logo nasa" />
      </header>

      <input type="date" id="photo-date" onChange={handleInput} />
      {date > today ? (
        <h2>Please choose a previous date</h2>
      ) : (
        <Figure data={apod} />
      )}
      <div className="title">
   <h1 className="title"></h1>
      </div>
  
   </div>
 
   
    </div>
  )
}

export default App