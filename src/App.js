import React from 'react';
import {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

import axios from 'axios'

function App() {

  const [busquedaLetra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('')
  const [info, setInfo] = useState({})

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0 ) return

    const consultarLetraAPI = async () => {

      const {artista, cancion} = busquedaLetra

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`

      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ])

        setLetra(letra.data.lyrics)
        setInfo(informacion.data.artists[0])

      // setLetra(resultado.data.lyrics)
    }
    consultarLetraAPI()
  }, [busquedaLetra, info])

  return (
    <>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      />

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <Info 
              info={info}
            />
          </div>
          <div className='col-md-6'>
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
